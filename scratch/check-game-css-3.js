const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app', 'sourboo-site.css');
const css = fs.readFileSync(cssPath, 'utf8');

const idx = css.indexOf('.sbx-game__card:hover');
console.log(css.slice(idx, idx + 4000));
