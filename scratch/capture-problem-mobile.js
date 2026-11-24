const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDir = `C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c\\scratch\\cprofile_${Date.now()}`;

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9490',
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
        http.get('http://127.0.0.1:9490/json/list', res => {
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
      })()
    `
  });

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 1000));

  const scrollRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('.sb-story-problem');
        if (el) {
          el.scrollIntoView({ block: 'start' });
        }
        const eyes = document.querySelector('.sb-story-problem__eyes-row');
        return {
          windowScrollY: window.scrollY,
          elRect: el ? el.getBoundingClientRect() : null,
          eyesRect: eyes ? eyes.getBoundingClientRect() : null,
          eyesHTML: eyes ? eyes.outerHTML : 'none'
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Scroll info:', scrollRes.result?.value);

  // Wait 1.5s for observer to trigger and render
  await new Promise(r => setTimeout(r, 1500));

  // Take screenshot of viewport right after scrollIntoView
  const shot = await send('Page.captureScreenshot', {
    format: 'png'
  });
  fs.writeFileSync('about_mobile_problem_eyes_viewport.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved about_mobile_problem_eyes_viewport.png');

  ws.close();
  chrome.kill();
}

main().catch(console.error);
