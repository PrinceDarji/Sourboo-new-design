const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function test() {
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_crave_clean_${Date.now()}`);

  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9885',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    'about:blank'
  ]);

  let list = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      list = await new Promise((res, rej) => {
        http.get('http://127.0.0.1:9885/json/list', r => {
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

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 1200));

  // Dismiss quiz completely
  await send('Runtime.evaluate', {
    expression: `(() => {
      localStorage.setItem('sourboo_quiz_dismissed', 'true');
      localStorage.setItem('sourboo_popup_dismissed_v1', 'true');
      sessionStorage.setItem('sourboo_quiz_dismissed', 'true');
    })()`
  });

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2500));

  // Scroll to CravingsIntro title
  await send('Runtime.evaluate', {
    expression: `(() => {
      const modal = document.querySelector('[class*="popup"], [class*="quiz-modal"], [class*="LandingPopup"]');
      if (modal) modal.remove();
      const el = document.getElementById('sbx-crave-title');
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'instant' });
      }
    })()`
  });
  await new Promise(r => setTimeout(r, 1200));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/inspect_cravings_clean.png', Buffer.from(shot.data, 'base64'));
  fs.writeFileSync(path.join(artifactDir, 'inspect_cravings_clean.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved inspect_cravings_clean.png');

  ws.close();
  chrome.kill();
}
test();
