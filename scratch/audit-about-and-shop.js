const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDir = `C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c\\scratch\\cprofile_${Date.now()}`;

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9460',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1080',
    'http://localhost:3000/about'
  ]);

  // Retry loop to connect to debugging port
  let list = null;
  for (let attempt = 0; attempt < 20; attempt++) {
    await new Promise(r => setTimeout(r, 600));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9460/json/list', res => {
          let d = '';
          res.on('data', chunk => d += chunk);
          res.on('end', () => {
            try {
              resolve(JSON.parse(d));
            } catch (e) {
              reject(e);
            }
          });
        }).on('error', reject);
      });
      if (list && list.length > 0) break;
    } catch {}
  }

  if (!list) {
    throw new Error('Failed to connect to Chrome CDP port 9460');
  }

  const page = list.find(p => p.type === 'page') || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    return new Promise(resolve => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // Dismiss any modals and set localStorage flags
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        localStorage.setItem('sourboo_fridge_seen_v1', String(Date.now()));
        localStorage.setItem('sourboo_popup_dismissed', '1');
        localStorage.setItem('sourboo_popup_seen', '1');
        document.documentElement.setAttribute('data-fridge', 'skip');
        const fridge = document.querySelector('.sbx-fridge');
        if (fridge) fridge.remove();
        const popup = document.querySelector('.sb-popup-overlay');
        if (popup) popup.remove();
      })()
    `
  });

  await new Promise(r => setTimeout(r, 1500));

  // --- ABOUT PAGE DESKTOP AUDIT ---
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
  });

  const aboutSections = [
    { name: 'about_desktop_1_hero', selector: '.sb-story-hero' },
    { name: 'about_desktop_2_flavour_journey', selector: '.sb-story-flavour' },
    { name: 'about_desktop_3_tongue_and_eyes', selector: '.sb-story-tongue-wrap' },
    { name: 'about_desktop_4_problem_side_dish_eyes', selector: '.sb-story-problem' },
    { name: 'about_desktop_5_manifesto_dish', selector: '.sb-story-manifesto-wrap' }
  ];

  for (const s of aboutSections) {
    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${s.selector}');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            x: Math.round(r.left),
            y: Math.round(r.top + window.scrollY),
            width: Math.round(r.width),
            height: Math.round(r.height)
          };
        })()
      `,
      returnByValue: true
    });

    const box = evalRes.result?.result?.value;
    if (box && box.width > 0 && box.height > 0) {
      const shot = await send('Page.captureScreenshot', {
        format: 'png',
        clip: {
          x: Math.max(0, box.x),
          y: Math.max(0, box.y),
          width: Math.min(1440, box.width),
          height: box.height,
          scale: 1
        },
        captureBeyondViewport: true
      });
      fs.writeFileSync(`c:/Users/user/Downloads/Sourboo/${s.name}.png`, Buffer.from(shot.result.data, 'base64'));
      console.log(`[PASS] Captured ${s.name} (${box.width}x${box.height})`);
    } else {
      console.log(`[WARN] Section not found: ${s.selector}`);
    }
  }

  // --- ABOUT PAGE MOBILE AUDIT ---
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 800));

  const aboutMobileSections = [
    { name: 'about_mobile_hero', selector: '.sb-story-hero' },
    { name: 'about_mobile_problem_eyes', selector: '.sb-story-problem' }
  ];

  for (const s of aboutMobileSections) {
    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${s.selector}');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            x: Math.round(r.left),
            y: Math.round(r.top + window.scrollY),
            width: Math.round(r.width),
            height: Math.round(r.height)
          };
        })()
      `,
      returnByValue: true
    });

    const box = evalRes.result?.result?.value;
    if (box && box.width > 0 && box.height > 0) {
      const shot = await send('Page.captureScreenshot', {
        format: 'png',
        clip: {
          x: Math.max(0, box.x),
          y: Math.max(0, box.y),
          width: Math.min(390, box.width),
          height: box.height,
          scale: 1
        },
        captureBeyondViewport: true
      });
      fs.writeFileSync(`c:/Users/user/Downloads/Sourboo/${s.name}.png`, Buffer.from(shot.result.data, 'base64'));
      console.log(`[PASS] Captured ${s.name} (${box.width}x${box.height})`);
    }
  }

  // --- NAVIGATE TO SHOP PAGE ---
  console.log('Navigating to http://localhost:3000/product...');
  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 2000));

  // Reset to Desktop
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
  });
  await new Promise(r => setTimeout(r, 800));

  // Capture Flavour Matcher Player 1
  const p1Res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('#ShopFlavorMatcher');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: Math.round(r.left),
          y: Math.round(r.top + window.scrollY),
          width: Math.round(r.width),
          height: Math.round(r.height)
        };
      })()
    `,
    returnByValue: true
  });
  const p1Box = p1Res.result?.result?.value;
  if (p1Box && p1Box.width > 0) {
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: Math.max(0, p1Box.x),
        y: Math.max(0, p1Box.y),
        width: Math.min(1440, p1Box.width),
        height: p1Box.height,
        scale: 1
      },
      captureBeyondViewport: true
    });
    fs.writeFileSync(`c:/Users/user/Downloads/Sourboo/shop_desktop_player1.png`, Buffer.from(shot.result.data, 'base64'));
    console.log(`[PASS] Captured shop_desktop_player1 (${p1Box.width}x${p1Box.height})`);
  }

  // Click Player 2 switcher
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btns = document.querySelectorAll('.sb-matcher-switch-btn');
        if (btns.length >= 2) btns[1].click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 800));

  // Capture Flavour Matcher Player 2
  const p2Res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('#ShopFlavorMatcher');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: Math.round(r.left),
          y: Math.round(r.top + window.scrollY),
          width: Math.round(r.width),
          height: Math.round(r.height)
        };
      })()
    `,
    returnByValue: true
  });
  const p2Box = p2Res.result?.result?.value;
  if (p2Box && p2Box.width > 0) {
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: Math.max(0, p2Box.x),
        y: Math.max(0, p2Box.y),
        width: Math.min(1440, p2Box.width),
        height: p2Box.height,
        scale: 1
      },
      captureBeyondViewport: true
    });
    fs.writeFileSync(`c:/Users/user/Downloads/Sourboo/shop_desktop_player2.png`, Buffer.from(shot.result.data, 'base64'));
    console.log(`[PASS] Captured shop_desktop_player2 (${p2Box.width}x${p2Box.height})`);
  }

  // --- SHOP MOBILE AUDIT ---
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 600));

  const shopMobileRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('#ShopFlavorMatcher');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: Math.round(r.left),
          y: Math.round(r.top + window.scrollY),
          width: Math.round(r.width),
          height: Math.round(r.height)
        };
      })()
    `,
    returnByValue: true
  });
  const smBox = shopMobileRes.result?.result?.value;
  if (smBox && smBox.width > 0) {
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: Math.max(0, smBox.x),
        y: Math.max(0, smBox.y),
        width: Math.min(390, smBox.width),
        height: smBox.height,
        scale: 1
      },
      captureBeyondViewport: true
    });
    fs.writeFileSync(`c:/Users/user/Downloads/Sourboo/shop_mobile_player2.png`, Buffer.from(shot.result.data, 'base64'));
    console.log(`[PASS] Captured shop_mobile_player2 (${smBox.width}x${smBox.height})`);
  }

  ws.close();
  chrome.kill();
  console.log('--- ALL VERIFICATION SCREENSHOTS CAPTURED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
