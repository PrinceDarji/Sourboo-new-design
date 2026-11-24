const fs = require('fs');

async function main() {
  const html = await fetch('https://sourboo-new-design.vercel.app/product').then(r => r.text());
  
  // Find all CSS and JS files
  const cssMatches = [...html.matchAll(/href="([^"]+\.css)"/g)].map(m => m[1]);
  const jsMatches = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  
  console.log('CSS:', cssMatches);
  console.log('JS:', jsMatches);

  // Download CSS and search for sbx-game
  for (const cssUrl of cssMatches) {
    const fullUrl = cssUrl.startsWith('http') ? cssUrl : `https://sourboo-new-design.vercel.app${cssUrl}`;
    const cssText = await fetch(fullUrl).then(r => r.text());
    if (cssText.includes('sbx-game')) {
      console.log('FOUND sbx-game in', cssUrl);
      fs.writeFileSync('scratch/reference-game.css', cssText);
    }
  }

  // Also check JS files to find TasteGame / FlavorMatcher component logic
  for (const jsUrl of jsMatches) {
    const fullUrl = jsUrl.startsWith('http') ? jsUrl : `https://sourboo-new-design.vercel.app${jsUrl}`;
    const jsText = await fetch(fullUrl).then(r => r.text());
    if (jsText.includes('sbx-game') || jsText.includes('can\'t decide')) {
      console.log('FOUND game logic in', jsUrl);
      fs.writeFileSync('scratch/reference-game.js', jsText);
    }
  }
}

main().catch(console.error);
