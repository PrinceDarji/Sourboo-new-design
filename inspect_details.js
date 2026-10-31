const fs = require('fs');

console.log('=== ae3fa56abd7041b1.js API SEARCH ===');
const c1 = fs.readFileSync('chunks/ae3fa56abd7041b1.js', 'utf8');
const apis = [...c1.matchAll(/\/api\/[a-zA-Z0-9_\-\/]+/g)].map(m => m[0]);
console.log('APIs in ae3:', [...new Set(apis)]);
let idx = 0;
while ((idx = c1.indexOf('/api/', idx)) !== -1) {
  console.log(c1.substring(Math.max(0, idx - 150), Math.min(c1.length, idx + 250)));
  idx += 5;
}

console.log('\n=== a6dad97d9634a72d.js GTAG SEARCH ===');
const c2 = fs.readFileSync('chunks/a6dad97d9634a72d.js', 'utf8');
let idx2 = 0;
while ((idx2 = c2.indexOf('gtag', idx2)) !== -1) {
  console.log(c2.substring(Math.max(0, idx2 - 100), Math.min(c2.length, idx2 + 200)));
  idx2 += 4;
}

console.log('\n=== aee6c7720838f8a2.js PIXEL SEARCH ===');
const c3 = fs.readFileSync('chunks/aee6c7720838f8a2.js', 'utf8');
let idx3 = 0;
while ((idx3 = c3.indexOf('pixel', idx3)) !== -1) {
  console.log(c3.substring(Math.max(0, idx3 - 100), Math.min(c3.length, idx3 + 200)));
  idx3 += 5;
}

console.log('\n=== 743b92e4815d7971.js (Cart / Discount) ===');
const c4 = fs.readFileSync('chunks/743b92e4815d7971.js', 'utf8');
let idx4 = 0;
while ((idx4 = c4.indexOf('discount', idx4)) !== -1) {
  console.log(c4.substring(Math.max(0, idx4 - 100), Math.min(c4.length, idx4 + 200)));
  idx4 += 8;
  if (idx4 > 1000) break; // limit
}
