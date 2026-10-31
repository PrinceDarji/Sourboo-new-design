const https = require('https');

function req(path, method = 'GET', data = null) {
  return new Promise((resolve) => {
    const postData = data ? JSON.stringify(data) : '';
    const r = https.request({
      hostname: 'www.sourboo.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...(data ? { 'Content-Length': Buffer.byteLength(postData) } : {})
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          body: body.slice(0, 500)
        });
      });
    });
    r.on('error', err => resolve({ path, error: err.message }));
    if (data) r.write(postData);
    r.end();
  });
}

async function testAll() {
  const endpoints = [
    ['/api/site-settings', 'GET'],
    ['/api/contact', 'POST', { name: 'Test', email: 'test@example.com', message: 'Hello' }],
    ['/api/join', 'POST', { name: 'Test', email: 'test@example.com' }],
    ['/api/payments/phonepe/callback', 'POST', {}],
    ['/api/payments/phonepe/callback', 'GET'],
    ['/api/payments/phonepe/status', 'GET'],
    ['/api/payments/phonepe/status', 'POST', {}],
    ['/api/payments/phonepe/webhook', 'POST', {}],
    ['/api/order/status', 'GET'],
    ['/api/orders', 'GET'],
    ['/api/products', 'GET']
  ];

  for (const [p, m, d] of endpoints) {
    const res = await req(p, m, d);
    console.log(`[${m}] ${p} => ${res.status}`);
    console.log('   Body:', res.body ? res.body.slice(0, 200) : 'none');
  }
}

testAll();
