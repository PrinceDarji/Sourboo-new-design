const fs = require('fs');
const content = fs.readFileSync('repo/sourboo-final-main/app/components/site/Organic.tsx', 'utf8');
const idx = content.indexOf('HandArrow');
console.log(content.slice(idx - 50, idx + 800));
