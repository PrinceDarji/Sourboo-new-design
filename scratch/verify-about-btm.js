const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDir = `C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c\\scratch\\cprofile_btm_${Date.now()}`;

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9515',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1080',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 20; attempt++) {
    await new Promise(r => setTimeout(r, 600));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9515/json/list', res => {
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
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    return new Promise(resolve => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 2000));
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        localStorage.setItem('sourboo_fridge_seen_v1', String(Date.now()));
        localStorage.setItem('sourboo_popup_dismissed', '1');
        localStorage.setItem('sourboo_popup_seen', '1');
        document.documentElement.setAttribute('data-fridge', 'skip');
        const fridge = document.querySelector('.sbx-fridge');
        if (fridge) fridge.remove();
        const popup = document.querySelector('.sb-popup-overlay');
        if (popup) popup.remove();
        const el = document.querySelector('.sb-story-social-feed');
        if (el) el.scrollIntoView({ block: 'start' });
      })()
    `
  });
  await new Promise(r => setTimeout(r, 800));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('c:/Users/user/Downloads/Sourboo/verify_about_4_reels.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved verify_about_4_reels.png');

  ws.close();
  chrome.kill();
}

main().catch(console.error);
