const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function test() {
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_phone_pos_${Date.now()}`);

  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9679',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1200',
    'about:blank'
  ]);

  let list = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      list = await new Promise((res, rej) => {
        http.get('http://127.0.0.1:9679/json/list', r => {
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
  await send('Runtime.enable');

  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      try {
        localStorage.setItem('sourboo_fridge_seen_v1', String(Date.now()));
        sessionStorage.setItem('sourboo_fridge_seen_v1', String(Date.now()));
        localStorage.setItem('sourboo_popup_seen', '1');
        localStorage.setItem('sourboo_popup_dismissed', '1');
      } catch (e) {}
    `
  });

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 3000));

  // Check section and phone positions
  const pos = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sec = document.querySelector('.sbx-baddies');
        const phone = document.querySelector('.sbx-phone');
        const secRect = sec.getBoundingClientRect();
        const phoneRect = phone.getBoundingClientRect();
        const nav = document.querySelector('.sbx-nav');
        const navH = nav ? nav.offsetHeight : 0;
        
        // Scroll so phone top is well below fixed nav
        const phoneAbsTop = phoneRect.top + window.scrollY;
        window.scrollTo(0, phoneAbsTop - navH - 40);

        return {
          secHeight: sec.offsetHeight,
          phoneHeight: phone.offsetHeight,
          phoneTopRelativeToSection: phone.offsetTop,
          navH
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Position details:', JSON.stringify(pos.result.value, null, 2));

  await new Promise(r => setTimeout(r, 800));

  // Capture screenshot of whole baddies section viewport
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'realistic_iphone_clean_view.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved realistic_iphone_clean_view.png');

  ws.close();
  chrome.kill();
}

test().catch(console.error);
