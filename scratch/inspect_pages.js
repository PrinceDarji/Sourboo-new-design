const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_inspect_${Date.now()}`);

  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9845',
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
        http.get('http://127.0.0.1:9845/json/list', r => {
          let d = '';
          r.on('data', c => d += c);
          r.on('end', () => res(JSON.parse(d)));
        }).on('error', rej);
      });
      if (list && list.length > 0) break;
    } catch (e) {}
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

  // 1. Visit /product
  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 2500));

  // scroll to flavor matcher
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('shop-taste-game');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 500));

  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/inspect_shop_matcher_init.png', Buffer.from(shot.data, 'base64'));

  // click player 1 button in HUD
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.sbx-game__tag--p1');
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/inspect_shop_matcher_p1.png', Buffer.from(shot.data, 'base64'));

  // click player 2 button in HUD
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.sbx-game__tag--p2');
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/inspect_shop_matcher_p2.png', Buffer.from(shot.data, 'base64'));

  // 2. Visit / (homepage)
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2500));

  // scroll to taste game on home
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('taste-game');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/inspect_home_taste_game.png', Buffer.from(shot.data, 'base64'));

  // scroll to sour sampler on home
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.sbx-duo__both');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/inspect_home_sour_sampler.png', Buffer.from(shot.data, 'base64'));

  console.log('All screenshots captured successfully!');
  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
