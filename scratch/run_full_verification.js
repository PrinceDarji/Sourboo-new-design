const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_final_verify_${Date.now()}`);

  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9855',
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,1100',
    'about:blank'
  ]);

  let list = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      list = await new Promise((res, rej) => {
        http.get('http://127.0.0.1:9855/json/list', r => {
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
  await send('DOM.enable');
  await send('Runtime.enable');

  // Prevent popup by setting localStorage
  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 1000));
  await send('Runtime.evaluate', {
    expression: `localStorage.setItem('sourboo_quiz_dismissed', 'true');`
  });

  // Navigate to /product
  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 2500));

  // 1. Initial State of Flavor Matcher
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('shop-taste-game');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/verify_shop_matcher_init.png', Buffer.from(shot.data, 'base64'));
  fs.writeFileSync(path.join(artifactDir, 'shop_game_initial_restored.png'), Buffer.from(shot.data, 'base64'));

  // 2. Click Player 1
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.sbx-game__tag--p1') || document.querySelector('.sbx-game__side--p1 .sbx-game__pick');
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/verify_shop_matcher_p1.png', Buffer.from(shot.data, 'base64'));
  fs.writeFileSync(path.join(artifactDir, 'shop_game_player1_restored.png'), Buffer.from(shot.data, 'base64'));

  // 3. Click Player 2
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.sbx-game__tag--p2') || document.querySelector('.sbx-game__side--p2 .sbx-game__pick');
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/verify_shop_matcher_p2.png', Buffer.from(shot.data, 'base64'));
  fs.writeFileSync(path.join(artifactDir, 'shop_game_player2_restored.png'), Buffer.from(shot.data, 'base64'));

  // 4. Test Add to Bag button click in co-op section
  const coopClickResult = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.sbx-game__coop-btn');
      if (!btn) return { found: false };
      const beforeCart = document.querySelector('[data-testid="cart-count"], .sbx-cart-badge, .sbx-nav-cart')?.textContent || '';
      btn.click();
      return { found: true, text: btn.textContent.trim(), beforeCart };
    })()`,
    returnByValue: true
  });
  console.log('Co-op Button click result:', coopClickResult.result.value);

  // 5. Check Homepage Sour Sampler without popup interference
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2000));
  await send('Runtime.evaluate', {
    expression: `(() => {
      // close any popup if open
      const closeBtn = document.querySelector('.sbx-popup__close, [aria-label*="Close"], button[aria-label*="close"]');
      if (closeBtn) closeBtn.click();
      const el = document.querySelector('.sbx-duo__both');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));

  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/verify_home_sour_sampler.png', Buffer.from(shot.data, 'base64'));
  fs.writeFileSync(path.join(artifactDir, 'home_sour_sampler_prominent.png'), Buffer.from(shot.data, 'base64'));

  // 6. Mobile viewport test (390 x 844)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://localhost:3000/product' });
  await new Promise(r => setTimeout(r, 2000));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('shop-taste-game');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/verify_shop_mobile.png', Buffer.from(shot.data, 'base64'));
  fs.writeFileSync(path.join(artifactDir, 'shop_game_mobile_restored.png'), Buffer.from(shot.data, 'base64'));

  console.log('Verification completed successfully!');
  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
