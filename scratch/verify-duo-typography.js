const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_duo_typo_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9535',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1150',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 25; attempt++) {
    await new Promise(r => setTimeout(r, 600));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9535/json/list', res => {
          let d = '';
          res.on('data', chunk => d += chunk);
          res.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
      });
      if (list && list.length > 0) break;
    } catch {}
  }

  const page = list.find(p => p.type === 'page') || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const msgId = id++;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await send('Page.enable');
  await send('DOM.enable');
  await send('Runtime.enable');

  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2500));

  await send('Runtime.evaluate', {
    expression: `(() => {
      document.documentElement.setAttribute('data-fridge', 'skip');
      const fridge = document.querySelector('.sbx-fridge');
      if (fridge) fridge.remove();
      const modal = document.querySelector('[role="dialog"], .sb-quiz-modal, .sbx-popup');
      if (modal) modal.remove();
      document.body.style.removeProperty('overflow');
      const el = document.getElementById('flavours');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Desktop full section
  const snap1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(
    path.join(artifactDir, 'duo_typography_desktop.png'),
    Buffer.from(snap1.data, 'base64')
  );
  console.log('Saved duo_typography_desktop.png');

  // 2. Desktop scrolled to text details
  await send('Runtime.evaluate', {
    expression: `window.scrollBy({ top: 320, behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 800));

  const snap2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(
    path.join(artifactDir, 'duo_typography_desktop_info.png'),
    Buffer.from(snap2.data, 'base64')
  );
  console.log('Saved duo_typography_desktop_info.png');

  // 3. Mobile view
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 800));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('flavours');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));

  const snap3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(
    path.join(artifactDir, 'duo_typography_mobile.png'),
    Buffer.from(snap3.data, 'base64')
  );
  console.log('Saved duo_typography_mobile.png');

  ws.close();
  chrome.kill();
  console.log('All verification captures completed!');
}

main().catch(console.error);
