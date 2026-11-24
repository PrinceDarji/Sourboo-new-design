const fs = require('fs');
const path = require('path');

function searchDir(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.next') searchDir(full, pattern);
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      if (pattern.test(content)) {
        console.log('Match in:', full);
      }
    }
  }
}

searchDir(path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app'), /Marquee/);
