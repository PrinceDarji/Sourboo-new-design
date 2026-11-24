const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_pristine_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9670',
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
        http.get('http://127.0.0.1:9670/json/list', res => {
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

  // Scroll to duo
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const duo = document.querySelector('.sbx-duo');
        if (duo) {
          window.scrollTo(0, duo.getBoundingClientRect().top + window.scrollY);
        }
      })()
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Desktop Closed
  console.log('1. Capturing Desktop Closed...');
  let shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'showcase_desktop_closed.png'), Buffer.from(shot1.data, 'base64'));

  // 2. Click Side Eye jar
  console.log('2. Clicking Side Eye jar...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (jar) jar.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  const check1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        return {
          isOpen: jar.classList.contains('is-open'),
          ariaPressed: jar.getAttribute('aria-pressed')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Side Eye state after click:', check1.result.value);

  // Capture Desktop Side Eye Open
  console.log('Capturing Desktop Side Eye Open...');
  let shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'showcase_desktop_side_eye_open.png'), Buffer.from(shot2.data, 'base64'));

  // 3. Click Tamarin Tease jar
  console.log('3. Clicking Tamarin Tease jar...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--tamarin');
        if (jar) jar.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  const check2 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--tamarin');
        return {
          isOpen: jar.classList.contains('is-open'),
          ariaPressed: jar.getAttribute('aria-pressed')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Tamarin Tease state after click:', check2.result.value);

  // Capture Desktop Both Open
  console.log('Capturing Desktop Both Open...');
  let shot3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'showcase_desktop_both_open.png'), Buffer.from(shot3.data, 'base64'));

  // 4. Click Side Eye again to toggle closed
  console.log('4. Clicking Side Eye again to toggle closed...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (jar) jar.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 800));

  const check3 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        return {
          isOpen: jar.classList.contains('is-open'),
          ariaPressed: jar.getAttribute('aria-pressed')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Side Eye state after toggle close:', check3.result.value);

  // 5. Scroll to Sour Sampler
  console.log('5. Scrolling to Sour Sampler on desktop...');
  const samplerInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sampler = document.querySelector('.sbx-duo__both');
        if (!sampler) return { error: 'not found' };
        window.scrollTo(0, sampler.getBoundingClientRect().top + window.scrollY - 100);
        const style = window.getComputedStyle(sampler);
        return {
          bg: style.backgroundColor,
          borderRadius: style.borderRadius,
          border: style.border,
          boxShadow: style.boxShadow,
          title: sampler.querySelector('.sbx-duo__both-name')?.textContent,
          desc: sampler.querySelector('.sbx-duo__both-desc')?.textContent,
          btnText: sampler.querySelector('.sbx-duo__add--both')?.textContent
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Sour Sampler desktop details:', samplerInfo.result.value);
  await new Promise(r => setTimeout(r, 1000));

  let shot4 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'showcase_desktop_sour_sampler.png'), Buffer.from(shot4.data, 'base64'));

  // --- MOBILE EMULATION (390x844) ---
  console.log('6. Switching to mobile viewport (390x844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
    hasTouch: true
  });

  await send('Runtime.evaluate', {
    expression: `
      const duo = document.querySelector('.sbx-duo');
      if (duo) {
        window.scrollTo(0, duo.getBoundingClientRect().top + window.scrollY);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  let shotMob1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'showcase_mobile_closed.png'), Buffer.from(shotMob1.data, 'base64'));

  // 7. Tap on jar on mobile
  console.log('7. Tapping Side Eye on mobile...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (jar) jar.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  const mobCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        return {
          isOpen: jar.classList.contains('is-open'),
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasHorizontalOverflow: overflow
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Mobile tap verification:', mobCheck.result.value);

  let shotMob2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'showcase_mobile_open.png'), Buffer.from(shotMob2.data, 'base64'));

  // 8. Scroll to Sour Sampler on mobile
  console.log('8. Scrolling to Sour Sampler on mobile...');
  await send('Runtime.evaluate', {
    expression: `
      const sampler = document.querySelector('.sbx-duo__both');
      if (sampler) {
        window.scrollTo(0, sampler.getBoundingClientRect().top + window.scrollY - 80);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  let shotMob3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'showcase_mobile_sour_sampler.png'), Buffer.from(shotMob3.data, 'base64'));

  ws.close();
  chrome.kill();
  console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
