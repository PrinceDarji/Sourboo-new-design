const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_prominent_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9675',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9675/json/list', res => {
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

  // Disable fridge loader and personality popup
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      try {
        localStorage.setItem('sourboo_fridge_seen_v1', String(Date.now()));
        sessionStorage.setItem('sourboo_fridge_seen_v1', String(Date.now()));
        localStorage.setItem('sourboo_popup_seen', '1');
        localStorage.setItem('sourboo_popup_dismissed', '1');
        sessionStorage.setItem('sourboo_popup_seen', '1');
        sessionStorage.setItem('sourboo_popup_dismissed', '1');
      } catch (e) {}
    `
  });

  console.log('Navigating to http://localhost:3000/#flavours...');
  await send('Page.navigate', { url: 'http://localhost:3000/#flavours' });
  await new Promise(r => setTimeout(r, 3500));

  // --- DESKTOP PROMINENT SOUR SAMPLER ---
  console.log('Scrolling to Sour Sampler on desktop...');
  const desktopDetails = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sampler = document.querySelector('.sbx-duo__both');
        if (!sampler) return { error: 'not found' };
        window.scrollTo(0, sampler.getBoundingClientRect().top + window.scrollY - 100);
        const style = window.getComputedStyle(sampler);
        const nameEl = sampler.querySelector('.sbx-duo__both-name');
        const descEl = sampler.querySelector('.sbx-duo__both-desc');
        const btnEl = sampler.querySelector('.sbx-duo__add--both');
        const linkEl = sampler.querySelector('.sbx-text-link');
        const imgEl = sampler.querySelector('.sbx-duo__both-img');

        return {
          containerWidth: sampler.offsetWidth,
          containerHeight: sampler.offsetHeight,
          bg: style.backgroundColor,
          borderRadius: style.borderRadius,
          titleText: nameEl ? nameEl.textContent : null,
          titleFontSize: nameEl ? window.getComputedStyle(nameEl).fontSize : null,
          titleColor: nameEl ? window.getComputedStyle(nameEl).color : null,
          descText: descEl ? descEl.textContent : null,
          descFontSize: descEl ? window.getComputedStyle(descEl).fontSize : null,
          descColor: descEl ? window.getComputedStyle(descEl).color : null,
          btnText: btnEl ? btnEl.textContent : null,
          btnBg: btnEl ? window.getComputedStyle(btnEl).backgroundColor : null,
          btnColor: btnEl ? window.getComputedStyle(btnEl).color : null,
          linkText: linkEl ? linkEl.textContent : null,
          linkDecoration: linkEl ? window.getComputedStyle(linkEl).textDecorationLine : null,
          imgWidth: imgEl ? imgEl.offsetWidth : null
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Desktop Sour Sampler Details:', JSON.stringify(desktopDetails.result.value, null, 2));
  await new Promise(r => setTimeout(r, 1000));

  let shotDesk = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'prominent_desktop_sour_sampler.png'), Buffer.from(shotDesk.data, 'base64'));
  console.log('Saved prominent_desktop_sour_sampler.png');

  // --- MOBILE EMULATION (390x844) ---
  console.log('Switching to mobile viewport (390x844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
    hasTouch: true
  });

  await send('Runtime.evaluate', {
    expression: `
      const sampler = document.querySelector('.sbx-duo__both');
      if (sampler) {
        window.scrollTo(0, sampler.getBoundingClientRect().top + window.scrollY - 80);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  const mobileDetails = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sampler = document.querySelector('.sbx-duo__both');
        if (!sampler) return { error: 'not found' };
        const nameEl = sampler.querySelector('.sbx-duo__both-name');
        const descEl = sampler.querySelector('.sbx-duo__both-desc');
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        return {
          containerWidth: sampler.offsetWidth,
          titleFontSize: nameEl ? window.getComputedStyle(nameEl).fontSize : null,
          descFontSize: descEl ? window.getComputedStyle(descEl).fontSize : null,
          docScrollWidth: document.documentElement.scrollWidth,
          winInnerWidth: window.innerWidth,
          hasHorizontalOverflow: overflow
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Mobile Sour Sampler Details:', JSON.stringify(mobileDetails.result.value, null, 2));

  let shotMob = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'prominent_mobile_sour_sampler.png'), Buffer.from(shotMob.data, 'base64'));
  console.log('Saved prominent_mobile_sour_sampler.png');

  ws.close();
  chrome.kill();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
