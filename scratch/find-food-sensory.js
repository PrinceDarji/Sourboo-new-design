const fs = require('fs');
const path = require('path');

function searchAll(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.next') searchAll(full);
    } else if (/\.(css|tsx|ts)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('FoodSensoryStory')) {
        console.log('Match in', full);
      }
    }
  }
}

searchAll('repo/sourboo-final-main/app');
