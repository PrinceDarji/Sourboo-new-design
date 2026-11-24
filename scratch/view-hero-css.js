const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app', 'sourboo-shop.css');
const css = fs.readFileSync(cssPath, 'utf8');

console.log(css.slice(707, 2200));
