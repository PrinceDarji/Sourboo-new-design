const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app', 'sourboo-site.css');
const css = fs.readFileSync(cssPath, 'utf8');

const match = css.match(/\/\* ---+[\s\S]*?Taste Game[\s\S]*?\/\* ---+/i) || css.match(/\.sbx-game\s*\{[\s\S]*?\n\s*\/\* ---+/);
if (match) {
  console.log(match[0].slice(0, 3000));
} else {
  // Find where .sbx-game is defined
  const idx = css.indexOf('.sbx-game {');
  console.log(css.slice(idx, idx + 3500));
}
