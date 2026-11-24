const fs = require('fs');

const css = fs.readFileSync('repo/sourboo-final-main/app/sourboo-home.css', 'utf8');
const idx = css.indexOf('.sbx-duo {');
console.log(css.slice(idx + 2200, idx + 5000));
