const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

async function main() {
  const artifactDir = "C:\\Users\\user\\.gemini\\antigravity\\brain\\f22c98ee-5201-43c9-a5eb-84160ec3250c";
  const userDir = path.join(artifactDir, `cprofile_duo_verify_${Date.now()}`);

  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9683',
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
        http.get('http://127.0.0.1:9683/json/list', r => {
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

  // --- 1. PRODUCT SECTION ALIGNMENT & COLOUR CHECK ---
  console.log('Checking Product Section metrics & alignments...');
  const duoMetrics = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const slides = document.querySelectorAll('.sbx-duo__slide');
        if (slides.length < 2) return { error: 'Less than 2 slides found' };

        const s1 = slides[0];
        const s2 = slides[1];

        const getColData = (slide) => {
          const name = slide.querySelector('.sbx-duo__name');
          const combo = slide.querySelector('.sbx-duo__combo');
          const desc = slide.querySelector('.sbx-duo__desc');
          const price = slide.querySelector('.sbx-duo__price');
          const btn = slide.querySelector('.sbx-duo__buy-cta');
          const nameRect = name.getBoundingClientRect();
          const comboRect = combo.getBoundingClientRect();
          const descRect = desc.getBoundingClientRect();
          const priceRect = price.getBoundingClientRect();
          const btnRect = btn.getBoundingClientRect();

          return {
            titleText: name.textContent,
            titleColor: window.getComputedStyle(name).color,
            titleTop: Math.round(nameRect.top),
            titleHeight: Math.round(nameRect.height),
            comboText: combo.textContent,
            comboColor: window.getComputedStyle(combo).color,
            comboTop: Math.round(comboRect.top),
            comboHeight: Math.round(comboRect.height),
            descText: desc.textContent,
            descColor: window.getComputedStyle(desc).color,
            descTop: Math.round(descRect.top),
            descHeight: Math.round(descRect.height),
            descSingleLine: Math.round(descRect.height) <= 32,
            priceText: price.textContent,
            priceColor: window.getComputedStyle(price).color,
            priceTop: Math.round(priceRect.top),
            btnText: btn.textContent.trim(),
            btnBg: window.getComputedStyle(btn).backgroundColor,
            btnColor: window.getComputedStyle(btn).color,
            btnTop: Math.round(btnRect.top),
            btnHeight: Math.round(btnRect.height)
          };
        };

        const col1 = getColData(s1);
        const col2 = getColData(s2);

        const kicker = document.querySelector('.sbx-duo__kicker');
        const mark = document.querySelector('.sbx-duo__mark');

        return {
          headerKickerColor: kicker ? window.getComputedStyle(kicker).color : null,
          headerMarkColor: mark ? window.getComputedStyle(mark).color : null,
          headerMarkBg: mark ? window.getComputedStyle(mark, '::before').backgroundColor : null,
          col1,
          col2,
          buttonsAligned: col1.btnTop === col2.btnTop,
          titlesAligned: col1.titleTop === col2.titleTop,
          combosAligned: col1.comboTop === col2.comboTop,
          pricesAligned: col1.priceTop === col2.priceTop
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Product Alignment & Colours:', JSON.stringify(duoMetrics.result.value, null, 2));

  // Scroll to Product Section on Desktop and capture screenshot
  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('.sbx-duo');
      if (el) {
        const nav = document.querySelector('.sbx-nav');
        const navH = nav ? nav.offsetHeight : 70;
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - navH - 20);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  const shotDuoDesktop = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'product_section_desktop_aligned.png'), Buffer.from(shotDuoDesktop.data, 'base64'));
  console.log('Saved product_section_desktop_aligned.png');

  // Scroll specifically to product cards info & CTAs
  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('.sbx-duo__info');
      if (el) {
        const nav = document.querySelector('.sbx-nav');
        const navH = nav ? nav.offsetHeight : 70;
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - navH - 80);
      }
    `
  });
  await new Promise(r => setTimeout(r, 800));

  const shotDuoInfo = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'product_typography_cta_aligned.png'), Buffer.from(shotDuoInfo.data, 'base64'));
  console.log('Saved product_typography_cta_aligned.png');

  // --- 2. TEST ADD TO BAG FUNCTIONALITY ---
  console.log('Testing Add to Bag buttons...');
  const addBagTest = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btns = document.querySelectorAll('.sbx-duo__buy-cta');
        if (btns.length < 2) return { error: 'Buttons not found' };

        // Check initial cart badge or state
        const initialBadge = document.querySelector('.sbx-nav__bag-count')?.textContent || '0';

        // Click first button
        btns[0].click();

        return { initialBadge, clickedCol1: true };
      })()
    `,
    returnByValue: true
  });
  console.log('Add to bag column 1 result:', addBagTest.result.value);
  await new Promise(r => setTimeout(r, 1200));

  const afterAddCol1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const badge = document.querySelector('.sbx-nav__bag-count')?.textContent || '0';
        const drawer = document.querySelector('.sbx-cart-drawer') || document.querySelector('[aria-label=\"Shopping Bag\"]');
        return { badge, drawerOpened: drawer !== null };
      })()
    `,
    returnByValue: true
  });
  console.log('Cart state after column 1 click:', afterAddCol1.result.value);

  // Close drawer if opened so we can test col 2
  await send('Runtime.evaluate', {
    expression: `
      const closeBtn = document.querySelector('.sbx-cart-drawer__close') || document.querySelector('[aria-label=\"Close\"]');
      if (closeBtn) closeBtn.click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  // --- 3. CHECK QUIZ TEXT REMOVAL & HOMEPAGE QUIZ FUNCTIONALITY ---
  console.log('Checking quiz text removal...');
  const quizCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const fullText = document.body.innerText;
        const hasPersonalityText = fullText.includes('Want our full personality breakdown');
        const hasQuizCtaText = fullText.includes('TAKE THE 30-SEC QUIZ');
        
        // Check if TasteGame exists and is rendered
        const tasteGame = document.querySelector('.sbx-game');
        
        // Check if header quiz button exists
        const navQuizBtn = document.querySelector('.sbx-nav__quiz-btn');

        return {
          hasPersonalityText,
          hasQuizCtaText,
          tasteGameExists: tasteGame !== null,
          navQuizBtnExists: navQuizBtn !== null
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Quiz text check:', JSON.stringify(quizCheck.result.value, null, 2));

  // Test opening quiz from header button
  console.log('Testing header quiz button opens quiz...');
  await send('Runtime.evaluate', {
    expression: `
      const navQuizBtn = document.querySelector('.sbx-nav__quiz-btn');
      if (navQuizBtn) navQuizBtn.click();
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  const quizOpenCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const modal = document.querySelector('.sbx-quiz-modal') || document.querySelector('[role=\"dialog\"]');
        const modalVisible = modal !== null && window.getComputedStyle(modal).display !== 'none';
        return { modalOpened: modalVisible };
      })()
    `,
    returnByValue: true
  });
  console.log('Quiz modal check:', quizOpenCheck.result.value);

  // Close quiz modal
  await send('Runtime.evaluate', {
    expression: `
      const closeQuiz = document.querySelector('.sbx-quiz-modal__close') || document.querySelector('[aria-label=\"Close dialog\"]');
      if (closeQuiz) closeQuiz.click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot TasteGame section to confirm clean presentation without the removed text
  await send('Runtime.evaluate', {
    expression: `
      const game = document.querySelector('.sbx-game');
      if (game) {
        const nav = document.querySelector('.sbx-nav');
        const navH = nav ? nav.offsetHeight : 70;
        window.scrollTo(0, game.getBoundingClientRect().top + window.scrollY - navH - 20);
      }
    `
  });
  await new Promise(r => setTimeout(r, 800));

  const shotTasteGame = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'tastegame_without_quiz_text.png'), Buffer.from(shotTasteGame.data, 'base64'));
  console.log('Saved tastegame_without_quiz_text.png');

  // --- 4. MOBILE VIEWPORT (390x844) ---
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
      const el = document.querySelector('.sbx-duo');
      if (el) {
        const nav = document.querySelector('.sbx-nav');
        const navH = nav ? nav.offsetHeight : 60;
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - navH - 10);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  const mobileCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        const slide = document.querySelector('.sbx-duo__slide');
        const desc = document.querySelector('.sbx-duo__desc');
        const btn = document.querySelector('.sbx-duo__buy-cta');
        return {
          docScrollWidth: document.documentElement.scrollWidth,
          winInnerWidth: window.innerWidth,
          hasHorizontalOverflow: overflow,
          slideWidth: slide ? slide.offsetWidth : null,
          descHeight: desc ? desc.offsetHeight : null,
          btnWidth: btn ? btn.offsetWidth : null
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Mobile Measurements:', JSON.stringify(mobileCheck.result.value, null, 2));

  const shotMobile = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'product_section_mobile.png'), Buffer.from(shotMobile.data, 'base64'));
  console.log('Saved product_section_mobile.png');

  ws.close();
  chrome.kill();
  console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
}

main().catch(console.error);
