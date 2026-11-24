const fs = require('fs');
let c = fs.readFileSync('c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/lib/instagram.ts', 'utf8');
c = c.replace('elle woods but confused 💅', 'elle woods but confused');
fs.writeFileSync('c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/lib/instagram.ts', c);
console.log('Removed emoji from instagram.ts');
