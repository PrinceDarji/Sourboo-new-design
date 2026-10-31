const https = require('https');

function get(path) {
  return new Promise((resolve) => {
    https.get('https://www.sourboo.com' + path, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ path, data }));
    }).on('error', err => resolve({ path, error: err.message }));
  });
}

async function auditSEO() {
  const pages = [
    '/',
    '/product',
    '/product/sideeyesour',
    '/product/tamarintease',
    '/about',
    '/contact',
    '/checkout'
  ];

  for (const p of pages) {
    const res = await get(p);
    const html = res.data || '';

    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
    const desc = (html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || [])[1] || '';
    const canon = (html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i) || [])[1] || '';
    const ogTitle = (html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i) || [])[1] || '';
    const ogImage = (html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i) || [])[1] || '';
    
    // H1s
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

    // Schemas
    const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

    // Images without alt
    const imgWithoutAlt = [...html.matchAll(/<img(?![^>]*\balt=)[^>]*>/gi)].length;
    const imgTotal = [...html.matchAll(/<img[^>]*>/gi)].length;
    const imgEmptyAlt = [...html.matchAll(/<img[^>]*\balt=["']\s*["'][^>]*>/gi)].length;

    console.log(`\n=============================`);
    console.log(`PAGE: ${p}`);
    console.log(`Title: "${title}" (length: ${title.length})`);
    console.log(`Meta Description: "${desc}" (length: ${desc.length})`);
    console.log(`Canonical: ${canon || 'MISSING'}`);
    console.log(`OG Title: ${ogTitle || 'MISSING'}`);
    console.log(`OG Image: ${ogImage || 'MISSING'}`);
    console.log(`H1 count: ${h1s.length}`, h1s);
    console.log(`H2 count: ${h2s.length}`, h2s.slice(0, 5));
    console.log(`Schema count: ${schemas.length}`);
    if (schemas.length > 0) {
      schemas.forEach((s, idx) => console.log(`  Schema [${idx}]:`, s.slice(0, 200)));
    }
    console.log(`Images: Total=${imgTotal}, Missing Alt=${imgWithoutAlt}, Empty Alt=${imgEmptyAlt}`);
  }
}

auditSEO();
