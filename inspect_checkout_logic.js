const fs = require('fs');
const code = fs.readFileSync('chunks/8bcc86826c821cbd.js', 'utf8');

// Let's print out the full logic around api/payments/phonepe/create
const idx = code.indexOf('/api/payments/phonepe/create');
if (idx !== -1) {
  console.log('=== PAYMENT CODE ===');
  console.log(code.substring(idx - 600, idx + 1200));
}

const idxQuote = code.indexOf('/api/checkout/quote');
if (idxQuote !== -1) {
  console.log('=== QUOTE CODE ===');
  console.log(code.substring(idxQuote - 600, idxQuote + 1200));
}
