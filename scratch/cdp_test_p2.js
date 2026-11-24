const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1280,3000'
  ]);

  // wait for chrome to start
  await new Promise(r => setTimeout(r, 1200));

  function getVersion() {
    return new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9222/json/version', res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
  }

  const ver = await getVersion();
  console.log('Chrome WebSocket debugger URL:', ver.webSocketDebuggerUrl);

  const ws = new WebSocket(ver.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      cb(msg.result, msg.error);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, (res, err) => {
        if (err) reject(err);
        else resolve(res);
      });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => ws.onopen = r);

  // create new target
  const target = await send('Target.createTarget', { url: 'http://localhost:3005/product' });
  const targetWs = new WebSocket(`ws://127.0.0.1:9222/devtools/page/${target.targetId}`);
  await new Promise(r => targetWs.onopen = r);

  let targetIdCounter = 1;
  const targetCallbacks = new Map();
  targetWs.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && targetCallbacks.has(msg.id)) {
      const cb = targetCallbacks.get(msg.id);
      targetCallbacks.delete(msg.id);
      cb(msg.result, msg.error);
    }
  };

  function sendPage(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = targetIdCounter++;
      targetCallbacks.set(msgId, (res, err) => {
        if (err) reject(err);
        else resolve(res);
      });
      targetWs.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await sendPage('Page.enable');
  await sendPage('DOM.enable');
  await sendPage('Runtime.enable');

  // wait for page load
  await new Promise(r => setTimeout(r, 2000));

  // scroll to #shop-taste-game
  await sendPage('Runtime.evaluate', {
    expression: `
      document.querySelector('#shop-taste-game').scrollIntoView({ behavior: 'instant', block: 'start' });
    `
  });
  await new Promise(r => setTimeout(r, 500));

  // click Player 1
  await sendPage('Runtime.evaluate', {
    expression: `
      const btn = document.querySelector('.sbx-game__side--p2 .sbx-game__pick') || document.querySelector('.sbx-game__hud-btn--p1');
      if (btn) btn.click();
    `
  });
  await new Promise(r => setTimeout(r, 700));

  // Capture screenshot of element #shop-taste-game
  const clip = await sendPage('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('#shop-taste-game');
      const r = el.getBoundingClientRect();
      JSON.stringify({ x: window.scrollX + r.left, y: window.scrollY + r.top, width: r.width, height: r.height });
    `,
    returnByValue: true
  });
  const rect = JSON.parse(clip.result.value);
  console.log('Element rect:', rect);

  const screenshot = await sendPage('Page.captureScreenshot', {
    format: 'png',
    clip: {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      scale: 1
    }
  });

  fs.writeFileSync('scratch/taste_game_p2.png', Buffer.from(screenshot.data, 'base64'));
  console.log('Saved scratch/taste_game_interactive.png');

  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
