const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_clean_${Date.now()}`);

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9648',
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
        http.get('http://127.0.0.1:9648/json/list', res => {
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

  // Disable fridge loader completely before navigating
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      try {
        localStorage.setItem('sourboo_fridge_seen', String(Date.now()));
        sessionStorage.setItem('sourboo_fridge_seen', String(Date.now()));
      } catch (e) {}
      document.documentElement.setAttribute('data-fridge', 'skip');
    `
  });

  console.log('Navigating to http://localhost:3000/#flavours...');
  await send('Page.navigate', { url: 'http://localhost:3000/#flavours' });
  await new Promise(r => setTimeout(r, 3500));

  // Remove any modal or popup elements
  await send('Runtime.evaluate', {
    expression: `
      document.querySelectorAll('[class*="popup"], [class*="modal"], .sbx-fridge').forEach(el => el.remove());
      const duo = document.querySelector('.sbx-duo');
      if (duo) {
        window.scrollTo(0, duo.getBoundingClientRect().top + window.scrollY);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Capture Desktop Closed
  console.log('1. Capturing Desktop Closed...');
  let shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'final_desktop_showcase_closed.png'), Buffer.from(shot1.data, 'base64'));

  // 2. Click Side Eye jar
  console.log('2. Clicking Side Eye jar...');
  const resClick1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (!jar) return { error: 'not found' };
        jar.click();
        return {
          clicked: true,
          isOpen: jar.classList.contains('is-open'),
          ariaPressed: jar.getAttribute('aria-pressed'),
          ingredientsCount: jar.querySelectorAll('.sbx-jar__ingredient').length
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Click Side Eye result:', resClick1.result.value);
  await new Promise(r => setTimeout(r, 1200));

  // Capture Desktop Side Eye Open
  console.log('Capturing Desktop Side Eye Open...');
  let shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'final_desktop_side_eye_open.png'), Buffer.from(shot2.data, 'base64'));

  // 3. Click Tamarin Tease jar
  console.log('3. Clicking Tamarin Tease jar...');
  const resClick2 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--tamarin');
        if (!jar) return { error: 'not found' };
        jar.click();
        return {
          clicked: true,
          isOpen: jar.classList.contains('is-open'),
          ariaPressed: jar.getAttribute('aria-pressed'),
          ingredientsCount: jar.querySelectorAll('.sbx-jar__ingredient').length
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Click Tamarin Tease result:', resClick2.result.value);
  await new Promise(r => setTimeout(r, 1200));

  // Capture Desktop Both Open
  console.log('Capturing Desktop Both Open...');
  let shot3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'final_desktop_both_open.png'), Buffer.from(shot3.data, 'base64'));

  // 4. Click Side Eye again to toggle it closed
  console.log('4. Clicking Side Eye again to toggle closed...');
  const resClickClose = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (!jar) return { error: 'not found' };
        jar.click();
        return {
          clicked: true,
          isOpen: jar.classList.contains('is-open'),
          ariaPressed: jar.getAttribute('aria-pressed')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Click Side Eye toggle close result:', resClickClose.result.value);
  await new Promise(r => setTimeout(r, 800));

  // 5. Scroll to Sour Sampler (.sbx-duo__both)
  console.log('5. Scrolling to Sour Sampler on desktop...');
  const resSampler = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sampler = document.querySelector('.sbx-duo__both');
        if (!sampler) return { error: 'not found' };
        window.scrollTo(0, sampler.getBoundingClientRect().top + window.scrollY - 100);
        const style = window.getComputedStyle(sampler);
        return {
          exists: true,
          bg: style.backgroundColor,
          borderRadius: style.borderRadius,
          border: style.border,
          boxShadow: style.boxShadow
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Sour Sampler desktop styles:', resSampler.result.value);
  await new Promise(r => setTimeout(r, 1000));

  // Capture Desktop Sour Sampler
  console.log('Capturing Desktop Sour Sampler...');
  let shot4 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'final_desktop_sour_sampler.png'), Buffer.from(shot4.data, 'base64'));

  // --- MOBILE EMULATION (390x844) ---
  console.log('6. Switching to mobile viewport (390x844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
    hasTouch: true
  });

  // Scroll to duo on mobile
  await send('Runtime.evaluate', {
    expression: `
      const duo = document.querySelector('.sbx-duo');
      if (duo) {
        window.scrollTo(0, duo.getBoundingClientRect().top + window.scrollY);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  // Capture Mobile Closed
  console.log('Capturing Mobile Closed...');
  let shotMob1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'final_mobile_showcase_closed.png'), Buffer.from(shotMob1.data, 'base64'));

  // Tap jar on mobile
  console.log('7. Tapping Side Eye jar on mobile...');
  const resMobTap = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const jar = document.querySelector('.sbx-jar--side-eye');
        if (!jar) return { error: 'not found' };
        jar.click();
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        return {
          tapped: true,
          isOpen: jar.classList.contains('is-open'),
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasHorizontalOverflow: overflow
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Mobile tap result:', resMobTap.result.value);
  await new Promise(r => setTimeout(r, 1200));

  // Capture Mobile Open
  console.log('Capturing Mobile Open...');
  let shotMob2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'final_mobile_showcase_open.png'), Buffer.from(shotMob2.data, 'base64'));

  // Scroll to Sour Sampler on mobile
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

  // Capture Mobile Sour Sampler
  console.log('Capturing Mobile Sour Sampler...');
  let shotMob3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'final_mobile_sour_sampler.png'), Buffer.from(shotMob3.data, 'base64'));

  ws.close();
  chrome.kill();
  console.log('SUCCESS! All tests and captures complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
