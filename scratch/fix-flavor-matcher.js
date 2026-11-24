const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app', 'components', 'product', 'FlavorMatcher.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace corrupted encoding characters if any
content = content.replace(/â–¶/g, '▶');
content = content.replace(/â‚¹/g, '₹');
content = content.replace(/Ã—/g, '×');
content = content.replace(/â€™/g, "'");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed encoding in FlavorMatcher.tsx');
