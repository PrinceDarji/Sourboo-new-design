const https = require('https');

function get(path) {
  return new Promise((resolve) => {
    https.get('https://www.sourboo.com' + path, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', () => resolve(''));
  });
}

async function inspectProducts() {
  const prods = [
    '/product',
    '/product/sideeyesour',
    '/product/tamarintease',
    '/product/tamarind-twins',
    '/product/lemon-lovers',
    '/product/sour-sampler',
    '/product/sourboo-stash'
  ];

  for (const p of prods) {
    const d = await get(p);
    // Find price patterns (₹ or Rs or paise)
    const prices = [...d.matchAll(/₹\s*([0-9]+)/g)].map(m => m[1]);
    const addBtns = [...d.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(b => b.toLowerCase().includes('add') || b.toLowerCase().includes('buy') || b.toLowerCase().includes('cart'));
    console.log(`\n=== PRODUCT: ${p} ===`);
    console.log('Prices found:', [...new Set(prices)]);
    console.log('Action buttons:', addBtns);
  }
}

inspectProducts();
