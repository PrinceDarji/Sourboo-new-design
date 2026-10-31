const fs = require('fs');
const c = fs.readFileSync('chunks/8bcc86826c821cbd.js', 'utf8');

const regex = /className:[^"]*"[^"]*(?:red|error|alert)[^"]*"/gi;
let m;
while ((m = regex.exec(c)) !== null) {
  console.log('Error UI match:', m[0]);
  console.log(c.substring(Math.max(0, m.index - 50), Math.min(c.length, m.index + 200)));
}
