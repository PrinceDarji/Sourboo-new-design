const fs = require('fs');
const content = fs.readFileSync('_product.txt', 'utf8');
const sections = [...content.matchAll(/<section[^>]*>/gi)];
console.log('--- Section 1 Content ---');
console.log(content.slice(sections[1].index, sections[1].index + 2000));
