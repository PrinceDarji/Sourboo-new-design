const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_final_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9656',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9656/json/list', res => {
          let d = '';
          res.on('data', chunk => d += chunk);
          res.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
      });
      if (list && list.length > 0) break;
    } catch (e) {}
  }

  const page = list[0];
  const WebSocket = require(path.resolve('repo/sourboo-final-main/node_modules/ws'));
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(res => ws.on('open', res));

  let id = 1;
  function send(method, params = {}) {
    return new Promise(res => {
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
  }

  await send('Page.enable');
  await send('DOM.enable');

  async function snap(url, filename, options = {}) {
    const { width = 1440, height = 1100, mobile = false, wait = 1500, evaluate = null, scrollY = 0 } = options;
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile
    });
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, wait));
    if (evaluate) {
      await send('Runtime.evaluate', { expression: evaluate });
      await new Promise(r => setTimeout(r, 600));
    }
    if (scrollY > 0) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY});` });
      await new Promise(r => setTimeout(r, 600));
    }
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(screenshot.data, 'base64'));
    console.log(`Saved ${filename}`);
  }

  console.log('1. Verifying Fridge Loading Animation...');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  // Skip storage to play fridge
  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.setAttribute('data-fridge', 'play');
      localStorage.removeItem('sbx_fridge_seen');
    `
  });
  await new Promise(r => setTimeout(r, 800));
  const fridgeSnap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/final_fridge_desktop.png', Buffer.from(fridgeSnap.data, 'base64'));
  console.log('Saved scratch/final_fridge_desktop.png');

  console.log('2. Verifying Homepage Sections (Good Taste & No Cant Decide)...');
  await snap('http://localhost:3000/', 'scratch/final_home_desktop.png', { wait: 2000, scrollY: 1800 });
  await snap('http://localhost:3000/', 'scratch/final_home_mobile.png', { width: 390, height: 844, mobile: true, wait: 2000, scrollY: 2200 });

  console.log('3. Verifying Footer (Logo & Tagline)...');
  await snap('http://localhost:3000/', 'scratch/final_footer_desktop.png', { wait: 2000, scrollY: 4800 });
  await snap('http://localhost:3000/', 'scratch/final_footer_mobile.png', { width: 390, height: 844, mobile: true, wait: 2000, scrollY: 6500 });

  console.log('4. Verifying Flavour Quiz Modal (Contrast & Colors)...');
  await snap('http://localhost:3000/popup', 'scratch/final_quiz_desktop.png', { wait: 2000 });
  await snap('http://localhost:3000/popup', 'scratch/final_quiz_mobile.png', { width: 390, height: 844, mobile: true, wait: 2000 });

  console.log('5. Verifying Checkout Page (Redesigned, No Cutoffs)...');
  // First ensure cart has items
  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 1000));
  await send('Runtime.evaluate', {
    expression: `
      localStorage.setItem('sourboo_cart_v2', JSON.stringify([
        { slug: 'side-eye-sour', name: 'SIDE EYE SOUR', price: 399, quantity: 1, image: '/product/catalog/side-eye.webp' },
        { slug: 'tamarin-tease', name: "TAMARIN' TEASE", price: 399, quantity: 1, image: '/product/catalog/tamarin-tease.webp' }
      ]));
    `
  });
  await snap('http://localhost:3000/checkout', 'scratch/final_checkout_desktop.png', { wait: 2000 });
  await snap('http://localhost:3000/checkout', 'scratch/final_checkout_mobile.png', { width: 390, height: 844, mobile: true, wait: 2000 });

  console.log('6. Verifying Thank You Page (Quirky, Exact Headline, No Extra Details)...');
  await snap('http://localhost:3000/checkout/thank-you?orderId=SB-882319', 'scratch/final_thankyou_desktop.png', { wait: 2000 });
  await snap('http://localhost:3000/checkout/thank-you?orderId=SB-882319', 'scratch/final_thankyou_mobile.png', { width: 390, height: 844, mobile: true, wait: 2000 });

  ws.close();
  chrome.kill();
  console.log('All verification snapshots complete!');
}

main().catch(console.error);
