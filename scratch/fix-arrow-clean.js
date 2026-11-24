const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app', 'components', 'home', 'GoodTasteMoments.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace HandArrow inside sbx-moments__line
content = content.replace(/<HandArrow[^>]*\/>/g, '');
// Clean up any extra whitespace/blank lines inside sbx-moments__line
content = content.replace(/(<p className="sbx-moments__line">[\s\S]*?)(\s*<\/p>)/, (match, p1, p2) => {
  return p1.trimEnd() + '\n      </p>';
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed GoodTasteMoments.tsx regex');
