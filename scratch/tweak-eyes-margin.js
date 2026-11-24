const fs = require('fs');
const p = 'c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/sourboo-story.css';
let c = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

const target = `.sb-story-problem__eyes-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto clamp(20px, 4vw, 36px);
}`;

const replacement = `.sb-story-problem__eyes-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: clamp(20px, 3.5vw, 40px) auto clamp(24px, 4vw, 40px);
}`;

c = c.replace(target, replacement);
fs.writeFileSync(p, c.replace(/\n/g, '\r\n'), 'utf8');
console.log('Added breathing room for eyes row on about page');
