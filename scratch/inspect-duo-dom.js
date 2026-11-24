const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_inspect_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9635',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9635/json/list', res => {
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
  await new Promise(r => setTimeout(r, 3500));

  const result = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jars = Array.from(document.querySelectorAll('.sbx-jar')).map(j => ({
          tagName: j.tagName,
          className: j.className,
          ariaLabel: j.getAttribute('aria-label'),
          rect: j.getBoundingClientRect()
        }));
        const duo = document.querySelector('.sbx-duo');
        return {
          duoExists: !!duo,
          jarsCount: jars.length,
          jars
        };
      })()
    `,
    returnByValue: true
  });

  console.log('DOM Inspection result:', JSON.stringify(result.result.value, null, 2));

  ws.close();
  chrome.kill();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
