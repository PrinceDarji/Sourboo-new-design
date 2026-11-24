const fs = require('fs');
const content = fs.readFileSync('repo/sourboo-final-main/app/sourboo-site.css', 'utf8').split('\n');
console.log(content.slice(460, 485).join('\n'));
