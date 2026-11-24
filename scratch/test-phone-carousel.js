const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_phone_verify_${Date.now()}`);

  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9678',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1150',
    'about:blank'
  ]);

  let list = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      list = await new Promise((res, rej) => {
        http.get('http://127.0.0.1:9678/json/list', r => {
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

  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      try {
        localStorage.setItem('sourboo_fridge_seen_v1', String(Date.now()));
        sessionStorage.setItem('sourboo_fridge_seen_v1', String(Date.now()));
        localStorage.setItem('sourboo_popup_seen', '1');
        localStorage.setItem('sourboo_popup_dismissed', '1');
      } catch (e) {}
    `
  });

  console.log('Navigating to http://localhost:3000...');
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise(r => setTimeout(r, 3500));

  console.log('Scrolling to .sbx-baddies...');
  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('.sbx-baddies');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  // Inspect phone measurements
  const desktopMetrics = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const phone = document.querySelector('.sbx-phone');
        const frame = document.querySelector('.sbx-phone__frame');
        const screen = document.querySelector('.sbx-phone__screen');
        const island = document.querySelector('.sbx-phone__island');
        const media = document.querySelector('.sbx-phone__media');
        const img = document.querySelector('.sbx-phone__slide-img');
        const counter = document.querySelector('.sbx-phone__counter');
        const dots = document.querySelectorAll('.sbx-phone__dot');
        const activeDot = document.querySelector('.sbx-phone__dot.is-active');

        return {
          frameWidth: frame ? frame.offsetWidth : null,
          frameHeight: frame ? frame.offsetHeight : null,
          screenWidth: screen ? screen.offsetWidth : null,
          screenHeight: screen ? screen.offsetHeight : null,
          screenBorderRadius: screen ? window.getComputedStyle(screen).borderRadius : null,
          islandWidth: island ? island.offsetWidth : null,
          islandHeight: island ? island.offsetHeight : null,
          mediaWidth: media ? media.offsetWidth : null,
          mediaHeight: media ? media.offsetHeight : null,
          imgLoaded: img ? (img.complete && img.naturalWidth > 0) : false,
          imgNaturalDimensions: img ? \`\${img.naturalWidth}x\${img.naturalHeight}\` : null,
          counterText: counter ? counter.textContent : null,
          totalDots: dots.length,
          activeDotIndex: Array.from(dots).indexOf(activeDot)
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Desktop iPhone Metrics:', JSON.stringify(desktopMetrics.result.value, null, 2));

  // Take screenshot of Slide 1
  let shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'realistic_iphone_desktop_slide1.png'), Buffer.from(shot1.data, 'base64'));
  console.log('Saved realistic_iphone_desktop_slide1.png');

  // INTERACTION 1: Click Next Arrow
  console.log('Testing Next Arrow click...');
  const nextClick = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const nextBtn = document.querySelector('.sbx-phone__arrow--next');
        if (!nextBtn) return { error: 'nextBtn not found' };
        nextBtn.click();
        return { clicked: true };
      })()
    `,
    returnByValue: true
  });
  console.log('Next arrow click result:', nextClick.result.value);
  await new Promise(r => setTimeout(r, 600));

  const afterNext = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const counter = document.querySelector('.sbx-phone__counter');
        const dots = Array.from(document.querySelectorAll('.sbx-phone__dot'));
        const activeIndex = dots.findIndex(d => d.classList.contains('is-active'));
        return { counterText: counter ? counter.textContent : null, activeIndex };
      })()
    `,
    returnByValue: true
  });
  console.log('After Next click state:', afterNext.result.value);

  // INTERACTION 2: Mouse Drag to Swipe
  console.log('Testing Mouse Drag swipe left...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const media = document.querySelector('.sbx-phone__media');
        const rect = media.getBoundingClientRect();
        const startX = rect.left + rect.width * 0.75;
        const midX = rect.left + rect.width * 0.25;
        const y = rect.top + rect.height * 0.5;

        media.dispatchEvent(new MouseEvent('mousedown', { clientX: startX, clientY: y, bubbles: true }));
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: midX, clientY: y, bubbles: true }));
        window.dispatchEvent(new MouseEvent('mouseup', { clientX: midX, clientY: y, bubbles: true }));
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const afterDrag = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const counter = document.querySelector('.sbx-phone__counter');
        const dots = Array.from(document.querySelectorAll('.sbx-phone__dot'));
        const activeIndex = dots.findIndex(d => d.classList.contains('is-active'));
        return { counterText: counter ? counter.textContent : null, activeIndex };
      })()
    `,
    returnByValue: true
  });
  console.log('After Mouse Drag state:', afterDrag.result.value);

  // INTERACTION 3: Click Dot 5 (index 4)
  console.log('Testing Dot navigation (clicking dot 5)...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const dots = document.querySelectorAll('.sbx-phone__dot');
        if (dots[4]) dots[4].click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));

  // INTERACTION 4: Like the post
  console.log('Testing Like button toggle...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const likeBtn = document.querySelector('.sbx-phone__action-btn--like');
        if (likeBtn) likeBtn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const afterLike = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const counter = document.querySelector('.sbx-phone__counter');
        const likes = document.querySelector('.sbx-phone__likes');
        const dots = Array.from(document.querySelectorAll('.sbx-phone__dot'));
        const activeIndex = dots.findIndex(d => d.classList.contains('is-active'));
        const isLiked = document.querySelector('.sbx-phone__action-btn--like.is-liked') !== null;
        return { counterText: counter ? counter.textContent : null, activeIndex, likesText: likes ? likes.textContent : null, isLiked };
      })()
    `,
    returnByValue: true
  });
  console.log('After Dot jump and Like state:', afterLike.result.value);

  // Take screenshot of Slide 5 (liked)
  let shot5 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'realistic_iphone_desktop_slide5.png'), Buffer.from(shot5.data, 'base64'));
  console.log('Saved realistic_iphone_desktop_slide5.png');

  // MOBILE VIEWPORT TEST (390x844)
  console.log('Testing Mobile Viewport (390x844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
    hasTouch: true
  });

  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('.sbx-baddies');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  const mobileCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const frame = document.querySelector('.sbx-phone__frame');
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        return {
          frameWidth: frame ? frame.offsetWidth : null,
          frameHeight: frame ? frame.offsetHeight : null,
          docScrollWidth: document.documentElement.scrollWidth,
          winInnerWidth: window.innerWidth,
          hasHorizontalOverflow: overflow
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Mobile Measurements:', JSON.stringify(mobileCheck.result.value, null, 2));

  // Touch Swipe on mobile
  console.log('Testing Touch swipe on mobile...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const media = document.querySelector('.sbx-phone__media');
        const rect = media.getBoundingClientRect();
        const startX = rect.left + rect.width * 0.8;
        const midX = rect.left + rect.width * 0.2;
        const y = rect.top + rect.height * 0.5;

        media.dispatchEvent(new TouchEvent('touchstart', {
          touches: [new Touch({ identifier: 1, target: media, clientX: startX, clientY: y })],
          bubbles: true
        }));
        media.dispatchEvent(new TouchEvent('touchmove', {
          touches: [new Touch({ identifier: 1, target: media, clientX: midX, clientY: y })],
          bubbles: true
        }));
        media.dispatchEvent(new TouchEvent('touchend', {
          changedTouches: [new Touch({ identifier: 1, target: media, clientX: midX, clientY: y })],
          bubbles: true
        }));
      })()
    `
  });
  await new Promise(r => setTimeout(r, 700));

  const afterTouch = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const counter = document.querySelector('.sbx-phone__counter');
        const dots = Array.from(document.querySelectorAll('.sbx-phone__dot'));
        const activeIndex = dots.findIndex(d => d.classList.contains('is-active'));
        return { counterText: counter ? counter.textContent : null, activeIndex };
      })()
    `,
    returnByValue: true
  });
  console.log('After Touch swipe state:', afterTouch.result.value);

  let shotMob = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'realistic_iphone_mobile.png'), Buffer.from(shotMob.data, 'base64'));
  console.log('Saved realistic_iphone_mobile.png');

  ws.close();
  chrome.kill();
  console.log('ALL TESTS AND SCREENSHOTS COMPLETED SUCCESSFULLY!');
}

main().catch(console.error);
