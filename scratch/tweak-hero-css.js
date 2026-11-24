const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app', 'sourboo-shop.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Refine kicker and mobile padding/sizing
css = css.replace(
  `/* Eyebrow Kicker - Clean, unboxed editorial */
.sbx-shop__kicker {
  margin: 0 0 18px;
  color: #083d1a;
  font-family: var(--font-coolvetica), 'Coolvetica', sans-serif;
  font-size: clamp(0.92rem, 1.2vw, 1.12rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}`,
  `/* Eyebrow Kicker - Clean, unboxed editorial */
.sbx-shop__kicker {
  margin: 0 0 16px;
  color: #083d1a;
  font-family: var(--font-coolvetica), 'Coolvetica', sans-serif;
  font-size: clamp(0.84rem, 2.2vw, 1.05rem);
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Refined kicker in sourboo-shop.css');
