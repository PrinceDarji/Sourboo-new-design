const fs = require('fs');
const content = fs.readFileSync('_product.txt', 'utf8');
const sections = [...content.matchAll(/<section[^>]*>/gi)];
console.log(content.slice(sections[1].index + 1500, sections[1].index + 4500));
