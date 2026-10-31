const https = require('https');

function post(path, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: 'www.sourboo.com',
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ path, status: res.statusCode, body: d }));
    });
    req.on('error', err => resolve({ path, error: err.message }));
    req.write(data);
    req.end();
  });
}

async function testErrors() {
  console.log('1. Invalid payload on /api/payments/phonepe/create:');
  const res1 = await post('/api/payments/phonepe/create', { items: [] });
  console.log(res1);

  console.log('\n2. Invalid items on /api/checkout/quote:');
  const res2 = await post('/api/checkout/quote', { items: [{ slug: 'invalid', quantity: -1 }] });
  console.log(res2);

  console.log('\n3. SQL Injection / NoSQL probe on /api/payments/phonepe/status:');
  const res3 = await new Promise((res) => {
    https.get('https://www.sourboo.com/api/payments/phonepe/status?merchantOrderId=\'OR\'1\'=\'1', r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, body: d }));
    });
  });
  console.log(res3);
}

testErrors();
