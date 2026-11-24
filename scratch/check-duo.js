const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_duo_check_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9536',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1200',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 25; attempt++) {
    await new Promise(r => setTimeout(r, 600));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9536/json/list', res => {
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

  const info = await send('Runtime.evaluate', {
    expression: `
      (() => {
        document.documentElement.setAttribute('data-fridge', 'skip');
        document.querySelectorAll('.sbx-fridge, [class*="popup"], [class*="modal"]').forEach(el => el.remove());
        const duo = document.getElementById('flavours');
        const track = document.querySelector('.sbx-duo__track');
        const both = document.querySelector('.sbx-duo__both');
        const jars = Array.from(document.querySelectorAll('.sbx-duo .sbx-jar')).map(j => ({
          className: j.className,
          rect: j.getBoundingClientRect()
        }));
        return {
          duoTop: duo ? duo.offsetTop : null,
          trackTop: track ? track.offsetTop : null,
          bothTop: both ? both.offsetTop : null,
          bothClasses: both ? both.className : null,
          jars
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Duo info:', JSON.stringify(info.result.value, null, 2));

  ws.close();
  chrome.kill();
}

main().catch(console.error);
