const fs = require('fs');

console.log('=== FlavourDuo.tsx ===');
console.log(fs.readFileSync('repo/sourboo-final-main/app/components/home/FlavourDuo.tsx', 'utf8'));

console.log('=== product/page.tsx ===');
const prodPage = fs.readFileSync('repo/sourboo-final-main/app/product/page.tsx', 'utf8');
console.log(prodPage.slice(prodPage.indexOf('<FlavorMatcher />')));
