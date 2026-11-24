const { execSync } = require('child_process');
const out = execSync('git show 2ed74ad:repo/sourboo-final-main/app/sourboo-home.css', { encoding: 'utf8' });
const idx = out.indexOf('.sbx-duo {');
console.log(out.slice(idx, idx + 2500));
