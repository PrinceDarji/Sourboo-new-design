const fs = require('fs');
const code = fs.readFileSync('chunks/8bcc86826c821cbd.js', 'utf8');

console.log('Size of checkout chunk:', code.length);

// Look for fetch, axios, api calls
const fetchMatches = [...code.matchAll(/fetch\s*\(\s*[`"']([^`"']+)[`"']/g)].map(m => m[1]);
console.log('Direct fetch endpoints:', fetchMatches);

// Look for /api/ occurrences
const apiMatches = [...code.matchAll(/\/api\/[a-zA-Z0-9_\-\/]+/g)].map(m => m[0]);
console.log('API occurrences:', [...new Set(apiMatches)]);

// Look for phonepe occurrences
let idx = 0;
while ((idx = code.toLowerCase().indexOf('phonepe', idx)) !== -1) {
  console.log('\n--- PhonePe Context at', idx, '---');
  console.log(code.substring(Math.max(0, idx - 200), Math.min(code.length, idx + 400)));
  idx += 10;
}
