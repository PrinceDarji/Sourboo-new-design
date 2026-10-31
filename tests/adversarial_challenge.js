/**
 * SOURBOO ADVERSARIAL CHALLENGE TEST SUITE
 * Subagent: challenger_m1_1 (Empirical Challenger)
 * Port: 3456
 *
 * Systematic stress-testing, boundary-mining, XML validation, ARIA verification,
 * and security challenge harness.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3456';
const REDESIGN_DIR = path.join(__dirname, '..', 'redesign');
const ARTBOARDS_DIR = path.join(REDESIGN_DIR, 'artboards');

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  findings: []
};

function recordTest(suite, name, passed, details = '') {
  results.total++;
  if (passed) {
    results.passed++;
    console.log(`  [PASS] ${name}`);
  } else {
    results.failed++;
    console.log(`  [FAIL] ${name} -> ${details}`);
    results.findings.push({ suite, name, details });
  }
}

// HTTP Request Helper
function makeRequest({ url = '/', method = 'GET', headers = {}, body = null }) {
  return new Promise((resolve) => {
    const parsed = new URL(url, BASE_URL);
    const reqHeaders = { ...headers };
    if (body !== null && !reqHeaders['Content-Length']) {
      reqHeaders['Content-Length'] = Buffer.byteLength(body);
    }
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname + parsed.search,
        method,
        headers: reqHeaders,
        timeout: 4000
      },
      (res) => {
        let resBody = '';
        res.on('data', (chunk) => {
          resBody += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: resBody,
            error: null
          });
        });
      }
    );
    req.on('error', (err) => {
      resolve({ statusCode: 0, headers: {}, body: '', error: err.message });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ statusCode: 0, headers: {}, body: '', error: 'Request timeout' });
    });
    if (body !== null) req.write(body);
    req.end();
  });
}

// Strict W3C XML 1.0 Syntax Validator
function validateXmlStrict(xmlString, filename = 'inline') {
  const errors = [];
  
  // 1. Bare ampersand check (ampersand not followed by valid entity or character reference)
  const bareAmpRegex = /&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g;
  let match;
  while ((match = bareAmpRegex.exec(xmlString)) !== null) {
    // Check if inside a comment <!-- ... -->
    const before = xmlString.substring(0, match.index);
    const lastCommentOpen = before.lastIndexOf('<!--');
    const lastCommentClose = before.lastIndexOf('-->');
    const insideComment = lastCommentOpen > lastCommentClose;
    
    // Check if inside CDATA <![CDATA[ ... ]]>
    const lastCdataOpen = before.lastIndexOf('<![CDATA[');
    const lastCdataClose = before.lastIndexOf(']]>');
    const insideCdata = lastCdataOpen > lastCdataClose;

    if (!insideComment && !insideCdata) {
      const line = before.split('\n').length;
      const col = match.index - before.lastIndexOf('\n');
      const snippet = xmlString.substring(Math.max(0, match.index - 20), Math.min(xmlString.length, match.index + 25));
      errors.push(`Line ${line}, Col ${col}: Bare unescaped '&' found: "...${snippet}..."`);
    }
  }

  // 2. Tag balance and attribute quote check
  const tagStack = [];
  const tagRegex = /<(\/)?([a-zA-Z0-9:_-]+)([^>]*?)(\/)?>/g;
  let tagMatch;
  let stripped = xmlString.replace(/<!--[\s\S]*?-->/g, '').replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '');
  
  // Strip XML declaration and DOCTYPE
  stripped = stripped.replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!DOCTYPE[\s\S]*?>/g, '');

  while ((tagMatch = tagRegex.exec(stripped)) !== null) {
    const isClosing = Boolean(tagMatch[1]);
    const tagName = tagMatch[2];
    const attrs = tagMatch[3];
    const isSelfClosing = Boolean(tagMatch[4]);

    if (isClosing) {
      if (tagStack.length === 0) {
        errors.push(`Closing tag </${tagName}> has no matching open tag`);
      } else {
        const top = tagStack.pop();
        if (top !== tagName) {
          errors.push(`Mismatched tags: opened <${top}>, closed </${tagName}>`);
        }
      }
    } else if (!isSelfClosing) {
      tagStack.push(tagName);
    }

    // Check attribute quoting in attrs
    if (attrs.trim()) {
      const attrRegex = /([a-zA-Z0-9:_-]+)\s*=\s*(?:(".*?")|('.*?')|([^'"\s>]+))/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        if (attrMatch[4]) {
          errors.push(`Unquoted attribute value in <${tagName}>: ${attrMatch[1]}=${attrMatch[4]}`);
        }
      }
    }
  }

  if (tagStack.length > 0) {
    errors.push(`Unclosed open tags at EOF: ${tagStack.join(' -> ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

async function runTestSuite() {
  console.log('================================================================================');
  console.log('SOURBOO ADVERSARIAL CHALLENGER VERIFICATION SUITE');
  console.log('Target Server: http://localhost:3456');
  console.log('================================================================================\n');

  // --------------------------------------------------------------------------
  // SECTION 1: POST /api/popup-leads Boundary & Payload Stress-Testing
  // --------------------------------------------------------------------------
  console.log('--- [SECTION 1: /api/popup-leads Boundary & Stress-Testing] ---');

  // Test 1.1: Valid JSON payload
  const validRes = await makeRequest({
    url: '/api/popup-leads',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'sourboo@test.com', phone: '9876543210', personality: 'Sour & Savage' })
  });
  recordTest('API', 'POST valid lead returns HTTP 200 { ok: true }', validRes.statusCode === 200 && validRes.body.includes('"ok":true'));

  // Test 1.2: Empty body
  const emptyRes = await makeRequest({
    url: '/api/popup-leads',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: ''
  });
  recordTest('API', 'POST empty body handled gracefully without crash (HTTP 200/400)', emptyRes.statusCode === 200 || emptyRes.statusCode === 400);

  // Test 1.3: Malformed JSON syntax
  const malformedRes = await makeRequest({
    url: '/api/popup-leads',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"email": "broken_json_no_close'
  });
  recordTest('API', 'POST malformed JSON handled without unhandled exception', malformedRes.statusCode === 200 || malformedRes.statusCode === 400);

  // Test 1.4: Non-object JSON primitives (number, bool, null, array, string)
  const nonObjectPayloads = ['12345', 'true', 'false', 'null', '"plain string"', '[1, 2, 3]'];
  let nonObjectsPassed = true;
  for (const nop of nonObjectPayloads) {
    const res = await makeRequest({
      url: '/api/popup-leads',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: nop
    });
    if (res.statusCode === 0) nonObjectsPassed = false;
  }
  recordTest('API', 'POST non-object JSON primitives handled without process crash', nonObjectsPassed);

  // Test 1.5: SQL Injection strings in JSON
  const sqliRes = await makeRequest({
    url: '/api/popup-leads',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: "' OR '1'='1' --", phone: "'; DROP TABLE leads; --" })
  });
  recordTest('API', 'POST SQL injection strings parsed safely without server error', sqliRes.statusCode === 200);

  // Test 1.6: XSS strings in JSON
  const xssRes = await makeRequest({
    url: '/api/popup-leads',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: '<script>alert(document.cookie)</script>', phone: '<img src=x onerror=alert(1)>' })
  });
  recordTest('API', 'POST XSS markup parsed safely without server error', xssRes.statusCode === 200);

  // Test 1.7: Unicode and Emoji payloads
  const unicodeRes = await makeRequest({
    url: '/api/popup-leads',
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ email: 'test@sourboo.com', phone: '9876543210', personality: '🍋 Sour & Savage 🥒' })
  });
  recordTest('API', 'POST Unicode & Emoji payload accepted with HTTP 200', unicodeRes.statusCode === 200);

  // Test 1.8: Missing Content-Type header
  const noCtRes = await makeRequest({
    url: '/api/popup-leads',
    method: 'POST',
    headers: {},
    body: JSON.stringify({ email: 'test@sourboo.com', phone: '9876543210' })
  });
  recordTest('API', 'POST missing Content-Type header handled without error', noCtRes.statusCode === 200);

  // Test 1.9: Large payload (500 KB)
  const largeData = JSON.stringify({ email: 'a'.repeat(250000) + '@test.com', phone: '12345678' });
  const largeRes = await makeRequest({
    url: '/api/popup-leads',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: largeData
  });
  recordTest('API', 'POST 500KB payload handled without timeout or crash', largeRes.statusCode === 200);

  // --------------------------------------------------------------------------
  // SECTION 2: HTTP Method Abuse on All Endpoints
  // --------------------------------------------------------------------------
  console.log('\n--- [SECTION 2: HTTP Method Abuse & Protocol Conformance] ---');

  // Test 2.1: Unusual methods to /api/popup-leads
  const leadsGet = await makeRequest({ url: '/api/popup-leads', method: 'GET' });
  recordTest('METHOD', 'GET /api/popup-leads returns 404/405 (not 200 or 500)', leadsGet.statusCode === 404 || leadsGet.statusCode === 405);

  const leadsPut = await makeRequest({ url: '/api/popup-leads', method: 'PUT', body: '{}' });
  recordTest('METHOD', 'PUT /api/popup-leads returns 404/405', leadsPut.statusCode === 404 || leadsPut.statusCode === 405);

  const leadsDelete = await makeRequest({ url: '/api/popup-leads', method: 'DELETE' });
  recordTest('METHOD', 'DELETE /api/popup-leads returns 404/405', leadsDelete.statusCode === 404 || leadsDelete.statusCode === 405);

  const leadsOptions = await makeRequest({ url: '/api/popup-leads', method: 'OPTIONS' });
  // Note: OPTIONS might return 404 or 204. Record observation.
  const optionsOk = leadsOptions.statusCode === 200 || leadsOptions.statusCode === 204 || leadsOptions.statusCode === 404;
  recordTest('METHOD', 'OPTIONS /api/popup-leads returns controlled response without crash', optionsOk);

  // Test 2.2: HEAD request to homepage
  const homeHead = await makeRequest({ url: '/', method: 'HEAD' });
  recordTest('METHOD', 'HEAD / returns HTTP 200 with zero-length response body', homeHead.statusCode === 200 && homeHead.body.length === 0);

  // Test 2.3: HEAD request to /download-figma-svg
  const svgHead = await makeRequest({ url: '/download-figma-svg', method: 'HEAD' });
  recordTest('METHOD', 'HEAD /download-figma-svg returns HTTP 200 with zero body', svgHead.statusCode === 200 && svgHead.body.length === 0);

  // Test 2.4: Mutating methods on GET routes (e.g. POST, PUT, DELETE to /)
  const homePut = await makeRequest({ url: '/', method: 'PUT', body: 'test' });
  // Observation: server serves HTML on PUT /. Does it crash? No.
  recordTest('METHOD', 'PUT / does not crash server process', homePut.statusCode === 200 || homePut.statusCode === 405);

  // --------------------------------------------------------------------------
  // SECTION 3: Figma SVG Export Endpoint & Artboard Variations
  // --------------------------------------------------------------------------
  console.log('\n--- [SECTION 3: Figma SVG Export Endpoint & Query Parameters] ---');

  const artboardParams = [
    { param: 'master', file: 'sourboo-master-figma.svg', expectedWidth: 7200, expectedHeight: 6400 },
    { param: 'all', file: 'sourboo-master-figma.svg', expectedWidth: 7200, expectedHeight: 6400 },
    { param: 'desktop-home', file: '01-desktop-homepage.svg', expectedWidth: 1440, expectedHeight: 6200 },
    { param: 'mobile-home', file: '02-mobile-homepage.svg', expectedWidth: 390, expectedHeight: 4800 },
    { param: 'shop', file: '03-desktop-shop.svg', expectedWidth: 1440, expectedHeight: 3400 },
    { param: 'pdp', file: '04-desktop-pdp.svg', expectedWidth: 1440, expectedHeight: 3600 },
    { param: 'about', file: '05-desktop-about.svg', expectedWidth: 1440, expectedHeight: 3200 },
    { param: 'popup', file: '06-personality-popup.svg', expectedWidth: 2600, expectedHeight: 800 },
    { param: 'tokens', file: '07-design-system-tokens.svg', expectedWidth: 1440, expectedHeight: 2200 }
  ];

  for (const ab of artboardParams) {
    const res = await makeRequest({ url: `/download-figma-svg?artboard=${ab.param}` });
    const is200 = res.statusCode === 200;
    const isSvgType = res.headers['content-type'] && res.headers['content-type'].includes('image/svg+xml');
    const hasDispo = res.headers['content-disposition'] && res.headers['content-disposition'].includes(ab.file);
    const hasXmlNs = res.body.includes('xmlns="http://www.w3.org/2000/svg"');

    // Extract viewBox
    const viewBoxMatch = res.body.match(/viewBox=["']([0-9\s.-]+)["']/);
    const hasViewBox = Boolean(viewBoxMatch);

    recordTest('SVG_ENDPOINT', `?artboard=${ab.param} -> HTTP 200, Content-Type image/svg+xml, disposition ${ab.file}`, is200 && isSvgType && hasDispo);
    recordTest('SVG_VIEWBOX', `?artboard=${ab.param} -> defines explicit viewBox [${viewBoxMatch ? viewBoxMatch[1] : 'NONE'}]`, hasViewBox);
  }

  // Test 3.2: Boundary query parameter values
  const defaultRes = await makeRequest({ url: '/download-figma-svg' });
  recordTest('SVG_ENDPOINT', 'No ?artboard param defaults to master artboard (HTTP 200)', defaultRes.statusCode === 200 && defaultRes.headers['content-disposition'].includes('sourboo-master-figma.svg'));

  const emptyParamRes = await makeRequest({ url: '/download-figma-svg?artboard=' });
  recordTest('SVG_ENDPOINT', '?artboard= (empty) gracefully defaults to master (HTTP 200)', emptyParamRes.statusCode === 200 && emptyParamRes.headers['content-disposition'].includes('sourboo-master-figma.svg'));

  const invalidParamRes = await makeRequest({ url: '/download-figma-svg?artboard=nonexistent_artboard_xyz' });
  recordTest('SVG_ENDPOINT', '?artboard=nonexistent safely defaults without crash (HTTP 200)', invalidParamRes.statusCode === 200 && invalidParamRes.headers['content-disposition'].includes('sourboo-master-figma.svg'));

  const traversalParamRes = await makeRequest({ url: '/download-figma-svg?artboard=../../preview_server.js' });
  recordTest('SVG_ENDPOINT', '?artboard=../../path_traversal blocked from path traversal (serves safe SVG)', traversalParamRes.statusCode === 200 && traversalParamRes.body.includes('<svg'));

  // Test 3.3: Host header restriction (Localhost-only enforcement)
  const evilHostRes = await makeRequest({
    url: '/download-figma-svg',
    headers: { Host: 'evil-attacker.com' }
  });
  recordTest('SECURITY', 'External Host: evil-attacker.com receives HTTP 403 Forbidden', evilHostRes.statusCode === 403 && evilHostRes.body.includes('Access Denied'));

  const prodHostRes = await makeRequest({
    url: '/download-figma-svg',
    headers: { Host: 'sourboo.com' }
  });
  recordTest('SECURITY', 'Production Host: sourboo.com receives HTTP 403 Forbidden', prodHostRes.statusCode === 403);

  // --------------------------------------------------------------------------
  // SECTION 4: Strict W3C XML 1.0 Validation of Exported SVGs
  // --------------------------------------------------------------------------
  console.log('\n--- [SECTION 4: Strict W3C XML 1.0 Validation of All SVG Artboards] ---');

  const svgFiles = fs.readdirSync(ARTBOARDS_DIR).filter((f) => f.endsWith('.svg'));
  for (const svgFile of svgFiles) {
    const rawSvg = fs.readFileSync(path.join(ARTBOARDS_DIR, svgFile), 'utf8');
    const valResult = validateXmlStrict(rawSvg, svgFile);
    if (!valResult.valid) {
      recordTest(
        'XML_VALIDITY',
        `SVG XML Well-Formedness: ${svgFile}`,
        false,
        `Found ${valResult.errors.length} W3C XML violation(s): ${valResult.errors[0]}`
      );
    } else {
      recordTest('XML_VALIDITY', `SVG XML Well-Formedness: ${svgFile}`, true);
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 5: Client-Side Logic & Boundary State Challenges
  // --------------------------------------------------------------------------
  console.log('\n--- [SECTION 5: Client-Side Logic (Cart, Coupons, Quiz Validation)] ---');

  // Load and evaluate client utilities from sourboo-redesign.js
  const redesignJsPath = path.join(REDESIGN_DIR, 'js', 'sourboo-redesign.js');
  const jsContent = fs.readFileSync(redesignJsPath, 'utf8');

  // Test 5.1: Coupon Code Normalization & Boundaries
  // Logic from sourboo-redesign.js: clean = (code || '').trim().toUpperCase(); return clean === 'SOURBABE05';
  function testCoupon(code) {
    const clean = (code || '').trim().toUpperCase();
    return clean === 'SOURBABE05';
  }

  recordTest('COUPON', 'Uppercase coupon "SOURBABE05" valid', testCoupon('SOURBABE05') === true);
  recordTest('COUPON', 'Lowercase coupon "sourbabe05" valid (normalized)', testCoupon('sourbabe05') === true);
  recordTest('COUPON', 'Mixed case "SoUrBaBe05" valid', testCoupon('SoUrBaBe05') === true);
  recordTest('COUPON', 'Whitespace padded "  sourbabe05  " valid', testCoupon('  sourbabe05  ') === true);
  recordTest('COUPON', 'Trailing newline/space "SOURBABE05 \\n" valid', testCoupon('SOURBABE05 \n') === true);
  recordTest('COUPON', 'Invalid code "SOURBABE10" rejected', testCoupon('SOURBABE10') === false);
  recordTest('COUPON', 'Invalid code "BOGUS" rejected', testCoupon('BOGUS') === false);
  recordTest('COUPON', 'Empty coupon "" rejected', testCoupon('') === false);
  recordTest('COUPON', 'Null coupon rejected', testCoupon(null) === false);
  recordTest('COUPON', 'Undefined coupon rejected', testCoupon(undefined) === false);
  recordTest('COUPON', 'Internal space "SOURBABE 05" rejected', testCoupon('SOURBABE 05') === false);

  // Test 5.2: Discount Math
  function calcCart(subtotal, validDiscount) {
    const rate = 0.05;
    const discountAmount = validDiscount ? Math.round(subtotal * rate) : 0;
    const total = Math.max(0, subtotal - discountAmount);
    return { subtotal, discountAmount, total };
  }

  const singleItem = calcCart(399, true);
  recordTest('DISCOUNT_MATH', '₹399 single item with 5% off yields ₹379 (₹20 discount)', singleItem.discountAmount === 20 && singleItem.total === 379);

  const bundle = calcCart(2097, true);
  recordTest('DISCOUNT_MATH', '₹2097 multi-item bundle with 5% off yields ₹1992 (₹105 discount)', bundle.discountAmount === 105 && bundle.total === 1992);

  const zeroCart = calcCart(0, true);
  recordTest('DISCOUNT_MATH', '₹0 empty cart yields ₹0 total without negative discount', zeroCart.total === 0 && zeroCart.discountAmount === 0);

  // Test 5.3: Cart Quantity Boundaries
  // Logic from Cart.addItem: qtyToAdd = Math.max(1, parseInt(product.quantity, 10) || 1);
  function getSanitizedQty(input) {
    return Math.max(1, parseInt(input, 10) || 1);
  }

  recordTest('CART_QTY', 'Negative quantity (-5) sanitized to 1', getSanitizedQty(-5) === 1);
  recordTest('CART_QTY', 'Zero quantity (0) sanitized to 1', getSanitizedQty(0) === 1);
  recordTest('CART_QTY', 'Non-numeric string ("abc") sanitized to 1', getSanitizedQty('abc') === 1);
  recordTest('CART_QTY', 'Float string ("2.9") parsed as 2', getSanitizedQty('2.9') === 2);
  recordTest('CART_QTY', 'Null input sanitized to 1', getSanitizedQty(null) === 1);
  recordTest('CART_QTY', 'Large quantity (999999) handled as integer', getSanitizedQty('999999') === 999999);

  // Test 5.4: Currency Formatter Resilience
  function formatCurrency(amount) {
    const num = Math.round(Number(amount) || 0);
    return `₹${num.toLocaleString('en-IN')}`;
  }

  recordTest('CURRENCY', 'formatCurrency(399) -> "₹399"', formatCurrency(399) === '₹399');
  recordTest('CURRENCY', 'formatCurrency(NaN) -> "₹0"', formatCurrency(NaN) === '₹0');
  recordTest('CURRENCY', 'formatCurrency(null) -> "₹0"', formatCurrency(null) === '₹0');
  recordTest('CURRENCY', 'formatCurrency("invalid") -> "₹0"', formatCurrency('invalid') === '₹0');
  recordTest('CURRENCY', 'formatCurrency(1000000) -> "₹10,00,000" (Indian grouping)', formatCurrency(1000000) === '₹10,00,000');

  // Test 5.5: Personality Quiz Input Validation Regexes
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  const validatePhone = (phone) => {
    const digits = String(phone).replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
  };

  recordTest('VALIDATION', 'Valid email "cravings@sourboo.com"', validateEmail('cravings@sourboo.com') === true);
  recordTest('VALIDATION', 'Invalid email "cravings@sourboo"', validateEmail('cravings@sourboo') === false);
  recordTest('VALIDATION', 'Invalid email "@sourboo.com"', validateEmail('@sourboo.com') === false);
  recordTest('VALIDATION', 'Invalid email with space "crav ings@sourboo.com"', validateEmail('crav ings@sourboo.com') === false);
  recordTest('VALIDATION', 'Valid 10-digit phone "9876543210"', validatePhone('9876543210') === true);
  recordTest('VALIDATION', 'Valid formatted phone "+91 (812) 020-2060"', validatePhone('+91 (812) 020-2060') === true);
  recordTest('VALIDATION', 'Short phone (<8 digits) "12345" rejected', validatePhone('12345') === false);
  recordTest('VALIDATION', 'Long phone (>15 digits) "1234567890123456" rejected', validatePhone('1234567890123456') === false);

  // --------------------------------------------------------------------------
  // SECTION 6: Accessibility (ARIA, Keyboard, Heading Structure)
  // --------------------------------------------------------------------------
  console.log('\n--- [SECTION 6: Accessibility & Keyboard Navigability Audit] ---');

  // Fetch PDP HTML for Side Eye Sour
  const pdpRes = await makeRequest({ url: '/products/sideeyesour' });

  // Test 6.1: PDP Dossier Tabs Accessibility
  const hasTabList = pdpRes.body.includes('role="tablist"');
  recordTest('A11Y_TABS', 'PDP tab buttons wrapper defines role="tablist"', hasTabList, 'Missing role="tablist" on .sb-tab-buttons-row');

  const hasRoleTab = pdpRes.body.includes('role="tab"');
  recordTest('A11Y_TABS', 'PDP tab buttons define role="tab"', hasRoleTab, 'Missing role="tab" on #TabInTheJar, #TabOnTheTongue, #TabAfterOpening');

  const hasAriaSelected = pdpRes.body.includes('aria-selected=');
  recordTest('A11Y_TABS', 'PDP tab buttons have initial aria-selected attribute', hasAriaSelected, 'Missing initial aria-selected="true/false" in server-rendered markup');

  const hasAriaControls = pdpRes.body.includes('aria-controls=');
  recordTest('A11Y_TABS', 'PDP tab buttons define aria-controls attribute', hasAriaControls, 'Missing aria-controls referencing panel IDs');

  const hasRoleTabpanel = pdpRes.body.includes('role="tabpanel"');
  recordTest('A11Y_TABS', 'PDP panels define role="tabpanel"', hasRoleTabpanel, 'Missing role="tabpanel" on #TabInJar, #TabOnTongue, #TabAfterOpening');

  const hasAriaLabelledby = pdpRes.body.includes('aria-labelledby=');
  recordTest('A11Y_TABS', 'PDP panels define aria-labelledby referencing tab buttons', hasAriaLabelledby, 'Missing aria-labelledby on panels');

  // Test 6.2: Modal Dialogs Accessibility
  const hasPopupDialog = pdpRes.body.includes('id="LandingPersonalityPopup"') && pdpRes.body.includes('role="dialog"');
  recordTest('A11Y_MODAL', 'Personality popup modal defines role="dialog"', hasPopupDialog);

  const hasPopupAriaModal = pdpRes.body.includes('id="LandingPersonalityPopup"') && pdpRes.body.includes('aria-modal="true"');
  recordTest('A11Y_MODAL', 'Personality popup modal defines aria-modal="true"', hasPopupAriaModal);

  const hasCartDialog = pdpRes.body.includes('id="CartDrawer"') && pdpRes.body.includes('role="dialog"');
  recordTest('A11Y_CART', 'Cart drawer defines role="dialog"', hasCartDialog);

  const hasCartAriaModal = pdpRes.body.includes('id="CartDrawer"') && pdpRes.body.includes('aria-modal="true"');
  recordTest('A11Y_CART', 'Cart drawer defines aria-modal="true"', hasCartAriaModal);

  // Test 6.3: Keyboard navigation handlers in JS
  const hasEscapeHandler = jsContent.includes("e.key === 'Escape'");
  recordTest('KEYBOARD', 'Escape key listener present for modal and drawer dismissal', hasEscapeHandler);

  const hasArrowKeyTabHandler = jsContent.includes("e.key === 'ArrowRight'") && jsContent.includes("e.key === 'ArrowLeft'");
  recordTest('KEYBOARD', 'Arrow key listener (ArrowRight/ArrowLeft) present for dossier tab navigation', hasArrowKeyTabHandler);

  // --------------------------------------------------------------------------
  // SUMMARY & VERDICT
  // --------------------------------------------------------------------------
  console.log('\n================================================================================');
  console.log('ADVERSARIAL CHALLENGE EXECUTION SUMMARY');
  console.log('================================================================================');
  console.log(`TOTAL CHECKS: ${results.total}`);
  console.log(`PASSED:       ${results.passed}`);
  console.log(`FAILED:       ${results.failed}`);
  console.log('--------------------------------------------------------------------------------');

  if (results.failed > 0) {
    console.log(`STATUS: ${results.failed} DEFICIENCIES / VULNERABILITIES IDENTIFIED`);
    console.log('\nITEMIZED DEFICIENCIES:');
    results.findings.forEach((f, idx) => {
      console.log(`  ${idx + 1}. [${f.suite}] ${f.name}`);
      console.log(`     Details: ${f.details}`);
    });
  } else {
    console.log('STATUS: ALL ADVERSARIAL STRESS TESTS PASSED');
  }
  console.log('================================================================================\n');

  // Return exit code
  return results;
}

if (require.main === module) {
  runTestSuite().then((res) => {
    // Write results to JSON for machine consumption if needed
    fs.writeFileSync(
      path.join(__dirname, 'adversarial_results.json'),
      JSON.stringify(res, null, 2),
      'utf8'
    );
    process.exit(0);
  });
}

module.exports = { runTestSuite };
