const https = require('https');

function getLen(url) {
  return new Promise(res => {
    https.get(url, r => {
      let len = 0;
      r.on('data', c => len += c.length);
      r.on('end', () => res(len));
    }).on('error', () => res(0));
  });
}

async function run() {
  const urls = [
    'https://www.sourboo.com/_next/static/chunks/432a39672eec2b12.css',
    'https://www.sourboo.com/_next/static/media/Schoolbell_Regular-s.p.01a16f86.ttf',
    'https://www.sourboo.com/_next/static/media/coolvetica-s.p.731b00d2.ttf',
    'https://www.sourboo.com/_next/static/media/rascal-s.p.1c04244f.ttf',
    'https://www.sourboo.com/product/catalog/side-eye.webp',
    'https://www.sourboo.com/product/catalog/tamarin-tease.webp',
    'https://www.sourboo.com/navbar.svg',
    'https://www.sourboo.com/navlogo.svg',
    'https://www.sourboo.com/logo.svg'
  ];

  for (const u of urls) {
    const bytes = await getLen(u);
    console.log((bytes / 1024).toFixed(1) + ' KB | ' + u);
  }
}

run();
