const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_matcher_mob_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9524',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=390,900',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 25; attempt++) {
    await new Promise(r => setTimeout(r, 600));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9524/json/list', res => {
          let d = '';
          res.on('data', chunk => d += chunk);
          res.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
      });
      if (list && list.length > 0) break;
    } catch (e) {}
  }

  const page = list[0];
  const wsUrl = page.webSocketDebuggerUrl;

  const WebSocket = require(path.resolve('repo/sourboo-final-main/node_modules/ws'));
  const ws = new WebSocket(wsUrl);

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
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 2500));

  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.setAttribute('data-fridge', 'skip');
      document.querySelectorAll('.sbx-fridge, [class*="popup"], [class*="modal"], [class*="FridgeLoader"]').forEach(el => el.remove());
      const section = document.getElementById('shop-taste-game');
      if (section) section.scrollIntoView({ block: 'start' });
    `
  });
  await new Promise(r => setTimeout(r, 800));

  let shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'matcher_mobile_default.png'), Buffer.from(shot1.data, 'base64'));
  console.log('Saved matcher_mobile_default.png');

  // Click Player 1
  await send('Runtime.evaluate', {
    expression: `
      const p1Btn = document.querySelector('.sbx-game__tag--p1') || document.querySelector('.sbx-game__side--p1 .sbx-game__pick');
      if (p1Btn) p1Btn.click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  let shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'matcher_mobile_p1.png'), Buffer.from(shot2.data, 'base64'));
  console.log('Saved matcher_mobile_p1.png');

  ws.close();
  chrome.kill();
  console.log('Done mobile!');
}

main().catch(console.error);
