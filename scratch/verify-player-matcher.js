const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_verify_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9509',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 25; attempt++) {
    await new Promise(r => setTimeout(r, 600));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9509/json/list', res => {
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

  console.log('Navigating to http://localhost:3000/product ...');
  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 3500));

  // Scroll into view of the taste game
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('shop-taste-game');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Initial State Screenshot
  const snap1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(
    path.join(artifactDir, 'verify_shop_game_initial.png'),
    Buffer.from(snap1.data, 'base64')
  );
  console.log('Captured verify_shop_game_initial.png');

  // 2. Click Player 1
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.sbx-game__side--p1 .sbx-game__pick');
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  const snap2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(
    path.join(artifactDir, 'verify_shop_game_player1.png'),
    Buffer.from(snap2.data, 'base64')
  );
  console.log('Captured verify_shop_game_player1.png');

  // 3. Click Player 2
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.sbx-game__side--p2 .sbx-game__pick');
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  const snap3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(
    path.join(artifactDir, 'verify_shop_game_player2.png'),
    Buffer.from(snap3.data, 'base64')
  );
  console.log('Captured verify_shop_game_player2.png');

  // 4. Mobile Viewport
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 1000));

  const snap4 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(
    path.join(artifactDir, 'verify_shop_game_mobile.png'),
    Buffer.from(snap4.data, 'base64')
  );
  console.log('Captured verify_shop_game_mobile.png');

  ws.close();
  chrome.kill();
  console.log('All verification captures completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
