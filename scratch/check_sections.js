const fs = require('fs');
const content = fs.readFileSync('_product.txt', 'utf8');
const sections = [...content.matchAll(/<section[^>]*>/gi)];
console.log('Sections found:', sections.length);
sections.forEach((s, i) => {
  const start = s.index;
  console.log(`Section ${i}:`, content.slice(start, start + 250).replace(/\s+/g, ' '));
});
