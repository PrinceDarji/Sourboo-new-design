const fs = require('fs');

const code = fs.readFileSync('chunks/743b92e4815d7971.js', 'utf8');

console.log('Size:', code.length);

// Search localStorage
console.log('Includes localStorage:', code.includes('localStorage'));
let idx = 0;
while ((idx = code.indexOf('localStorage', idx)) !== -1) {
  console.log('localStorage at', idx, ':', code.substring(Math.max(0, idx - 50), Math.min(code.length, idx + 150)));
  idx += 12;
}

// Search sessionStorage
console.log('Includes sessionStorage:', code.includes('sessionStorage'));

// Search cookies
console.log('Includes cookie:', code.includes('cookie') || code.includes('document.cookie'));
