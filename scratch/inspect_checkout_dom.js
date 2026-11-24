const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

async function test() {
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9870',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:3000/checkout'
  ]);

  let list = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      list = await new Promise((res, rej) => {
        http.get('http://127.0.0.1:9870/json/list', r => {
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
  await new Promise(r => setTimeout(r, 1500));

  const result = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('header');
      const h1 = document.querySelector('h1');
      const container = h1 ? h1.closest('div[class*="max-w"]') : null;
      return {
        headerRect: header ? header.getBoundingClientRect() : null,
        headerComputedHeight: header ? getComputedStyle(header).height : null,
        headerComputedPosition: header ? getComputedStyle(header).position : null,
        containerRect: container ? container.getBoundingClientRect() : null,
        containerPaddingTop: container ? getComputedStyle(container).paddingTop : null,
        h1Rect: h1 ? h1.getBoundingClientRect() : null,
      };
    })()`,
    returnByValue: true
  });

  console.log(JSON.stringify(result.result.value, null, 2));
  ws.close();
  chrome.kill();
}
test();
