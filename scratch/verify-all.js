const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDir = `C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c\\scratch\\cprofile_verify_${Date.now()}`;

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9505',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1080',
    'about:blank'
  ]);

  let list = null;
  for (let attempt = 0; attempt < 20; attempt++) {
    await new Promise(r => setTimeout(r, 600));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9505/json/list', res => {
          let d = '';
          res.on('data', chunk => d += chunk);
          res.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
      });
      if (list && list.length > 0) break;
    } catch {}
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

  const disablePopupsExpr = `
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
  `;

  // ==========================================
  // PART 1: SHOP PAGE VERIFICATION (DESKTOP)
  // ==========================================
  console.log('Navigating to Shop page...');
  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 2000));
  await send('Runtime.evaluate', { expression: disablePopupsExpr });

  // 1A. Initial Unselected State
  const gameBoxRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('#shop-taste-game');
        if (!el) return null;
        el.scrollIntoView({ block: 'center' });
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.left), y: Math.round(r.top + window.scrollY), width: Math.round(r.width), height: Math.round(r.height) };
      })()
    `,
    returnByValue: true
  });
  await new Promise(r => setTimeout(r, 600));

  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('c:/Users/user/Downloads/Sourboo/verify_shop_game_initial.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved verify_shop_game_initial.png');

  // 1B. Select Player 1
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = document.querySelector('.sbx-game__side--p1 .sbx-game__pick') || document.querySelector('.sbx-game__tag--p1');
        if (btn) btn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 800));

  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('c:/Users/user/Downloads/Sourboo/verify_shop_game_player1.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved verify_shop_game_player1.png');

  // 1C. Select Player 2
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = document.querySelector('.sbx-game__side--p2 .sbx-game__pick') || document.querySelector('.sbx-game__tag--p2');
        if (btn) btn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 800));

  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('c:/Users/user/Downloads/Sourboo/verify_shop_game_player2.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved verify_shop_game_player2.png');

  // 1D. Shop Page Mobile View (390x844)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 800));

  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('#shop-taste-game');
        if (el) el.scrollIntoView({ block: 'start' });
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));

  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('c:/Users/user/Downloads/Sourboo/verify_shop_game_mobile.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved verify_shop_game_mobile.png');

  // Reset to Desktop for About Page
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
  });

  // ==========================================
  // PART 2: ABOUT PAGE VERIFICATION
  // ==========================================
  console.log('Navigating to About page...');
  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 2000));
  await send('Runtime.evaluate', { expression: disablePopupsExpr });

  // 2A. About Hero
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('c:/Users/user/Downloads/Sourboo/verify_about_1_hero.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved verify_about_1_hero.png');

  // 2B. About Flavour Obsession & Desi Palate Bridge
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('.sb-story-flavour');
        if (el) el.scrollIntoView({ block: 'start' });
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('c:/Users/user/Downloads/Sourboo/verify_about_2_flavour_and_bridge.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved verify_about_2_flavour_and_bridge.png');

  // 2C. About Manifesto & Uncropped Editorial Images
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('.sb-story-manifesto-wrap');
        if (el) el.scrollIntoView({ block: 'start' });
      })()
    `
  });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('c:/Users/user/Downloads/Sourboo/verify_about_3_manifesto_editorial.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved verify_about_3_manifesto_editorial.png');

  // 2D. About Mobile View (390x844)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 800));

  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('.sb-story-manifesto-wrap');
        if (el) el.scrollIntoView({ block: 'start' });
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('c:/Users/user/Downloads/Sourboo/verify_about_mobile_manifesto.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Saved verify_about_mobile_manifesto.png');

  ws.close();
  chrome.kill();
  console.log('All verification captures completed successfully!');
}

main().catch(console.error);
