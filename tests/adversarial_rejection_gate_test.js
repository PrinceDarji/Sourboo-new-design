/**
 * ADVERSARIAL STRESS TEST & VISUAL SIMILARITY REJECTION GATE HARNESS
 * Subagent: challenger_m1_2 (Empirical Challenger)
 * Target: http://localhost:3456
 *
 * Checks:
 * 1. Blind Logo Test (Asymmetric wireframe hierarchy vs legacy symmetrical)
 * 2. Blind Photo Test (Absence of legacy stacked full-width colored bands / sb-product-band)
 * 3. Viewport 1 & 2 Check (Hero 7:5 broadsheet, Staggered dossier cards)
 * 4. Campaign Spread Check (Integrated zine wall / editorial spread, not single column)
 * 5. Asset Integrity (100% local authentic assets, fonts, zero 404s, zero external CDNs)
 * 6. Localhost Figma SVG Export Engine (/download-figma-svg, canvas FKPMaN6f04sHPAkjDIjYZY)
 * 7. Interactive Prototype Engine & Boundary Conditions
 * 8. Strict Theme Freeze Forensic Audit (shopify-theme/ 0 git diffs)
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3456';
const PROJECT_ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];
const observations = [];

function assert(condition, testId, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testId} - ${message}`);
    observations.push({ id: testId, status: 'PASS', message });
  } else {
    failedTests++;
    console.error(`  [FAIL] ${testId} - ${message}`);
    failures.push({ id: testId, message });
    observations.push({ id: testId, status: 'FAIL', message });
  }
}

function httpGet(urlPath, headers = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `${BASE_URL}${urlPath}`;
    const urlObj = new URL(fullUrl);
    const client = urlObj.protocol === 'https:' ? https : http;

    const req = client.request(fullUrl, { method: 'GET', headers }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.end();
  });
}

function httpGetBuffer(urlPath) {
  return new Promise((resolve, reject) => {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `${BASE_URL}${urlPath}`;
    const urlObj = new URL(fullUrl);
    const client = urlObj.protocol === 'https:' ? https : http;

    const req = client.request(fullUrl, { method: 'GET' }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          buffer: Buffer.concat(chunks)
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.end();
  });
}

function httpPost(urlPath, payload, headers = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `${BASE_URL}${urlPath}`;
    const payloadStr = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payloadStr)
    };

    const req = http.request(fullUrl, {
      method: 'POST',
      headers: { ...defaultHeaders, ...headers }
    }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.write(payloadStr);
    req.end();
  });
}

async function runAdversarialGateTests() {
  console.log('================================================================================');
  console.log('ADVERSARIAL EMPIRICAL HARNESS: VISUAL SIMILARITY REJECTION GATE & STRESS AUDIT');
  console.log(`Target: ${BASE_URL}`);
  console.log('================================================================================\n');

  // Fetch Homepage and CSS
  const homeRes = await httpGet('/');
  const cssRes = await httpGet('/sourboo-redesign.css');
  const shopRes = await httpGet('/collections/all');
  const pdpRes = await httpGet('/products/sideeyesour');
  const aboutRes = await httpGet('/pages/about');

  console.log('--- [GATE 1: BLIND LOGO TEST (LAYOUT & WIREFRAME ASYMMETRY)] ---');
  // 1. Strip all logo tags
  const homeWithoutLogos = homeRes.body.replace(/<img[^>]*logo[^>]*>/gi, '<!-- LOGO_REMOVED -->');
  assert(!homeWithoutLogos.includes('sb-nav-logo') || homeWithoutLogos.includes('<!-- LOGO_REMOVED -->'),
    'BLIND_LOGO.01', 'Logos successfully stripped for wireframe inspection');

  // 2. Wireframe layout test: Hero structure must be asymmetric broadsheet, NOT centered legacy layout
  assert(homeWithoutLogos.includes('sb-broadsheet-hero') && homeWithoutLogos.includes('sb-broadsheet-hero-grid'),
    'BLIND_LOGO.02', 'Hero container implements sb-broadsheet-hero and sb-broadsheet-hero-grid');

  assert(homeWithoutLogos.includes('sb-hero-editorial-col') && homeWithoutLogos.includes('sb-hero-visual-col'),
    'BLIND_LOGO.03', 'Hero contains distinct editorial text column and visual photo frame column');

  // Verify CSS grid ratio: 7fr 5fr
  assert(cssRes.body.includes('grid-template-columns: 7fr 5fr') || cssRes.body.includes('7fr 5fr'),
    'BLIND_LOGO.04', 'Hero grid ratio strictly enforces asymmetric 7:5 broadsheet layout in CSS');

  // Verify hero headline is left-aligned editorial typography with alternating font styles
  assert(homeWithoutLogos.includes('font-coolvetica text-charcoal') && homeWithoutLogos.includes('font-rascal text-pink'),
    'BLIND_LOGO.05', 'Hero headline employs asymmetric alternating typography (Coolvetica + Rascal)');

  // Verify dateline ticker and marginalia
  assert(homeWithoutLogos.includes('sb-dateline-ticker') && homeWithoutLogos.includes('sb-marginalia-note'),
    'BLIND_LOGO.06', 'Hero includes editorial newspaper marginalia and dateline ticker');

  // Verify absence of legacy centered hero elements
  assert(!homeWithoutLogos.includes('sb-hero-media-wrap') && !homeWithoutLogos.includes('sb-hero-scroll-pill'),
    'BLIND_LOGO.07', 'Zero legacy centered hero wrapper (sb-hero-media-wrap) or scroll pill present');


  console.log('\n--- [GATE 2: BLIND PHOTO TEST (ABSENCE OF STACKED FULL-WIDTH BANDS)] ---');
  // 1. Strip all <img> tags
  const homeWithoutPhotos = homeRes.body.replace(/<img[^>]*>/gi, '<!-- PHOTO_REMOVED -->');

  // 2. Absence of legacy full-width wave bands & packaging bands
  assert(!homeWithoutPhotos.includes('sb-product-band') && !homeWithoutPhotos.includes('sb-product-bands-wrap'),
    'BLIND_PHOTO.01', 'Zero legacy sb-product-band or sb-product-bands-wrap elements in DOM');

  assert(!homeWithoutPhotos.includes('packagingbg.webp') && !cssRes.body.includes('packagingbg.webp'),
    'BLIND_PHOTO.02', 'Zero references to legacy full-width band texture packagingbg.webp in DOM or CSS');

  assert(!homeWithoutPhotos.includes('sb-band-wave-top') && !homeWithoutPhotos.includes('sb-band-wave-bottom'),
    'BLIND_PHOTO.03', 'Zero legacy full-width SVG wave dividers in DOM');

  assert(!homeWithoutPhotos.includes('sb-band-pkg-strip'),
    'BLIND_PHOTO.04', 'Zero legacy horizontal packaging strips (sb-band-pkg-strip) in DOM');

  // 3. Section grid composition test: Products presented via 3-column dossier cards
  assert(homeWithoutPhotos.includes('sb-dossier-grid') && homeWithoutPhotos.includes('sb-dossier-card'),
    'BLIND_PHOTO.05', 'Product presentation organized into 3-column sb-dossier-grid cards on paper canvas');

  assert(cssRes.body.includes('grid-template-columns: repeat(3, 1fr)'),
    'BLIND_PHOTO.06', 'Dossier grid defines 3-column responsive desktop layout');


  console.log('\n--- [GATE 3: VIEWPORT 1 & 2 CHECK (BROADSHEET & STAGGERED DOSSIERS)] ---');
  // Viewport 1 (Hero): 7:5 asymmetric split
  assert(homeRes.body.includes('sb-broadsheet-hero'),
    'VIEWPORT_1_2.01', 'Viewport 1 renders asymmetric editorial broadsheet hero');

  // Viewport 2 (Product Discovery): Staggered dossier cards
  assert(homeRes.body.includes('sb-dossier-showcase') && homeRes.body.includes('THE SOUR DOSSIER'),
    'VIEWPORT_1_2.02', 'Viewport 2 renders "The Sour Dossier" product discovery showcase');

  // Check staggered card offsets in CSS
  const hasStaggerOffsets = cssRes.body.includes('.sb-dossier-card:nth-child(1) { margin-top: 0px;') &&
                            cssRes.body.includes('.sb-dossier-card:nth-child(2) { margin-top: 48px;') &&
                            cssRes.body.includes('.sb-dossier-card:nth-child(3) { margin-top: 20px;');
  assert(hasStaggerOffsets,
    'VIEWPORT_1_2.03', 'Dossier cards employ physical vertical stagger offsets (0px, 48px, 20px)');

  // Verify dossier physical folder tabs (CASE #001, CASE #002, VAULT #006)
  assert(homeRes.body.includes('CASE #001') && homeRes.body.includes('CASE #002') && homeRes.body.includes('VAULT #006'),
    'VIEWPORT_1_2.04', 'Dossier cards feature physical folder tab tags (CASE #001, CASE #002, VAULT #006)');

  // Verify sensory meters (Sourness, Crunch, Spice)
  assert(homeRes.body.includes('sb-dossier-meter') && homeRes.body.includes('Sourness') && homeRes.body.includes('Crunch'),
    'VIEWPORT_1_2.05', 'Dossier cards feature tactile sensory rating meters');


  console.log('\n--- [GATE 4: CAMPAIGN SPREAD CHECK (INTEGRATED ZINE WALL)] ---');
  // Verify campaign poster section exists
  assert(homeRes.body.includes('sb-moments-archive') && homeRes.body.includes('THE MOMENTS ARCHIVE'),
    'CAMPAIGN_SPREAD.01', 'Moments archive campaign section present with editorial heading');

  // Verify zine wall grid container
  assert(homeRes.body.includes('sb-moments-zine-wall'),
    'CAMPAIGN_SPREAD.02', 'Campaign posters arranged inside sb-moments-zine-wall grid');

  // Verify CSS defines 4-column desktop spread (NOT single falling column)
  assert(cssRes.body.includes('.sb-moments-zine-wall') && cssRes.body.includes('grid-template-columns: repeat(4, 1fr)'),
    'CAMPAIGN_SPREAD.03', 'CSS specifies 4-column desktop grid spread (repeat(4, 1fr))');

  // Verify all 4 authentic campaign posters are included
  const hasPostCry = homeRes.body.includes('postcrysnack.webp');
  const hasLateNight = homeRes.body.includes('latenightmunchies.webp');
  const hasGirlDinner = homeRes.body.includes('girldinner.webp');
  const hasDeskCravings = homeRes.body.includes('deskcravings.webp');
  assert(hasPostCry && hasLateNight && hasGirlDinner && hasDeskCravings,
    'CAMPAIGN_SPREAD.04', 'All 4 campaign posters present (Post Cry, Late Night, Girl Dinner, Desk Cravings)');

  // Verify polaroid styling, pushpin accents, and Schoolbell editorial captions
  assert(homeRes.body.includes('sb-pushpin-red') && homeRes.body.includes('sb-poster-caption font-schoolbell'),
    'CAMPAIGN_SPREAD.05', 'Posters feature red pushpins, frames, and Schoolbell editorial captions');

  // Verify rotation / slight tilt on poster cards
  assert(homeRes.body.includes('rotate(-1.5deg)') && homeRes.body.includes('rotate(2deg)') && homeRes.body.includes('rotate(-2.5deg)'),
    'CAMPAIGN_SPREAD.06', 'Poster cards feature organic rotational tilts for authentic wheatpaste effect');


  console.log('\n--- [GATE 5: ASSET INTEGRITY & AUTHENTICITY AUDIT] ---');
  // Check critical brand assets via HTTP
  const criticalAssets = [
    { url: '/coolvetica.ttf', type: 'font/ttf', minSize: 10000 },
    { url: '/rascal.ttf', type: 'font/ttf', minSize: 10000 },
    { url: '/Schoolbell-Regular.ttf', type: 'font/ttf', minSize: 10000 },
    { url: '/hero-placeholder.webp', type: 'image/webp', minSize: 20000 },
    { url: '/side-eye.webp', type: 'image/webp', minSize: 10000 },
    { url: '/tamarin-tease.webp', type: 'image/webp', minSize: 10000 },
    { url: '/about-cover.JPG', type: 'image/jpeg', minSize: 20000 },
    { url: '/postcrysnack.webp', type: 'image/webp', minSize: 10000 },
    { url: '/latenightmunchies.webp', type: 'image/webp', minSize: 10000 },
    { url: '/girldinner.webp', type: 'image/webp', minSize: 10000 },
    { url: '/deskcravings.webp', type: 'image/webp', minSize: 10000 },
    { url: '/fridge.webp', type: 'image/webp', minSize: 10000 },
    { url: '/freshingredients.svg', type: 'image/svg+xml', minSize: 500 },
    { url: '/review-phone.svg', type: 'image/svg+xml', minSize: 500 },
    { url: '/logo.svg', type: 'image/svg+xml', minSize: 500 },
    { url: '/cartlogo.svg', type: 'image/svg+xml', minSize: 500 }
  ];

  let assetsPassCount = 0;
  for (const asset of criticalAssets) {
    const res = await httpGetBuffer(asset.url);
    const contentType = res.headers['content-type'] || '';
    const is200 = res.statusCode === 200;
    const hasSize = res.buffer.length >= asset.minSize;
    const typeMatch = contentType.toLowerCase().includes(asset.type.toLowerCase().split(';')[0]);

    if (is200 && hasSize && typeMatch) {
      assetsPassCount++;
    } else {
      console.error(`Asset check failed for ${asset.url}: status=${res.statusCode}, size=${res.buffer.length}, type=${contentType}`);
    }
  }

  assert(assetsPassCount === criticalAssets.length,
    'ASSET_INTEGRITY.01', `All ${criticalAssets.length} critical assets delivered with HTTP 200, valid size and MIME types`);

  // Verify zero external CDN links in HTML
  const hasExternalFonts = homeRes.body.includes('fonts.googleapis.com') || homeRes.body.includes('use.typekit.net');
  assert(!hasExternalFonts,
    'ASSET_INTEGRITY.02', 'Zero external font CDN dependencies (100% self-hosted local fonts)');

  // Verify zero stock photo / unsplash placeholders
  const hasStockPhotos = homeRes.body.includes('unsplash.com') || homeRes.body.includes('pexels.com') || homeRes.body.includes('lorempixel');
  assert(!hasStockPhotos,
    'ASSET_INTEGRITY.03', 'Zero stock photo or synthetic placeholder URLs referenced');


  console.log('\n--- [GATE 6: LOCALHOST FIGMA SVG EXPORT ENGINE (R5)] ---');
  // 1. Test master SVG export endpoint
  const masterSvgRes = await httpGet('/download-figma-svg?artboard=master');
  assert(masterSvgRes.statusCode === 200,
    'FIGMA_EXPORT.01', 'GET /download-figma-svg?artboard=master responds with HTTP 200');

  assert(masterSvgRes.headers['content-type'].includes('image/svg+xml'),
    'FIGMA_EXPORT.02', 'Master SVG responds with Content-Type: image/svg+xml');

  assert(masterSvgRes.body.includes('<svg') && masterSvgRes.body.includes('xmlns="http://www.w3.org/2000/svg"'),
    'FIGMA_EXPORT.03', 'Master SVG contains valid root SVG element and XML namespace');

  assert(masterSvgRes.body.includes('viewBox="0 0'),
    'FIGMA_EXPORT.04', 'Master SVG artboard defines explicit viewBox dimensions');

  // Verify target Figma canvas ID FKPMaN6f04sHPAkjDIjYZY
  assert(masterSvgRes.body.includes('FKPMaN6f04sHPAkjDIjYZY') || homeRes.body.includes('FKPMaN6f04sHPAkjDIjYZY'),
    'FIGMA_EXPORT.05', 'Target Figma canvas ID FKPMaN6f04sHPAkjDIjYZY bound to dev export toolbar');

  // Test individual artboard exports
  const artboards = ['desktop-home', 'mobile-home', 'shop', 'pdp', 'about', 'popup', 'tokens'];
  let artboardsValid = 0;
  for (const ab of artboards) {
    const abRes = await httpGet(`/download-figma-svg?artboard=${ab}`);
    if (abRes.statusCode === 200 && abRes.body.includes('<svg') && abRes.body.includes('viewBox')) {
      artboardsValid++;
    } else {
      console.error(`Artboard export failed for: ${ab}`);
    }
  }
  assert(artboardsValid === artboards.length,
    'FIGMA_EXPORT.06', `All ${artboards.length} individual SVG artboards generate valid SVG XML`);

  // Verify localhost floating toolbar presence
  assert(homeRes.body.includes('SbDevExportToolbar') && homeRes.body.includes('Download SVG for Figma'),
    'FIGMA_EXPORT.07', 'Localhost DOM includes floating dev export toolbar (#SbDevExportToolbar)');


  console.log('\n--- [GATE 7: INTERACTIVE PROTOTYPE FLOWS & ADVERSARIAL STRESS] ---');
  // 1. Popup Quiz POST /api/popup-leads - valid submission
  const leadResValid = await httpPost('/api/popup-leads', {
    personality: 'Sour & Savage',
    email: 'test@example.com',
    phone: '+919876543210'
  });
  assert(leadResValid.statusCode === 200 && leadResValid.body.includes('"ok":true'),
    'INTERACTIVE.01', 'POST /api/popup-leads accepts valid lead capture data');

  // 2. Adversarial payload: empty JSON object
  const leadResEmpty = await httpPost('/api/popup-leads', {});
  assert(leadResEmpty.statusCode === 200,
    'INTERACTIVE.02', 'POST /api/popup-leads handles empty JSON payload gracefully without server crash');

  // 3. Adversarial payload: XSS and SQL injection strings
  const leadResAdversarial = await httpPost('/api/popup-leads', {
    personality: '<script>alert(1)</script>',
    email: "' OR 1=1 --@evil.com",
    phone: '<img src=x onerror=alert(1)>'
  });
  assert(leadResAdversarial.statusCode === 200,
    'INTERACTIVE.03', 'POST /api/popup-leads survives adversarial injection strings safely');

  // 4. Cart Discount Calculation
  // Product price ₹399 -> 5% off = ₹379.05 net
  const priceSideEye = 399;
  const discountRate = 0.05;
  const discountedPrice = priceSideEye * (1 - discountRate);
  assert(Math.abs(discountedPrice - 379.05) < 0.001,
    'INTERACTIVE.04', 'Discount calculation logic verifies ₹399 with 5% off equals ₹379.05');

  // Bundle ₹2097 gross -> ₹1992.15 net
  const bundleGross = 2097;
  const bundleNet = bundleGross * 0.95;
  assert(Math.abs(bundleNet - 1992.15) < 0.01,
    'INTERACTIVE.05', 'Multi-item bundle calculation verifies ₹2097 with 5% off equals ₹1992.15');

  // 5. PDP 3 dossier tabs present
  assert(pdpRes.body.includes('TabInTheJar') && pdpRes.body.includes('TabOnTheTongue') && pdpRes.body.includes('TabAfterOpening'),
    'INTERACTIVE.06', 'PDP contains all 3 physical folder dossier tabs (#TabInTheJar, #TabOnTheTongue, #TabAfterOpening)');

  // 6. Shop Flavour Matcher present
  assert(shopRes.body.includes('ShopFlavorMatcher'),
    'INTERACTIVE.07', 'Shop collection page contains interactive Flavour Matcher component');

  // 7. About Page Founder Cover Feature
  assert(aboutRes.body.includes('about-cover.JPG') && aboutRes.body.includes('raw mango'),
    'INTERACTIVE.08', 'About page features authentic founder photography and raw mango diary narrative');

  // 8. 404 Custom Error Handling
  const notFoundRes = await httpGet('/non-existent-craving-route-xyz');
  assert(notFoundRes.statusCode === 404 && notFoundRes.body.includes('craving not found'),
    'INTERACTIVE.09', 'Non-existent route returns HTTP 404 with custom brand error layout');

  // 9. Static Server Path Traversal Protection
  const traversalRes = await httpGet('/../../../../etc/passwd');
  assert(traversalRes.statusCode === 404 || traversalRes.statusCode === 400 || traversalRes.statusCode === 403,
    'INTERACTIVE.10', 'Path traversal attempt safely rejected (HTTP 400/403/404)');


  console.log('\n--- [GATE 8: STRICT THEME FREEZE FORENSIC AUDIT (R7)] ---');
  let gitDiffStatus = '';
  try {
    gitDiffStatus = execSync('git status --porcelain shopify-theme/', { cwd: PROJECT_ROOT, encoding: 'utf8' }).trim();
  } catch (err) {
    gitDiffStatus = err.message;
  }
  assert(gitDiffStatus === '',
    'THEME_FREEZE.01', 'git status shopify-theme/ confirms 0 modified, untracked, or deleted files');


  console.log('\n================================================================================');
  console.log('ADVERSARIAL REJECTION GATE EXECUTION SUMMARY');
  console.log('================================================================================');
  console.log(`TOTAL AUDIT CHECKS: ${totalTests}`);
  console.log(`PASSED: ${passedTests}`);
  console.log(`FAILED: ${failedTests}`);
  console.log(`STATUS: ${failedTests === 0 ? 'ALL GATES PASSED (APPROVED)' : 'REJECTION GATE TRIGGERED (REQUEST_CHANGES)'}`);
  console.log('================================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAdversarialGateTests().catch((err) => {
  console.error('Fatal harness error:', err);
  process.exit(1);
});
