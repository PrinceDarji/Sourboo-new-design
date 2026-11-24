const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function test() {
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_about_${Date.now()}`);

  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9890',
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
        http.get('http://127.0.0.1:9890/json/list', r => {
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

  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 2000));

  // Dismiss any popups
  await send('Runtime.evaluate', {
    expression: `(() => {
      localStorage.setItem('sourboo_quiz_dismissed', 'true');
      localStorage.setItem('sourboo_popup_dismissed_v1', 'true');
      const modal = document.querySelector('[class*="popup"], [class*="quiz-modal"], [class*="LandingPopup"]');
      if (modal) modal.remove();
    })()`
  });

  // Capture full page or multiple scroll sections
  // 1. Hero / Section 1
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/about_current_hero.png', Buffer.from(shot.data, 'base64'));

  // 2. Scroll to Section 2 (Flavour obsession)
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.sb-story-flavour');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/about_current_sec2.png', Buffer.from(shot.data, 'base64'));

  // 3. Scroll to Section 3 (Editorial / Photos)
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.sb-story-manifesto-wrap');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/about_current_sec3.png', Buffer.from(shot.data, 'base64'));

  // 4. Scroll to Section 4 & Footer
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.sbx-footer');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'end' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/about_current_footer.png', Buffer.from(shot.data, 'base64'));

  ws.close();
  chrome.kill();
  console.log('Current about screenshots captured');
}
test();
