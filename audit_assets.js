const https = require('https');
const fs = require('fs');

function head(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, res => {
      resolve({
        url,
        status: res.statusCode,
        size: parseInt(res.headers['content-length'] || '0', 10),
        contentType: res.headers['content-type']
      });
    }).on('error', () => resolve({ url, status: 0, size: 0 })).end();
  });
}

async function auditAssets() {
  const html = fs.readFileSync('homepage.html', 'utf8');
  const imgUrls = [...new Set([...html.matchAll(/src=["']([^"']+\.(?:png|jpe?g|webp|svg|gif))["']/gi)].map(m => m[1]))];

  console.log('Homepage images found:', imgUrls.length);

  const results = [];
  for (const u of imgUrls) {
    const fullUrl = u.startsWith('http') ? u : 'https://www.sourboo.com' + u;
    const info = await head(fullUrl);
    results.push(info);
  }

  // Sort by size descending
  results.sort((a, b) => b.size - a.size);

  console.log('=== TOP LARGEST IMAGES ===');
  results.forEach(r => {
    console.log(`${(r.size / 1024).toFixed(1)} KB | ${r.contentType} | ${r.url}`);
  });

  // Check CSS size
  const css = await head('https://www.sourboo.com/_next/static/chunks/432a39672eec2b12.css');
  console.log(`\nCSS Size: ${(css.size / 1024).toFixed(1)} KB`);

  // Check Font sizes
  const fonts = [
    'https://www.sourboo.com/_next/static/media/Schoolbell_Regular-s.p.01a16f86.ttf',
    'https://www.sourboo.com/_next/static/media/coolvetica-s.p.731b00d2.ttf',
    'https://www.sourboo.com/_next/static/media/rascal-s.p.1c04244f.ttf'
  ];
  for (const f of fonts) {
    const fontInfo = await head(f);
    console.log(`Font: ${(fontInfo.size / 1024).toFixed(1)} KB | ${f.split('/').pop()}`);
  }
}

auditAssets();
