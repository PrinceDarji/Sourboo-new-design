const http = require('http');
const fs = require('fs');
const path = require('path');

async function testAllAssets() {
  const serverJs = fs.readFileSync(path.join(__dirname, '..', 'preview_server.js'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '..', 'redesign', 'css', 'sourboo-redesign.css'), 'utf8');
  const js = fs.readFileSync(path.join(__dirname, '..', 'redesign', 'js', 'sourboo-redesign.js'), 'utf8');

  const regex = /['"`\(\s]\/?([a-zA-Z0-9_\-\.\/]+\.(?:webp|png|jpg|jpeg|svg|ttf|ico|css|js))['"`\)\s]/g;
  const assetSet = new Set();
  let match;

  for (const src of [serverJs, css, js]) {
    while ((match = regex.exec(src)) !== null) {
      const p = match[1];
      if (!p.startsWith('http') && !p.startsWith('node_modules') && !p.includes('${') && !p.includes('*')) {
        assetSet.add(p.startsWith('/') ? p : '/' + p);
      }
    }
  }

  console.log('Total unique referenced assets discovered:', assetSet.size);

  let missing = [];
  let successful = 0;
  for (const assetPath of assetSet) {
    await new Promise((resolve) => {
      http.get('http://localhost:3456' + assetPath, (res) => {
        if (res.statusCode !== 200) {
          missing.push({ path: assetPath, status: res.statusCode });
        } else {
          successful++;
        }
        res.resume();
        resolve();
      }).on('error', (err) => {
        missing.push({ path: assetPath, error: err.message });
        resolve();
      });
    });
  }

  console.log(`Audited: ${assetSet.size} assets | 200 OK: ${successful} | Failed: ${missing.length}`);
  if (missing.length === 0) {
    console.log('ALL REFERENCED ASSETS RESOLVED WITH HTTP 200!');
    process.exit(0);
  } else {
    console.log('Missing/Failed Assets:', JSON.stringify(missing, null, 2));
    process.exit(1);
  }
}

testAllAssets();
