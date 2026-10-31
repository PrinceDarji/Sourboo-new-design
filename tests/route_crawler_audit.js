const http = require('http');

const ROUTES = [
  '/',
  '/collections/all',
  '/products/sideeyesour',
  '/products/tamarintease',
  '/pages/about',
  '/pages/contact',
  '/pages/join-us',
  '/pages/shipping-policy',
  '/pages/refund-policy',
  '/pages/privacy-policy',
  '/pages/terms-and-conditions'
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3456' + url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function crawl() {
  console.log('--- CRAWLING ALL 11 ROUTES & EXTRACTING DOM ASSETS ---');
  const allAssets = new Set();
  const routeStatus = [];

  for (const route of ROUTES) {
    const res = await fetch(route);
    routeStatus.push({ route, status: res.status });
    if (res.status === 200) {
      // Find all img src
      const imgSrcMatches = res.body.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
      for (const m of imgSrcMatches) {
        if (!m[1].startsWith('data:')) allAssets.add(m[1]);
      }
      // Find all link href
      const linkMatches = res.body.matchAll(/<link[^>]+href=["']([^"']+)["']/gi);
      for (const m of linkMatches) {
        if (m[1].endsWith('.css') || m[1].endsWith('.ico')) allAssets.add(m[1]);
      }
      // Find all script src
      const scriptMatches = res.body.matchAll(/<script[^>]+src=["']([^"']+)["']/gi);
      for (const m of scriptMatches) {
        allAssets.add(m[1]);
      }
      // Find inline style background-image: url(...)
      const bgMatches = res.body.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/gi);
      for (const m of bgMatches) {
        allAssets.add(m[1]);
      }
    }
  }

  console.log('Route status results:');
  routeStatus.forEach(r => console.log(`  ${r.route} -> HTTP ${r.status}`));

  console.log(`\nDiscovered ${allAssets.size} unique assets linked in actual DOM.`);
  let failed = 0;
  for (const asset of allAssets) {
    const res = await fetch(asset);
    if (res.status === 200) {
      console.log(`  [200 OK] ${asset}`);
    } else {
      console.error(`  [FAIL ${res.status}] ${asset}`);
      failed++;
    }
  }

  if (failed === 0) {
    console.log('\nSUCCESS: 100% of DOM-referenced assets returned HTTP 200!');
    process.exit(0);
  } else {
    console.error(`\nFAILURE: ${failed} DOM-referenced assets failed!`);
    process.exit(1);
  }
}

crawl();
