const fs = require('fs');
const path = require('path');

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') search(full);
    } else if (/\.(tsx|ts|jsx|js|css|json)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.toLowerCase().includes('deeply fermented')) {
        console.log('Found in:', full);
        const lines = content.split('\n');
        lines.forEach((l, idx) => {
          if (l.toLowerCase().includes('deeply fermented')) {
            console.log(`  L${idx+1}: ${l}`);
          }
        });
      }
    }
  }
}

search('repo/sourboo-final-main');
