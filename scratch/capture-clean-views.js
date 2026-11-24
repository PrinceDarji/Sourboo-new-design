const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function test() {
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_phone_capture_${Date.now()}`);

  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9680',
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
        http.get('http://127.0.0.1:9680/json/list', r => {
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

  // Scroll perfectly so the entire phone is centered in the visible viewport (below nav)
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const phone = document.querySelector('.sbx-phone');
        if (!phone) return;
        const rect = phone.getBoundingClientRect();
        const nav = document.querySelector('.sbx-nav');
        const navH = nav ? nav.offsetHeight : 70;
        const visibleH = window.innerHeight - navH;
        const targetScrollY = window.scrollY + rect.top - navH - (visibleH - rect.height) / 2;
        window.scrollTo(0, targetScrollY);
      })()
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  // Screenshot 1: Desktop Initial view (Slide 1)
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'realistic_iphone_full_desktop.png'), Buffer.from(shot1.data, 'base64'));
  console.log('Saved realistic_iphone_full_desktop.png');

  // Screenshot 2: Click next arrow
  await send('Runtime.evaluate', {
    expression: `
      const next = document.querySelector('.sbx-phone__arrow--next');
      if (next) next.click();
    `
  });
  await new Promise(r => setTimeout(r, 800));

  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'realistic_iphone_slide2.png'), Buffer.from(shot2.data, 'base64'));
  console.log('Saved realistic_iphone_slide2.png');

  // Screenshot 3: Mobile Viewport (390x844)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
    hasTouch: true
  });

  await send('Runtime.evaluate', {
    expression: `
      const phone = document.querySelector('.sbx-phone');
      if (phone) {
        const rect = phone.getBoundingClientRect();
        const nav = document.querySelector('.sbx-nav');
        const navH = nav ? nav.offsetHeight : 60;
        window.scrollTo(0, window.scrollY + rect.top - navH - 20);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  const shotMob = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'realistic_iphone_full_mobile.png'), Buffer.from(shotMob.data, 'base64'));
  console.log('Saved realistic_iphone_full_mobile.png');

  ws.close();
  chrome.kill();
  console.log('DONE!');
}

test().catch(console.error);
