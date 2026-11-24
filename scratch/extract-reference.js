const fs = require('fs');

const css = fs.readFileSync('scratch/reference-game.css', 'utf8');
const js = fs.readFileSync('scratch/reference-game.js', 'utf8');

// Find sbx-game rules in CSS
const cssLines = css.split('}');
const gameCss = cssLines.filter(block => block.includes('sbx-game')).map(b => b + '}').join('\n');
fs.writeFileSync('scratch/extracted-game.css', gameCss);
console.log('Extracted game CSS length:', gameCss.length);

// In JS, search for sbx-game structure
const start = js.indexOf('sbx-game');
if (start !== -1) {
  fs.writeFileSync('scratch/extracted-game.js', js.substring(Math.max(0, start - 500), start + 4000));
  console.log('Saved extracted JS');
}
