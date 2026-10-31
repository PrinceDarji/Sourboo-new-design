const http = require('http');
const fs = require('fs');
const path = require('path');

function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log('========================================');
  console.log('SOURBOO AUTOMATED TEST SUITE EXECUTION');
  console.log('========================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. PAGE ROUTES VERIFICATION
  const routes = [
    { url: '/', title: 'Sourboo Way' },
    { url: '/collections/all', title: 'All Sour, Zero Chill' },
    { url: '/products/sideeyesour', title: 'Side Eye Sour' },
    { url: '/products/tamarintease', title: 'Tamarin' },
    { url: '/pages/about', title: 'Hi I am Sakshi' },
    { url: '/pages/contact', title: 'Contact' },
    { url: '/pages/join-us', title: 'Join Us' },
    { url: '/pages/shipping-policy', title: 'Shipping Policy' },
    { url: '/pages/refund-policy', title: 'Refund Policy' },
    { url: '/pages/privacy-policy', title: 'Privacy Policy' },
    { url: '/pages/terms-and-conditions', title: 'Terms & Conditions' }
  ];

  for (const r of routes) {
    const res = await request('http://localhost:3456' + r.url);
    assert(res.statusCode === 200, `Route ${r.url} returned HTTP 200`);
    assert(res.body.includes('<h1') || res.body.includes('sb-hero-h1'), `Route ${r.url} contains proper H1 heading`);
  }

  // 2. CORE ASSET DELIVERY
  const assets = [
    'coolvetica.ttf',
    'rascal.ttf',
    'Schoolbell-Regular.ttf',
    'sourboo.css',
    'sourboo.js',
    'navbar.webp',
    'hero-placeholder.webp',
    'sideeyepackage.png',
    'tamarinpackage.png',
    'postcrysnack.webp',
    'latenightmunchies.webp',
    'girldinner.webp',
    'deskcravings.webp',
    'freshingredients.svg',
    'review-phone.svg',
    'cartlogo.svg',
    'button1.svg'
  ];

  for (const a of assets) {
    const res = await request('http://localhost:3456/' + a);
    assert(res.statusCode === 200, `Asset ${a} delivered successfully with HTTP 200`);
  }

  // 3. PERSONALITY POPUP & LEAD CAPTURE
  const homeRes = await request('http://localhost:3456/');
  assert(homeRes.body.includes('LandingPersonalityPopup'), 'Personality popup modal markup present');
  assert(homeRes.body.includes('Sour &amp; Savage') || homeRes.body.includes('Sour & Savage'), 'Popup Option 1 (Sour & Savage) present');
  assert(homeRes.body.includes('Sweet but Psycho'), 'Popup Option 2 (Sweet but Psycho) present');
  assert(homeRes.body.includes('Spicy Drama'), 'Popup Option 3 (Spicy Drama) present');
  assert(homeRes.body.includes('Lowkey Tangy'), 'Popup Option 4 (Lowkey Tangy) present');
  assert(homeRes.body.includes('SOURBABE05'), 'Discount code SOURBABE05 present');

  // Test Lead API POST
  const leadPostRes = await request('http://localhost:3456/api/popup-leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'tester@sourboo.com',
      phone: '+919876543210',
      selectedOptionLabel: 'Sour & Savage'
    })
  });
  assert(leadPostRes.statusCode === 200, 'Popup lead submission endpoint /api/popup-leads accepts POST and returns HTTP 200');

  // 4. FLAVOUR MATCHER TEST
  const shopRes = await request('http://localhost:3456/collections/all');
  assert(shopRes.body.includes('ShopFlavorMatcher'), 'Flavour Matcher component present on Shop page');
  assert(shopRes.body.includes('player1.svg'), 'Player 1 character present in Flavour Matcher');
  assert(shopRes.body.includes('player2.svg'), 'Player 2 character present in Flavour Matcher');
  assert(shopRes.body.includes('SIDE EYE SOUR'), 'Player 1 locked selection recommendation verified');
  assert(shopRes.body.includes('TAMARIN’ TEASE') || shopRes.body.includes('TAMARIN'), 'Player 2 locked selection recommendation verified');

  // 5. PRODUCT DETAIL PAGE (PDP) TABS TEST
  const pdpRes = await request('http://localhost:3456/products/sideeyesour');
  assert(pdpRes.body.includes('In the jar'), 'Tab 1 "In the jar" present on PDP');
  assert(pdpRes.body.includes('On the tongue'), 'Tab 2 "On the tongue" present on PDP');
  assert(pdpRes.body.includes('After opening'), 'Tab 3 "After opening" present on PDP');
  assert(pdpRes.body.includes('Dispatched within 2-4 working days'), 'Dispatch SLA note present on PDP');
  assert(pdpRes.body.includes('Pre-orders only'), 'Pre-orders advisory present on PDP');

  // 6. CART DRAWER COMPONENT TEST
  assert(homeRes.body.includes('CartDrawer'), 'Cart drawer markup present in main template layout');
  assert(homeRes.body.includes('CartSubtotal'), 'Cart subtotal container present');
  assert(homeRes.body.includes('CartDiscountInput'), 'Cart discount code field present');
  assert(homeRes.body.includes('/checkout'), 'Shopify checkout redirect button present');

  console.log(`\n========================================`);
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================`);
}

runTests().catch(console.error);
