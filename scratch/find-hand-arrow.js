const fs = require('fs');
const path = require('path');

function searchAll(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') searchAll(full);
    } else if (/\.(css|tsx|ts|jsx|js)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('HandArrow')) {
        console.log('Match in', full);
        const lines = content.split('\n');
        lines.forEach((l, idx) => {
          if (l.includes('HandArrow')) {
            console.log(`  Line ${idx + 1}: ${l.trim()}`);
          }
        });
      }
    }
  }
}

searchAll('repo/sourboo-final-main/app');
