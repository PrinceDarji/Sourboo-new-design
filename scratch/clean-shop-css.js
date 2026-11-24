const fs = require('fs');

const path = 'repo/sourboo-final-main/app/sourboo-shop.css';
let css = fs.readFileSync(path, 'utf8');

const startTarget = css.indexOf('.sb-matcher-section');
const prevComment = css.lastIndexOf('/* ===', startTarget);
const nextComment = css.indexOf('/* ===', startTarget + 100);

console.log('Removing from', prevComment, 'to', nextComment);
css = css.substring(0, prevComment) + css.substring(nextComment);

fs.writeFileSync(path, css);
console.log('Successfully cleaned old matcher from sourboo-shop.css');
