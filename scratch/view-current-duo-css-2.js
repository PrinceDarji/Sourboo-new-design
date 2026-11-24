const fs = require('fs');

const css = fs.readFileSync('repo/sourboo-final-main/app/sourboo-home.css', 'utf8');
const lines = css.split('\n');
console.log(lines.slice(860, 930).join('\n'));
