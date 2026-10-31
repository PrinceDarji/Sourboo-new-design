const fs = require('fs');
const html = fs.readFileSync('homepage.html', 'utf8');

// Scripts
const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/gi;
let m;
const scripts = [];
while ((m = scriptRegex.exec(html)) !== null) {
  scripts.push(m[1]);
}
console.log('--- SCRIPTS (' + scripts.length + ') ---');
scripts.forEach(s => console.log(s));

// Inline Scripts
const inlineScriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
const inlineScripts = [];
while ((m = inlineScriptRegex.exec(html)) !== null) {
  inlineScripts.push(m[1]);
}
console.log('\n--- INLINE SCRIPTS (' + inlineScripts.length + ') ---');
inlineScripts.forEach((s, i) => console.log(`[${i}] ${s.slice(0, 150)}...`));

// Links
const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>/gi;
const links = new Set();
while ((m = linkRegex.exec(html)) !== null) {
  links.add(m[1]);
}
console.log('\n--- LINKS (' + links.size + ') ---');
[...links].forEach(l => console.log(l));

// Meta tags
const metaRegex = /<meta[^>]*>/gi;
const metas = [];
while ((m = metaRegex.exec(html)) !== null) {
  metas.push(m[0]);
}
console.log('\n--- METAS (' + metas.length + ') ---');
metas.forEach(mt => console.log(mt));

// Title
const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
console.log('\n--- TITLE ---');
console.log(title ? title[1] : 'None');

// Stylesheets
const cssRegex = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
const stylesheets = [];
while ((m = cssRegex.exec(html)) !== null) {
  stylesheets.push(m[1]);
}
console.log('\n--- STYLESHEETS ---');
stylesheets.forEach(c => console.log(c));
