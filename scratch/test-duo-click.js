const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_duo_click_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9526',
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
        http.get('http://127.0.0.1:9526/json/list', res => {
          let d = '';
          res.on('data', chunk => d += chunk);
          res.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
      });
      if (list && list.length > 0) break;
    } catch (e) {}
  }

  const page = list[0];
  const wsUrl = page.webSocketDebuggerUrl;

  const WebSocket = require(path.resolve('repo/sourboo-final-main/node_modules/ws'));
  const ws = new WebSocket(wsUrl);

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

  await send('Page.navigate', { url: 'http://localhost:3000/#flavours' });
  await new Promise(r => setTimeout(r, 2500));

  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.setAttribute('data-fridge', 'skip');
      document.querySelectorAll('.sbx-fridge, [class*="popup"], [class*="modal"], [class*="FridgeLoader"]').forEach(el => el.remove());
      const duo = document.getElementById('flavours');
      if (duo) duo.scrollIntoView({ block: 'center' });
    `
  });
  await new Promise(r => setTimeout(r, 800));

  let before = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'duo_before_click.png'), Buffer.from(before.data, 'base64'));

  // Click on the first jar
  const clickRes = await send('Runtime.evaluate', {
    expression: `
      const jar = document.querySelector('.sbx-duo .sbx-jar');
      if (jar) {
        jar.click();
        return { found: true, className: jar.className };
      }
      return { found: false };
    `,
    returnByValue: true
  });
  console.log('Click result:', clickRes.result.value);

  await new Promise(r => setTimeout(r, 1000));

  let after = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'duo_after_click.png'), Buffer.from(after.data, 'base64'));

  // Also check sampler element
  const samplerInfo = await send('Runtime.evaluate', {
    expression: `
      const sampler = document.querySelector('.sbx-duo__both');
      if (sampler) {
        const style = window.getComputedStyle(sampler);
        return {
          found: true,
          background: style.background,
          backgroundColor: style.backgroundColor,
          borderRadius: style.borderRadius,
          boxShadow: style.boxShadow
        };
      }
      return { found: false };
    `,
    returnByValue: true
  });
  console.log('Sampler info:', samplerInfo.result.value);

  ws.close();
  chrome.kill();
  console.log('Done!');
}

main().catch(console.error);
