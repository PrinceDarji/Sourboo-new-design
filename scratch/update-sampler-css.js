const fs = require('fs');
const path = 'repo/sourboo-final-main/app/sourboo-home.css';
let raw = fs.readFileSync(path, 'utf8');
const isCRLF = raw.includes('\r\n');
let lines = raw.split(/\r?\n/);

// 1. Desktop block: find between '.sbx-duo__controls {' and '.sbx-duo__add--both {'
const controlsIdx = lines.findIndex(l => l.includes('.sbx-duo__controls {'));
const addBothIdx = lines.findIndex(l => l.includes('.sbx-duo__add--both {'));

if (controlsIdx === -1 || addBothIdx === -1) {
  console.error('Could not find controls or addBoth in lines');
  process.exit(1);
}

const desktopLines = [
  '.sbx-duo__controls {',
  '  display: none;',
  '}',
  '',
  '/* Sour Sampler - Large, visually prominent organic oval preserving screenshot design */',
  '.sbx-duo__both {',
  '  display: flex;',
  '  align-items: center;',
  '  justify-content: center;',
  '  gap: clamp(24px, 4.5vw, 64px);',
  '  max-width: clamp(880px, 80vw, 1120px);',
  '  margin: clamp(48px, 6vw, 88px) auto 0;',
  '  padding: clamp(32px, 4vw, 56px) clamp(40px, 5.5vw, 92px);',
  '  border-radius: 48% 52% 46% 54% / 60% 56% 44% 40%;',
  '  background: var(--sbx-purple, #8b5cf6) !important;',
  '  color: #ffffff;',
  '  box-shadow: 0 18px 42px rgba(109, 40, 217, 0.24);',
  '}',
  '',
  '.sbx-duo__both-img {',
  '  position: relative;',
  '  flex: 0 0 clamp(180px, 22vw, 280px);',
  '  aspect-ratio: 1;',
  '  filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.25));',
  '}',
  '',
  '.sbx-duo__both-img img {',
  '  object-fit: contain;',
  '}',
  '',
  '.sbx-duo__both-copy {',
  '  display: flex;',
  '  flex-direction: column;',
  '  align-items: flex-start;',
  '  text-align: left;',
  '  max-width: 620px;',
  '}',
  '',
  '.sbx-duo__both-name {',
  '  margin: 0 0 10px;',
  '  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;',
  '  font-size: clamp(2.8rem, 4.5vw, 4.4rem);',
  '  font-weight: 700;',
  '  line-height: 1;',
  '  color: #ffffff;',
  '  letter-spacing: -0.01em;',
  '}',
  '',
  '.sbx-duo__both-desc {',
  '  margin: 0 0 24px;',
  '  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;',
  '  font-size: clamp(1.15rem, 1.55vw, 1.45rem);',
  '  font-weight: 600;',
  '  color: #ffffff;',
  '  line-height: 1.35;',
  '  max-width: 540px;',
  '}',
  '',
  '.sbx-duo__both .sbx-duo__actions {',
  '  display: flex;',
  '  align-items: center;',
  '  gap: clamp(16px, 2.5vw, 32px);',
  '  flex-wrap: wrap;',
  '}',
  ''
];

lines.splice(controlsIdx, addBothIdx - controlsIdx, ...desktopLines);

// 2. Mobile block inside @media (max-width: 820px)
const dotActiveIdx = lines.findIndex(l => l.includes('.sbx-duo__dot.is-active {'));
const baddiesIdx = lines.findIndex(l => l.includes('.sbx-baddies {'));

if (dotActiveIdx === -1 || baddiesIdx === -1) {
  console.error('Could not find dotActive or baddies in lines');
  process.exit(1);
}

// Find the .sbx-duo__both within this media query
let mobileBothStart = -1;
let mobileBothEnd = -1;
for (let i = dotActiveIdx; i < baddiesIdx; i++) {
  if (lines[i].includes('.sbx-duo__both {')) {
    mobileBothStart = i;
  }
  if (mobileBothStart !== -1 && lines[i].trim() === '}') {
    // Check if next lines are still part of sbx-duo__both sub-selectors
    if (lines[i+1] && (lines[i+1].includes('.sbx-duo__both') || lines[i+1].trim() === '')) {
      continue;
    } else {
      mobileBothEnd = i;
      break;
    }
  }
}

console.log('Mobile both start:', mobileBothStart, 'end:', mobileBothEnd);

const mobileLines = [
  '  .sbx-duo__both {',
  '    flex-direction: column;',
  '    margin: 44px 16px 0;',
  '    padding: clamp(34px, 7vw, 50px) clamp(22px, 5vw, 36px);',
  '    border-radius: 40% 60% 50% 50% / 20% 22% 18% 20%;',
  '    text-align: center;',
  '    gap: 22px;',
  '    max-width: 520px;',
  '    background: var(--sbx-purple, #8b5cf6) !important;',
  '    color: #ffffff;',
  '  }',
  '',
  '  .sbx-duo__both-img {',
  '    flex: 0 0 clamp(170px, 46vw, 240px);',
  '    width: clamp(170px, 46vw, 240px);',
  '  }',
  '',
  '  .sbx-duo__both-copy {',
  '    align-items: center;',
  '    text-align: center;',
  '    max-width: 100%;',
  '  }',
  '',
  '  .sbx-duo__both-name {',
  '    font-size: clamp(2.4rem, 7.5vw, 3.4rem);',
  '    margin-bottom: 8px;',
  '  }',
  '',
  '  .sbx-duo__both-desc {',
  '    font-size: clamp(1.1rem, 3.8vw, 1.35rem);',
  '    margin-bottom: 20px;',
  '  }',
  '',
  '  .sbx-duo__both .sbx-duo__actions {',
  '    justify-content: center;',
  '    gap: 16px;',
  '  }'
];

if (mobileBothStart !== -1 && mobileBothEnd !== -1) {
  lines.splice(mobileBothStart, mobileBothEnd - mobileBothStart + 1, ...mobileLines);
}

const newline = isCRLF ? '\r\n' : '\n';
fs.writeFileSync(path, lines.join(newline), 'utf8');
console.log('Successfully written updated sourboo-home.css!');
