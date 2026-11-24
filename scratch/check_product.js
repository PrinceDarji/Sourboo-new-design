const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });
  await page.goto('http://localhost:3000/product', { waitUntil: 'networkidle2' });
  
  const el = await page.$('#shop-taste-game');
  if (el) {
    await el.screenshot({ path: 'scratch/current_shop_flavor_matcher.png' });
    console.log('Took screenshot of #shop-taste-game');
  } else {
    console.log('#shop-taste-game not found!');
  }
  
  // click player 1 button
  const p1 = await page.$('.sbx-game__tag--p1');
  if (p1) {
    await p1.click();
    await new Promise(r => setTimeout(r, 400));
    const el2 = await page.$('#shop-taste-game');
    if (el2) await el2.screenshot({ path: 'scratch/current_shop_flavor_matcher_p1.png' });
    console.log('Took screenshot of p1');
  }

  // click player 2 button
  const p2 = await page.$('.sbx-game__tag--p2');
  if (p2) {
    await p2.click();
    await new Promise(r => setTimeout(r, 400));
    const el3 = await page.$('#shop-taste-game');
    if (el3) await el3.screenshot({ path: 'scratch/current_shop_flavor_matcher_p2.png' });
    console.log('Took screenshot of p2');
  }

  await browser.close();
})();
