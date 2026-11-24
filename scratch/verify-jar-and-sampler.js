const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_verify_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9632',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1000',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9632/json/list', res => {
          let d = '';
          res.on('data', chunk => d += chunk);
          res.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
      });
      if (list && list.length > 0) break;
    } catch (e) {}
  }

  if (!list || !list[0]) {
    console.error('Could not connect to Chrome debugging port');
    process.exit(1);
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
  await send('DOM.enable');

  console.log('Navigating to http://localhost:3000/#flavours...');
  await send('Page.navigate', { url: 'http://localhost:3000/#flavours' });
  await new Promise(r => setTimeout(r, 3000));

  // --- DESKTOP TESTS ---
  console.log('Preparing Desktop view...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.setAttribute('data-fridge', 'skip');
      document.querySelectorAll('.sbx-fridge, [class*="popup"], [class*="modal"], [class*="FridgeLoader"]').forEach(el => el.remove());
      const flavours = document.getElementById('flavours');
      if (flavours) {
        const top = flavours.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  // Capture Desktop closed jars
  let shotClosed = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'desktop_showcase_closed.png'), Buffer.from(shotClosed.data, 'base64'));
  console.log('Saved desktop_showcase_closed.png');

  // Click on Side Eye Sour jar
  console.log('Clicking Side Eye Sour jar on desktop...');
  const clickSideEye = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-duo .sbx-jar--side-eye');
        if (!jar) return { success: false, reason: 'jar not found' };
        jar.click();
        return {
          success: true,
          isOpen: jar.classList.contains('is-open'),
          pressed: jar.getAttribute('aria-pressed')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Side Eye click result:', clickSideEye.result.value);
  await new Promise(r => setTimeout(r, 1000));

  let shotSideEyeOpen = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'desktop_showcase_side_eye_open.png'), Buffer.from(shotSideEyeOpen.data, 'base64'));
  console.log('Saved desktop_showcase_side_eye_open.png');

  // Click on Tamarin' Tease jar
  console.log('Clicking Tamarin Tease jar on desktop...');
  const clickTamarin = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-duo .sbx-jar--tamarin');
        if (!jar) return { success: false, reason: 'jar not found' };
        jar.click();
        return {
          success: true,
          isOpen: jar.classList.contains('is-open'),
          pressed: jar.getAttribute('aria-pressed')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Tamarin click result:', clickTamarin.result.value);
  await new Promise(r => setTimeout(r, 1000));

  let shotBothOpen = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'desktop_showcase_both_open.png'), Buffer.from(shotBothOpen.data, 'base64'));
  console.log('Saved desktop_showcase_both_open.png');

  // Click Side Eye again to toggle it closed
  console.log('Clicking Side Eye again to toggle closed...');
  const clickSideEyeClose = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-duo .sbx-jar--side-eye');
        if (!jar) return { success: false };
        jar.click();
        return {
          success: true,
          isOpen: jar.classList.contains('is-open'),
          pressed: jar.getAttribute('aria-pressed')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Side Eye toggle close result:', clickSideEyeClose.result.value);

  // Scroll to Sour Sampler
  console.log('Scrolling to Sour Sampler on desktop...');
  await send('Runtime.evaluate', {
    expression: `
      const sampler = document.querySelector('.sbx-duo__both');
      if (sampler) {
        const top = sampler.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo(0, top);
      }
    `
  });
  await new Promise(r => setTimeout(r, 800));

  let shotSamplerDesktop = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'desktop_sour_sampler.png'), Buffer.from(shotSamplerDesktop.data, 'base64'));
  console.log('Saved desktop_sour_sampler.png');

  // --- MOBILE TESTS ---
  console.log('Preparing Mobile view (390x844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
    hasTouch: true
  });

  await send('Runtime.evaluate', {
    expression: `
      const flavours = document.getElementById('flavours');
      if (flavours) {
        const top = flavours.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  let shotMobileClosed = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile_showcase_closed.png'), Buffer.from(shotMobileClosed.data, 'base64'));
  console.log('Saved mobile_showcase_closed.png');

  // Tap jar on mobile
  console.log('Tapping jar on mobile...');
  const tapMobile = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-duo .sbx-jar--side-eye');
        if (!jar) return { success: false };
        jar.click();
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        return {
          success: true,
          isOpen: jar.classList.contains('is-open'),
          docScrollWidth: document.documentElement.scrollWidth,
          winInnerWidth: window.innerWidth,
          hasHorizontalOverflow: overflow
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Mobile tap result:', tapMobile.result.value);
  await new Promise(r => setTimeout(r, 1000));

  let shotMobileOpen = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile_showcase_open.png'), Buffer.from(shotMobileOpen.data, 'base64'));
  console.log('Saved mobile_showcase_open.png');

  // Scroll to Sour Sampler on mobile
  console.log('Scrolling to Sour Sampler on mobile...');
  await send('Runtime.evaluate', {
    expression: `
      const sampler = document.querySelector('.sbx-duo__both');
      if (sampler) {
        const top = sampler.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo(0, top);
      }
    `
  });
  await new Promise(r => setTimeout(r, 800));

  let shotMobileSampler = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'mobile_sour_sampler.png'), Buffer.from(shotMobileSampler.data, 'base64'));
  console.log('Saved mobile_sour_sampler.png');

  ws.close();
  chrome.kill();
  console.log('All tests and screenshots completed successfully!');
}

main().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
