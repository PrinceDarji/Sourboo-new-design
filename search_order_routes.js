const fs = require('fs');
const path = require('path');

const chunkDir = 'chunks';
const files = fs.readdirSync(chunkDir).filter(f => f.endsWith('.js'));

const searchTerms = [
  'merchantOrderId',
  'phonePeOrderId',
  'orderStatus',
  '/order',
  '/confirmation',
  '/success',
  '/thank',
  '/status',
  'isTerminal'
];

files.forEach(file => {
  const content = fs.readFileSync(path.join(chunkDir, file), 'utf8');
  searchTerms.forEach(term => {
    let idx = 0;
    while ((idx = content.indexOf(term, idx)) !== -1) {
      console.log(`[${file}] Found "${term}" at index ${idx}:`);
      console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
      idx += term.length + 50;
      if (idx > 2000) break; // prevent flood
    }
  });
});
