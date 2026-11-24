const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_checkout_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9654',
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
        http.get('http://127.0.0.1:9654/json/list', res => {
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

  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 1500));

  await send('Runtime.evaluate', {
    expression: `
      localStorage.setItem('sourboo_cart_v2', JSON.stringify([
        { slug: 'side-eye-sour', name: 'SIDE EYE SOUR', price: 399, quantity: 1, image: '/product/catalog/side-eye.webp' },
        { slug: 'tamarin-tease', name: "TAMARIN' TEASE", price: 399, quantity: 1, image: '/product/catalog/tamarin-tease.webp' }
      ]));
    `
  });

  // Navigate to checkout
  await send('Page.navigate', { url: 'http://localhost:3000/checkout' });
  await new Promise(r => setTimeout(r, 2500));

  // Desktop snap
  const desktopSnap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/current_checkout_desktop.png', Buffer.from(desktopSnap.data, 'base64'));
  console.log('Saved scratch/current_checkout_desktop.png');

  // Mobile snap
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 500));
  const mobileSnap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/current_checkout_mobile.png', Buffer.from(mobileSnap.data, 'base64'));
  console.log('Saved scratch/current_checkout_mobile.png');

  ws.close();
  chrome.kill();
}

main().catch(console.error);
