const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_duo_exact_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9538',
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
        http.get('http://127.0.0.1:9538/json/list', res => {
          let d = '';
          res.on('data', chunk => d += chunk);
          res.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
      });
      if (list && list.length > 0) break;
    } catch (e) {}
  }

  const page = list[0];
  const WebSocket = require(path.resolve('repo/sourboo-final-main/node_modules/ws'));
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(res => ws.on('open', res));

  let id = 1;
  function send(method, params = {}) {
    return new Promise(res => {
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
  }

  await send('Page.enable');
  await send('Runtime.enable');

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 2500));

  // Dismiss loaders
  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.setAttribute('data-fridge', 'skip');
      document.querySelectorAll('.sbx-fridge, [class*="popup"], [class*="modal"]').forEach(el => el.remove());
      const track = document.querySelector('.sbx-duo__track');
      if (track) {
        const top = track.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top - 120);
      }
    `
  });
  await new Promise(r => setTimeout(r, 800));

  let shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'duo_real_closed.png'), Buffer.from(shot1.data, 'base64'));
  console.log('Saved duo_real_closed.png');

  // Click on jar 1 (Side Eye Sour)
  const clickRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (jar) {
          jar.click();
          return { clicked: true, classes: jar.className };
        }
        return { clicked: false };
      })()
    `,
    returnByValue: true
  });
  console.log('Click 1:', clickRes.result.value);

  // Click on jar 2 (Tamarin Tease) as well!
  await send('Runtime.evaluate', {
    expression: `
      const jar2 = document.querySelector('.sbx-jar--tamarin');
      if (jar2) jar2.click();
    `
  });

  await new Promise(r => setTimeout(r, 1200));

  let shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'duo_real_open.png'), Buffer.from(shot2.data, 'base64'));
  console.log('Saved duo_real_open.png');

  // Scroll to Sour Sampler
  await send('Runtime.evaluate', {
    expression: `
      const both = document.querySelector('.sbx-duo__both');
      if (both) {
        const top = both.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top - 150);
      }
    `
  });
  await new Promise(r => setTimeout(r, 800));

  let shot3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'duo_real_sampler.png'), Buffer.from(shot3.data, 'base64'));
  console.log('Saved duo_real_sampler.png');

  ws.close();
  chrome.kill();
  console.log('Done all!');
}

main().catch(console.error);
