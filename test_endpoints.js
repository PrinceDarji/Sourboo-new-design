const https = require('https');

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = https.request({
      hostname: 'www.sourboo.com',
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function test() {
  console.log('Testing /api/checkout/quote...');
  try {
    const quoteRes = await postJson('/api/checkout/quote', {
      items: [
        { slug: 'sideeyesour', name: 'Side Eye Sour', quantity: 1 }
      ],
      discountCode: ''
    });
    console.log('Quote status:', quoteRes.statusCode);
    console.log('Quote headers:', quoteRes.headers);
    console.log('Quote body:', quoteRes.body);
  } catch (e) {
    console.error('Quote error:', e);
  }

  console.log('\nTesting /api/payments/phonepe/create...');
  try {
    const payRes = await postJson('/api/payments/phonepe/create', {
      items: [
        { slug: 'sideeyesour', name: 'Side Eye Sour', quantity: 1 }
      ],
      discountCode: '',
      customer: {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '9876543210'
      },
      shippingAddress: {
        line1: '123 Test Street',
        line2: 'Apt 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001'
      }
    });
    console.log('Pay status:', payRes.statusCode);
    console.log('Pay headers:', payRes.headers);
    console.log('Pay body:', payRes.body);
  } catch (e) {
    console.error('Pay error:', e);
  }
}

test();
