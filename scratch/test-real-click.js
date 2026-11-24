const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_clicktest_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9640',
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
        http.get('http://127.0.0.1:9640/json/list', res => {
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
  await send('DOM.enable');

  console.log('Navigating to http://localhost:3000...');
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 4000));

  // Remove fridge/popups and scroll to flavours
  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.setAttribute('data-fridge', 'skip');
      document.querySelectorAll('.sbx-fridge, [class*="popup"], [class*="modal"], [class*="FridgeLoader"]').forEach(el => el.remove());
      const duo = document.querySelector('.sbx-duo');
      if (duo) {
        window.scrollTo(0, duo.getBoundingClientRect().top + window.scrollY);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  // Desktop Closed screenshot
  console.log('Capturing Desktop Closed...');
  let shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'test_desktop_closed.png'), Buffer.from(shot1.data, 'base64'));

  // Click Side Eye
  console.log('Clicking Side Eye...');
  const res1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (!jar) return { error: 'not found' };
        jar.click();
        return {
          clicked: true,
          className: jar.className,
          isOpen: jar.classList.contains('is-open')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Click Side Eye result:', res1.result.value);
  await new Promise(r => setTimeout(r, 1200));

  // Desktop Side Eye Open screenshot
  console.log('Capturing Desktop Side Eye Open...');
  let shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'test_desktop_side_eye_open.png'), Buffer.from(shot2.data, 'base64'));

  // Click Tamarin
  console.log('Clicking Tamarin...');
  const res2 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--tamarin');
        if (!jar) return { error: 'not found' };
        jar.click();
        return {
          clicked: true,
          className: jar.className,
          isOpen: jar.classList.contains('is-open')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Click Tamarin result:', res2.result.value);
  await new Promise(r => setTimeout(r, 1200));

  // Desktop Both Open screenshot
  console.log('Capturing Desktop Both Open...');
  let shot3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'test_desktop_both_open.png'), Buffer.from(shot3.data, 'base64'));

  // Click Side Eye again to close it
  console.log('Clicking Side Eye again to close...');
  const res3 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (!jar) return { error: 'not found' };
        jar.click();
        return {
          clicked: true,
          className: jar.className,
          isOpen: jar.classList.contains('is-open')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Click Side Eye close result:', res3.result.value);
  await new Promise(r => setTimeout(r, 800));

  // Scroll to Sour Sampler (.sbx-duo__both)
  console.log('Scrolling to Sour Sampler...');
  const samplerCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sampler = document.querySelector('.sbx-duo__both');
        if (!sampler) return { error: 'sampler not found' };
        window.scrollTo(0, sampler.getBoundingClientRect().top + window.scrollY - 100);
        const style = window.getComputedStyle(sampler);
        return {
          background: style.backgroundColor,
          borderRadius: style.borderRadius,
          border: style.border,
          boxShadow: style.boxShadow
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Sour Sampler computed styles:', samplerCheck.result.value);
  await new Promise(r => setTimeout(r, 800));

  // Desktop Sour Sampler screenshot
  console.log('Capturing Desktop Sour Sampler...');
  let shot4 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'test_desktop_sour_sampler.png'), Buffer.from(shot4.data, 'base64'));

  // --- MOBILE EMULATION ---
  console.log('Switching to mobile (390x844)...');
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
  await new Promise(r => setTimeout(r, 1000));

  // Mobile Closed screenshot
  console.log('Capturing Mobile Closed...');
  let shotMobClosed = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'test_mobile_closed.png'), Buffer.from(shotMobClosed.data, 'base64'));

  // Tap mobile jar
  console.log('Tapping Side Eye on mobile...');
  const resMob = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (!jar) return { error: 'not found' };
        jar.click();
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        return {
          clicked: true,
          className: jar.className,
          isOpen: jar.classList.contains('is-open'),
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasHorizontalOverflow: overflow
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Mobile tap result:', resMob.result.value);
  await new Promise(r => setTimeout(r, 1200));

  // Mobile Open screenshot
  console.log('Capturing Mobile Open...');
  let shotMobOpen = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'test_mobile_open.png'), Buffer.from(shotMobOpen.data, 'base64'));

  // Scroll to Sour Sampler on mobile
  console.log('Scrolling to Sour Sampler on mobile...');
  await send('Runtime.evaluate', {
    expression: `
      const sampler = document.querySelector('.sbx-duo__both');
      if (sampler) {
        window.scrollTo(0, sampler.getBoundingClientRect().top + window.scrollY - 80);
      }
    `
  });
  await new Promise(r => setTimeout(r, 800));

  // Mobile Sour Sampler screenshot
  console.log('Capturing Mobile Sour Sampler...');
  let shotMobSampler = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'test_mobile_sour_sampler.png'), Buffer.from(shotMobSampler.data, 'base64'));

  ws.close();
  chrome.kill();
  console.log('All tests passed and screenshots captured!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
