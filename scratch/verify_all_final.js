const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function run() {
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_final_verify_${Date.now()}`);

  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9860',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    'about:blank'
  ]);

  let list = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      list = await new Promise((res, rej) => {
        http.get('http://127.0.0.1:9860/json/list', r => {
          let d = '';
          r.on('data', c => d += c);
          r.on('end', () => res(JSON.parse(d)));
        }).on('error', rej);
      });
      if (list && list.length > 0) break;
    } catch (e) {}
  }

  if (!list || !list[0]) {
    console.error('Failed to connect to headless Chrome');
    chrome.kill();
    return;
  }

  const WebSocket = require(path.resolve('repo/sourboo-final-main/node_modules/ws'));
  const ws = new WebSocket(list[0].webSocketDebuggerUrl);
  await new Promise(res => ws.on('open', res));

  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const curId = id++;
    const handler = (data) => {
      const msg = JSON.parse(data);
      if (msg.id === curId) {
        ws.off('message', handler);
        res(msg.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await send('Page.enable');
  await send('DOM.enable');
  await send('Runtime.enable');

  // Prevent popup banner
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 1200));
  await send('Runtime.evaluate', {
    expression: `localStorage.setItem('sourboo_quiz_dismissed', 'true');`
  });

  // 1. Homepage Desktop View
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));

  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'verify_homepage_hero_desktop.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved verify_homepage_hero_desktop.png');

  // 2. Homepage Snackable Pickled Gherkins Section
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('flavours');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'verify_homepage_flavours_desktop.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved verify_homepage_flavours_desktop.png');

  // 3. Homepage Mobile Hero
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2000));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'verify_homepage_hero_mobile.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved verify_homepage_hero_mobile.png');

  // 4. Shop Page Product Showcase (Desktop)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1100,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 2000));
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('flavours');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'verify_shop_products_desktop.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved verify_shop_products_desktop.png');

  // 5. Checkout Page (Add item to cart first)
  await send('Runtime.evaluate', {
    expression: `(() => {
      const cart = {
        items: [
          {
            slug: 'sideeyesour',
            name: 'SIDE EYE SOUR',
            price: 399,
            quantity: 1,
            image: '/product/catalog/side-eye.webp'
          },
          {
            slug: 'tamarintease',
            name: "TAMARIN' TEASE",
            price: 399,
            quantity: 1,
            image: '/product/catalog/tamarin-tease.webp'
          }
        ],
        discountCode: 'SOUR10',
        discountPercent: 10,
        discountAmount: 80
      };
      localStorage.setItem('sourboo_cart_v2', JSON.stringify(cart.items));
      localStorage.setItem('sourboo_cart_discount_code_v1', 'SOUR10');
    })()`
  });

  await send('Page.navigate', { url: 'http://localhost:3000/checkout' });
  await new Promise(r => setTimeout(r, 2000));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'verify_checkout_desktop.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved verify_checkout_desktop.png');

  // 6. Mobile Checkout
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:3000/checkout' });
  await new Promise(r => setTimeout(r, 2000));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'verify_checkout_mobile.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved verify_checkout_mobile.png');

  // 7. Test Order Placement & Thank You Page
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1100,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Page.navigate', { url: 'http://localhost:3000/checkout' });
  await new Promise(r => setTimeout(r, 2000));

  // Fill in form and submit
  await send('Runtime.evaluate', {
    expression: `(() => {
      const inputs = document.querySelectorAll('input');
      for (const input of inputs) {
        if (input.placeholder && input.placeholder.includes('Priya Sharma')) {
          input.value = 'Rohan Malhotra';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (input.type === 'email') {
          input.value = 'rohan@example.com';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (input.type === 'tel') {
          input.value = '9876543210';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (input.placeholder && input.placeholder.includes('Flat / House')) {
          input.value = 'B-402, Sea Green Apts, Worli';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (input.placeholder && input.placeholder.includes('Bengaluru')) {
          input.value = 'Mumbai';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (input.placeholder && input.placeholder.includes('Karnataka')) {
          input.value = 'Maharashtra';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (input.placeholder && input.placeholder.includes('560001')) {
          input.value = '400018';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      const form = document.querySelector('form');
      if (form) form.requestSubmit();
    })()`
  });

  // Wait for redirect to /checkout/thank-you
  await new Promise(r => setTimeout(r, 2500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'verify_thank_you_desktop.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved verify_thank_you_desktop.png');

  // Thank You Mobile View
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:3000/checkout/thank-you?orderId=SB-982341' });
  await new Promise(r => setTimeout(r, 2000));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'verify_thank_you_mobile.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved verify_thank_you_mobile.png');

  ws.close();
  chrome.kill();
  console.log('All verifications complete!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
