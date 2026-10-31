const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.abort();
      reject(new Error('Timeout'));
    });
  });
}

async function main() {
  const routes = [
    '/',
    '/about',
    '/product',
    '/product/sideeyesour',
    '/product/tamarintease',
    '/checkout',
    '/cart',
    '/join',
    '/contact',
    '/faq',
    '/terms-and-conditions',
    '/privacy-policy',
    '/refund-policy',
    '/shipping-policy',
    '/login',
    '/register',
    '/account',
    '/robots.txt',
    '/sitemap.xml'
  ];

  const results = {};
  for (const route of routes) {
    const fullUrl = 'https://www.sourboo.com' + route;
    try {
      const res = await fetchUrl(fullUrl);
      results[route] = {
        status: res.statusCode,
        length: res.body.length,
        contentType: res.headers['content-type'],
        title: (res.body.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || null
      };
      // Save specific interesting pages
      if (['/checkout', '/product', '/product/sideeyesour', '/product/tamarintease', '/contact', '/robots.txt', '/sitemap.xml'].includes(route)) {
        const safeName = route.replace(/[^a-z0-9]/gi, '_') + '.txt';
        fs.writeFileSync(safeName, res.body);
      }
    } catch (err) {
      results[route] = { error: err.message };
    }
  }

  console.log('--- CRAWL RESULTS ---');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
