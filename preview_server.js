const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const ASSETS_DIR = path.join(__dirname, 'shopify-theme', 'assets');

// Helper to determine Content-Type
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon'
};

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

// Product database matching CATALOG_PRODUCTS
const PRODUCTS = [
  {
    slug: 'sideeyesour',
    name: 'SIDE EYE SOUR',
    price: '399',
    hoverLabel: 'Lemon & Chaat Masala • Snackable pickled gherkins',
    image: 'side-eye.webp',
    lifestyle: 'side-eye-lifestyle.webp',
    ingredients: 'Gherkins, Water, Vinegar, Lemon slices, Rock salt, Chaat masala powder, Whole red chilli, Cumin powder, Dehydrated chopped garlic, Yellow mustard seeds, Sugar, Ginger powder, Calcium chloride',
    tongue: 'It’s properly khatta, with a sour punch that stops you for a second, and makes you squint a little. Juicy, spicy, sour, and more waiting to be discovered as you chew the crinkle-cut slices.\nPerfect for when you want to be extra and a lil hot. ¬‿¬',
    storage: 'Store it in the fridge for max crunch - keep it where you can see it.\nEat it when your mouth wants to misbehave, or with any meal you love.'
  },
  {
    slug: 'tamarintease',
    name: 'TAMARIN’ TEASE',
    price: '399',
    hoverLabel: 'Tamarind & Chilli • Snackable pickled gherkins',
    image: 'tamarin-tease.webp',
    lifestyle: 'tamarin-lifestyle.webp',
    ingredients: 'Gherkins, Water, Vinegar, Tamarind pulp, Rock salt, Chaat masala powder, Whole red chilli, Cumin powder, Dehydrated chopped garlic, Yellow mustard seeds, Sugar, Ginger powder, Calcium chloride',
    tongue: 'It’s sweet-sour at the first bite proper imli, the kind that makes your mouth water instantly.\nYou get the full crunch of the whole gherkin, juicy and tangy, with spice slowly building as you chew. Teasing, mouth-watering, and hard to stop.',
    storage: 'Store it in the fridge for max crunch - keep it where you can see it.\nEat it when your mouth wants something tangy, or with any meal you love.'
  },
  {
    slug: 'tamarind-twins',
    name: 'Tamarind Twins',
    price: '719',
    hoverLabel: '2 × TAMARIN’ TEASE • Double imli crunch',
    image: 'tamarind-twins.webp',
    lifestyle: 'tamarin-lifestyle.webp',
    ingredients: '2 × TAMARIN’ TEASE: Gherkins, Water, Vinegar, Tamarind pulp, Rock salt, Chaat masala powder, Whole red chilli, Cumin powder, Dehydrated chopped garlic, Yellow mustard seeds, Sugar, Ginger powder, Calcium chloride',
    tongue: 'Double the sweet-sour imli hit! Juicy, tangy gherkins that tease the tongue and build pleasant spicy heat.',
    storage: 'Store both jars in the fridge for peak crunch.'
  },
  {
    slug: 'lemon-lovers',
    name: 'Lemon Lovers',
    price: '729',
    hoverLabel: '2 × SIDE EYE SOUR • Extra khatta delight',
    image: 'lemon-lovers.webp',
    lifestyle: 'side-eye-lifestyle.webp',
    ingredients: '2 × SIDE EYE SOUR: Gherkins, Water, Vinegar, Sugar, Lemon slices, Rock salt, Chaat masala powder, Whole red chilli, Cumin powder, Dehydrated chopped garlic, Yellow mustard seeds, Ginger powder, Calcium chloride',
    tongue: 'For serious citrus addicts. An intense double sour punch that makes you squint and crave more.',
    storage: 'Keep cold in the fridge to preserve max crispness.'
  },
  {
    slug: 'sour-sampler',
    name: 'Sour Sampler',
    price: '729',
    hoverLabel: '1 × SIDE EYE + 1 × TAMARIN’ TEASE',
    image: 'sour-sampler.webp',
    lifestyle: 'fridge.webp',
    ingredients: '1 × SIDE EYE SOUR + 1 × TAMARIN’ TEASE. Authentic gherkins, lemon slices, tamarind pulp, and artisanal chaat spices.',
    tongue: 'The perfect duel: lemon tartness versus tamarind tanginess. Experience both signature recipes.',
    storage: 'Store side-by-side in your fridge door.'
  },
  {
    slug: 'sourboo-stash',
    name: 'Sourboo Stash',
    price: '1299',
    hoverLabel: 'Four-jar ultimate variety stash (2 of each flavour)',
    image: 'sourboo-stash.webp',
    lifestyle: 'fridge.webp',
    ingredients: '2 × SIDE EYE SOUR + 2 × TAMARIN’ TEASE. All-natural gherkins, hand-cut spices, rock salt, tamarind, and citrus.',
    tongue: 'Never run out of sour munchies. Bold, crunchy, and ready for late nights, desk snacks, and parties.',
    storage: 'Refrigerate upon opening for relentless crunch.'
  }
];

function renderNav() {
  return `
  <nav class="sb-nav-fixed" role="navigation" aria-label="Main Navigation">
    <div class="sb-nav-desktop">
      <img src="/navbar.webp" alt="Sourboo Navigation Shape" class="sb-nav-desktop-bg" width="1260" height="228" />
      <a href="/" class="sb-nav-desktop-logo" aria-label="Sourboo Home"></a>
      <div class="sb-nav-desktop-content">
        <div class="sb-nav-link-group">
          <a href="/" class="sb-nav-pill">home</a>
          <a href="/pages/about" class="sb-nav-pill">about</a>
          <a href="/collections/all" class="sb-nav-pill">product</a>
        </div>
        <div class="sb-nav-link-group">
          <a href="/pages/join-us" class="sb-nav-pill">join us</a>
          <button type="button" class="sb-nav-pill sb-open-cart-trigger" aria-label="Open Cart">
            cart <span class="sb-nav-cart-badge sb-cart-count"></span>
          </button>
        </div>
      </div>
    </div>
    <div class="sb-nav-mobile">
      <img src="/navbody.webp" alt="Sourboo Navigation Background" class="sb-nav-mobile-bg" width="640" height="98" />
      <div class="sb-nav-mobile-logo-wrap">
        <a href="/" aria-label="Sourboo Home"><img src="/navlogo.webp" alt="Sourboo" width="160" height="42" /></a>
      </div>
      <div class="sb-nav-mobile-links">
        <div style="display: flex; gap: 6px;">
          <a href="/" class="sb-nav-pill" style="font-size: 14px; padding: 4px 7px;">home</a>
          <a href="/pages/about" class="sb-nav-pill" style="font-size: 14px; padding: 4px 7px;">about</a>
          <a href="/collections/all" class="sb-nav-pill" style="font-size: 14px; padding: 4px 7px;">product</a>
        </div>
        <div style="display: flex; gap: 6px;">
          <a href="/pages/join-us" class="sb-nav-pill" style="font-size: 14px; padding: 4px 7px;">join us</a>
          <button type="button" class="sb-nav-pill sb-open-cart-trigger" style="font-size: 14px; padding: 4px 7px;" aria-label="Open Cart">
            cart <span class="sb-nav-cart-badge sb-cart-count"></span>
          </button>
        </div>
      </div>
    </div>
  </nav>
  `;
}

function renderCartDrawer() {
  return `
  <div id="CartDrawerOverlay" class="sb-cart-drawer-overlay sb-close-cart-trigger" aria-hidden="true"></div>
  <aside id="CartDrawer" class="sb-cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
    <div class="sb-cart-header">
      <button type="button" class="sb-cart-close-btn sb-close-cart-trigger" aria-label="Close cart">X</button>
      <img src="/cartlogo.svg" alt="Sourboo logo" width="160" height="68" style="height: 52px; width: auto;" />
    </div>
    <div style="border-bottom: 1px solid rgba(233, 230, 184, 0.4); padding: 12px 0;">
      <h2 class="font-schoolbell" style="font-size: 2.2rem; margin: 0;">Cart <span class="sb-cart-count"></span></h2>
    </div>
    <div id="CartDrawerItems" class="sb-cart-items-scroll"></div>
    <div class="sb-cart-footer">
      <div class="sb-cart-total-line">
        <span>Subtotal</span>
        <span id="CartSubtotal">₹0</span>
      </div>
      <div style="margin: 12px 0; border-top: 1px dashed rgba(233, 230, 184, 0.3); padding-top: 10px;">
        <input type="text" id="CartDiscountInput" placeholder="Discount code (try SOURBABE05)" class="sb-pill-input" style="height: 48px; font-size: 1rem; text-transform: uppercase;" />
        <p id="CartDiscountFeedback" class="font-schoolbell" style="font-size: 1.1rem; margin: 4px 0 0; min-height: 20px;"></p>
      </div>
      <div id="CartDiscountLine" class="sb-cart-total-line" style="display: none; color: #FFF7D6;">
        <span>5% Discount (SOURBABE05)</span>
        <span class="sb-discount-val">-₹0</span>
      </div>
      <div class="sb-cart-total-line" style="border-top: 1px solid rgba(233, 230, 184, 0.4); padding-top: 8px; font-size: 1.8rem;">
        <span>Total before shipping</span>
        <span id="CartTotal">₹0</span>
      </div>
      <p class="font-coolvetica" style="font-size: 1.1rem; opacity: 0.85; margin: 10px 0 0; color: #E9E8D8;">
        ★ Pre-orders only. Flat ₹100 shipping calculated at checkout.
      </p>
      <a href="/checkout" class="sb-cart-checkout-cta" aria-label="Proceed to checkout">
        <span>Checkout →</span>
      </a>
    </div>
  </aside>
  `;
}

function renderPopupModal(forceOpen = false) {
  return `
  <div id="LandingPersonalityPopup" class="sb-modal-backdrop" style="display: ${forceOpen ? 'flex' : 'none'};" role="dialog" aria-modal="true" aria-label="Personality Quiz">
    <button type="button" class="sb-modal-close-btn sb-close-popup-trigger" aria-label="Close popup">×</button>
    <img src="/image1.svg" alt="" class="sb-popup-sticker sb-sticker-top-left" aria-hidden="true" />
    <img src="/image2.svg" alt="" class="sb-popup-sticker sb-sticker-center" aria-hidden="true" />
    <img src="/image3.svg" alt="" class="sb-popup-sticker sb-sticker-top-right" aria-hidden="true" />
    <img src="/image4.svg" alt="" class="sb-popup-sticker sb-sticker-bottom-left" aria-hidden="true" />

    <!-- SCREEN 1 -->
    <div id="PopupScreen1" class="sb-popup-inner">
      <h2 class="sb-popup-h1">
        <span class="font-coolvetica text-pink">what </span>
        <span class="font-schoolbell text-pink">kind of sour are you?</span>
      </h2>
      <p class="sb-popup-subheading">be honest</p>
      <div class="sb-popup-options-grid">
        <a href="#coupon" class="sb-popup-option-btn" data-personality="Sour & Savage" style="background-image: url('/button-bg-1.svg'); color: #FFF36A;">
          <span>Sour & Savage →</span>
        </a>
        <a href="#coupon" class="sb-popup-option-btn" data-personality="Sweet but Psycho" style="background-image: url('/button-bg-2.svg'); color: #F6E9DE;">
          <span>Sweet but Psycho →</span>
        </a>
        <a href="#coupon" class="sb-popup-option-btn" data-personality="Spicy Drama" style="background-image: url('/button-bg-3.svg'); color: #F5EAFB;">
          <span>Spicy Drama →</span>
        </a>
        <a href="#coupon" class="sb-popup-option-btn" data-personality="Lowkey Tangy" style="background-image: url('/button-bg-4.svg'); color: #F0EC84;">
          <span>Lowkey Tangy →</span>
        </a>
      </div>
      <button type="button" class="sb-popup-text-exit sb-close-popup-trigger">
        no thanks take me to the website
      </button>
    </div>

    <!-- SCREEN 2 -->
    <div id="PopupScreen2" class="sb-popup-inner" style="display: none;">
      <h2 id="PopupChosenHeading" class="sb-popup-h1 font-coolvetica text-pink">You're Sour & Savage</h2>
      <p class="font-schoolbell text-pink" style="font-size: clamp(24px, 4vw, 48px); margin: 6px 0;">
        take 5% off. you've earned it
      </p>
      <p class="font-schoolbell" style="font-size: 1.25rem; color: #202020; margin-bottom: 20px;">
        where should we send it?
      </p>
      <form id="PopupLeadForm" class="sb-coupon-form" novalidate>
        <div class="sb-input-row">
          <input type="email" id="PopupEmailInput" placeholder="your email" required class="sb-pill-input" autocomplete="email" />
          <input type="tel" id="PopupPhoneInput" placeholder="your phone number" required class="sb-pill-input" autocomplete="tel" />
        </div>
        <p id="PopupFormError" style="color: #B4232B; font-family: 'Schoolbell', cursive; margin: 4px 0 0; min-height: 22px;"></p>
        <button type="submit" class="sb-unlock-cta">
          <span>unlock my 5%</span>
        </button>
        <p class="font-schoolbell" style="font-size: 1.05rem; color: #2A2A2A; margin: 6px 0 0;">
          no spam, just sour things :)
        </p>
      </form>
      <button type="button" class="sb-popup-text-exit sb-close-popup-trigger">
        no thanks take me to the website
      </button>
    </div>

    <!-- SCREEN 3 -->
    <div id="PopupScreen3" class="sb-popup-inner" style="display: none;">
      <h2 class="sb-popup-h1 font-coolvetica text-pink">you are in!</h2>
      <p class="font-schoolbell text-pink" style="font-size: clamp(22px, 3.5vw, 38px); margin: 12px 0 24px;">
        copy the code and use it at checkout to get 5% off your cart total.
      </p>
      <div style="display: flex; justify-content: center; margin: 24px 0;">
        <button type="button" id="PopupCopyBtn" class="sb-code-copy-pill" aria-label="Copy coupon code">
          <span id="PopupCodeDisplay">SOURBABE05</span>
          <span id="PopupCopyText" style="font-size: 16px; background: var(--sb-pink); color: #fff; padding: 4px 12px; border-radius: 9999px;">COPY</span>
        </button>
      </div>
      <button type="button" class="sb-unlock-cta sb-close-popup-trigger" style="max-width: 380px; margin: 20px auto 0;">
        <span>start shopping with 5% off →</span>
      </button>
    </div>
  </div>
  `;
}

function renderFooter() {
  return `
  <footer class="sb-footer" role="contentinfo">
    <div class="sb-footer-grid">
      <div class="sb-footer-brand-col">
        <div class="sb-footer-logo-wrap">
          <a href="/" aria-label="Sourboo Home"><img src="/logo.svg" alt="Sourboo Logo" width="180" height="48" loading="lazy" /></a>
        </div>
        <p class="sb-footer-tagline">stay sour</p>
        <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 10px;">
          <p class="font-coolvetica" style="color: var(--sb-bg-yellow); font-size: 1.25rem; margin: 0;">GET TO KNOW US:</p>
          <a href="https://www.instagram.com/eatsourboo/" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; font-size: 1.2rem; color: var(--sb-pink-soft);">
            <span>📸</span> <span>@eatsourboo on Instagram</span>
          </a>
          <a href="https://chat.whatsapp.com/L9YSdLAYGfuEke1zXhvoWN" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; font-size: 1.2rem; color: var(--sb-lime);">
            <span>💬</span> <span>Join Sourboo WhatsApp Community</span>
          </a>
        </div>
      </div>
      <div class="sb-footer-links-col">
        <h4>EXPLORE</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/pages/about">Our Story</a></li>
          <li><a href="/collections/all">Shop Pickles</a></li>
          <li><a href="/pages/join-us">Join Us</a></li>
          <li><a href="/pages/contact">Contact Us</a></li>
        </ul>
      </div>
      <div class="sb-footer-links-col">
        <h4>POLICIES</h4>
        <ul>
          <li><a href="/pages/shipping-policy">Shipping Policy</a></li>
          <li><a href="/pages/refund-policy">Refund Policy</a></li>
          <li><a href="/pages/privacy-policy">Privacy Policy</a></li>
          <li><a href="/pages/terms-and-conditions">Terms & Conditions</a></li>
        </ul>
      </div>
    </div>
    <div class="sb-footer-bottom">
      <div>© 2026 Sourboo Snacks LLP. Made for people who eat with intent.</div>
      <div style="display: flex; gap: 16px;">
        <span>FSSAI Certified</span><span>•</span><span>100% Vegetarian</span><span>•</span><span>Crafted in India</span>
      </div>
    </div>
  </footer>
  `;
}

function wrapLayout(content, title = 'Sourboo | Spicy Sour Gherkin Snacks & Pickled Snacks', forcePopup = false) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#E9ECD9">
  <title>${title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="stylesheet" href="/sourboo.css">
</head>
<body>
  ${renderNav()}
  <main id="MainContent">
    ${content}
  </main>
  ${renderCartDrawer()}
  ${renderPopupModal(forcePopup)}
  ${renderFooter()}
  <script src="/sourboo.js"></script>
  <script src="/flavor-matcher.js"></script>
</body>
</html>`;
}

// Page HTML generators
function getHomePageHtml() {
  const content = `
    <!-- 1. HERO -->
    <section class="sb-hero" aria-label="Hero Section">
      <div class="sb-hero-media-wrap">
        <img src="/hero-placeholder.webp" alt="Hands holding fresh crunchy Sourboo pickle slices" class="sb-hero-img" width="1600" height="900" fetchpriority="high" />
        <div class="sb-hero-overlay"></div>
        <div class="sb-hero-headline-container">
          <h1 class="sb-hero-h1">
            <span class="sb-hero-line1">
              <span class="font-coolvetica text-pickle">the </span>
              <span class="font-rascal text-pink">sour</span>
              <span class="font-coolvetica text-pickle">boo </span>
              <span class="font-rascal text-pink">way,</span>
            </span>
            <span class="sb-hero-line2">
              <span class="font-coolvetica text-pickle">cravings </span>
              <span class="font-rascal text-pink">comes </span>
              <span class="font-coolvetica text-pickle">first</span>
            </span>
          </h1>
        </div>
        <a href="#ProductShowcase" class="sb-hero-scroll-pill" aria-label="Scroll to products">
          <span>discover flavours</span><span>↓</span>
        </a>
      </div>
    </section>

    <!-- 2. PRODUCT SHOWCASE BANDS -->
    <div id="ProductShowcase" class="sb-product-bands-wrap">
      <!-- Side Eye Sour Band -->
      <article class="sb-product-band">
        <img src="/packagingbg.webp" alt="Product Background" class="sb-band-bg" width="1600" height="820" />
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" class="sb-band-wave-top"><path d="M0 0H1440V74C1310 96 1220 40 1096 62C908 95 730 120 538 74C348 30 184 100 0 74V0Z" fill="#E9ECD9" /></svg>
        <div class="sb-band-content">
          <a href="/products/sideeyesour">
            <img src="/sideeyepackage.png" alt="Side Eye Sour Packaging Strip" class="sb-band-pkg-strip" />
          </a>
          <div class="sb-band-cta-wrap">
            <a href="/products/sideeyesour" class="sb-brush-cta" style="background-image: url('/ctabg.svg'); color: #2F4918;">
              <span>side eye sour →</span>
              <span class="sb-brush-cta-price">₹399</span>
            </a>
          </div>
        </div>
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" class="sb-band-wave-bottom"><path d="M0 44C118 10 252 78 424 52C622 22 760 92 980 50C1154 16 1308 70 1440 44V160H0V44Z" fill="#E9ECD9" /></svg>
      </article>

      <!-- Tamarin' Tease Band -->
      <article class="sb-product-band">
        <img src="/packagingbg.webp" alt="Product Background" class="sb-band-bg" width="1600" height="820" />
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" class="sb-band-wave-top"><path d="M0 0H1440V74C1310 96 1220 40 1096 62C908 95 730 120 538 74C348 30 184 100 0 74V0Z" fill="#E9ECD9" /></svg>
        <div class="sb-band-content">
          <a href="/products/tamarintease">
            <img src="/tamarinpackage.png" alt="Tamarin' Tease Packaging Strip" class="sb-band-pkg-strip" />
          </a>
          <div class="sb-band-cta-wrap">
            <a href="/products/tamarintease" class="sb-brush-cta" style="background-image: url('/ctabg2.svg'); color: #26140A;">
              <span>tamarind tease →</span>
              <span class="sb-brush-cta-price">₹399</span>
            </a>
          </div>
        </div>
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" class="sb-band-wave-bottom"><path d="M0 44C118 10 252 78 424 52C622 22 760 92 980 50C1154 16 1308 70 1440 44V160H0V44Z" fill="#E9ECD9" /></svg>
      </article>
    </div>

    <!-- 3. BRAND INTRO (READ MY RANT) -->
    <section class="sb-intro-section" aria-label="Brand Introduction">
      <div class="sb-intro-headline">
        <h2 style="margin: 0;">
          <span class="font-coolvetica text-charcoal">sourboo made for people who eat </span>
          <span class="font-rascal text-charcoal">with intent</span>
        </h2>
      </div>
      <div class="sb-intro-split">
        <div class="sb-intro-visual">
          <img src="/readmyrant.webp" alt="Sourboo Crybaby Visual" loading="lazy" width="440" height="440" />
        </div>
        <div class="sb-intro-copy-wrap">
          <p class="sb-intro-p">
            who like flavour loud and immediate<br>
            food that fits into real moments
          </p>
          <a href="/pages/about" class="sb-rant-cta" aria-label="read my rant →">
            <span>read my rant →</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 4. POSTER PINBOARD -->
    <section class="sb-pinboard-section" aria-label="Campaign Poster Pinboard">
      <div id="HomePosterPinboard" class="sb-pinboard-canvas">
        <article class="sb-poster-1" style="position: absolute;">
          <span class="home-poster-pin" aria-hidden="true"></span>
          <div class="home-poster-card">
            <img src="/postcrysnack.webp" alt="Post Cry Snack poster" loading="lazy" width="700" height="980" />
          </div>
        </article>
        <article class="sb-poster-2" style="position: absolute;">
          <span class="home-poster-pin" aria-hidden="true"></span>
          <div class="home-poster-card">
            <img src="/latenightmunchies.webp" alt="Late Night Munchies poster" loading="lazy" width="700" height="980" />
          </div>
        </article>
        <article class="sb-poster-3" style="position: absolute;">
          <span class="home-poster-pin" aria-hidden="true"></span>
          <div class="home-poster-card">
            <img src="/girldinner.webp" alt="Girl Dinner But Sour poster" loading="lazy" width="700" height="980" />
          </div>
        </article>
        <article class="sb-poster-4" style="position: absolute;">
          <span class="home-poster-pin" aria-hidden="true"></span>
          <div class="home-poster-card">
            <img src="/deskcravings.webp" alt="Desk Cravings poster" loading="lazy" width="700" height="980" />
          </div>
        </article>
      </div>
    </section>

    <!-- 5. FRESH INGREDIENTS -->
    <section class="sb-fresh-section" aria-label="Fresh Ingredients">
      <div class="sb-fresh-container">
        <img src="/freshingredients.svg" alt="Fresh crunchy pickle slices and ingredients" class="sb-fresh-img" loading="lazy" width="1260" height="340" />
      </div>
    </section>

    <!-- 6. HORIZONTAL FOOD COLLAGE -->
    <section class="sb-gallery-section" aria-label="Food Collage Gallery">
      <div class="sb-gallery-scroll-container">
        <div class="sb-gallery-card sb-gal-1"><img src="/recipe-1.jpg" alt="Recipe 1" loading="lazy" /></div>
        <div class="sb-gallery-card sb-gal-2"><img src="/postcrysnack.webp" alt="Post cry snack" loading="lazy" /></div>
        <div class="sb-gallery-card sb-gal-3"><img src="/girldinner.webp" alt="Girl dinner" loading="lazy" /></div>
        <div class="sb-gallery-card sb-gal-4"><img src="/hangoverdetox.webp" alt="Hangover detox" loading="lazy" /></div>
        <div class="sb-gallery-card sb-gal-5"><img src="/deskcravings.webp" alt="Desk cravings" loading="lazy" /></div>
        <div class="sb-gallery-card sb-gal-6"><img src="/recipe-2.webp" alt="Recipe 2" loading="lazy" /></div>
        <div class="sb-gallery-card sb-gal-7"><img src="/latenightmunchies.webp" alt="Late night munchies" loading="lazy" /></div>
      </div>
    </section>

    <!-- 7. REVIEW PHONE -->
    <section id="HomeReviewPhoneSection" class="sb-review-section" aria-label="Customer Reviews">
      <div class="sb-review-stage">
        <article class="home-review-bubble sb-bubble-1"><p>addictive</p></article>
        <article class="home-review-bubble sb-bubble-2"><p>super punchy\n& sour</p></article>
        <div class="sb-review-phone-wrap">
          <img src="/review-phone.svg" alt="Phone showing what people say about Sourboo" loading="lazy" width="300" height="670" />
        </div>
        <article class="home-review-bubble sb-bubble-3"><p>perfect spicy</p></article>
        <article class="home-review-bubble sb-bubble-4"><p>instant fav</p></article>
      </div>
    </section>
  `;
  return wrapLayout(content, 'Sourboo | Spicy Sour Gherkin Snacks & Pickled Snacks');
}

function getShopPageHtml() {
  const cardsHtml = PRODUCTS.map(p => `
    <article class="sb-product-card" data-slug="${p.slug}">
      <a href="/products/${p.slug}" class="sb-card-img-wrap" aria-label="View ${p.name}">
        <img src="/${p.image}" alt="${p.name}" class="sb-card-img" loading="lazy" />
        <img src="/${p.lifestyle}" alt="${p.name} lifestyle" class="sb-card-lifestyle-img" loading="lazy" />
      </a>
      <h3 class="sb-card-title">
        <a href="/products/${p.slug}">
          <span class="font-coolvetica text-pickle">${p.name.split(' ')[0]} </span>
          <span class="font-rascal text-pink">${p.name.split(' ').slice(1).join(' ')}</span>
        </a>
      </h3>
      <p class="sb-card-hover-label">${p.hoverLabel}</p>
      <div class="sb-card-footer">
        <span class="sb-card-price">₹${p.price}</span>
        <button type="button" class="sb-quick-add-btn sb-add-to-cart-trigger" data-slug="${p.slug}" data-name="${p.name}" data-price="${p.price}" data-image="/${p.image}">
          Quick Add +
        </button>
      </div>
    </article>
  `).join('');

  const content = `
    <section class="sb-shop-hero" aria-label="Shop Catalog">
      <h1 class="sb-shop-title">
        <span class="font-coolvetica text-pickle">all </span>
        <span class="font-rascal text-pink">sour, </span>
        <span class="font-coolvetica text-pickle">zero </span>
        <span class="font-rascal text-pink">chill</span>
      </h1>
      <p class="font-schoolbell" style="font-size: clamp(1.4rem, 2.2vw, 2.2rem); max-width: 720px; margin: 0 auto; color: var(--sb-text-muted);">
        crunchy snackable pickled gherkins made for loud cravings
      </p>
    </section>

    <div class="sb-product-grid">
      ${cardsHtml}
    </div>

    <!-- FLAVOUR MATCHER -->
    <section id="ShopFlavorMatcher" class="sb-matcher-section" aria-label="Flavour Matcher Quiz">
      <div style="text-align: center; margin-bottom: 28px;">
        <h2 class="font-coolvetica text-pink" style="font-size: clamp(2.4rem, 4.8vw, 4.4rem); margin: 0; line-height: 1;">can't decide?</h2>
        <p class="font-schoolbell" style="font-size: clamp(1.8rem, 3.2vw, 2.8rem); margin: 6px 0 0; color: #2F4918;">let's match you with your flavour ;)</p>
        <div style="display: inline-flex; gap: 12px; margin-top: 20px; background: rgba(0,0,0,0.06); padding: 6px; border-radius: 9999px;">
          <button type="button" class="sb-matcher-switch-btn active sb-nav-pill" data-target-player="1" style="padding: 8px 24px; font-size: 1.25rem; color: #2F4918;">
            Player 1 (Khatta / Sour)
          </button>
          <button type="button" class="sb-matcher-switch-btn sb-nav-pill" data-target-player="2" style="padding: 8px 24px; font-size: 1.25rem; color: #2F4918;">
            Player 2 (Imli / Tangy)
          </button>
        </div>
      </div>

      <!-- Player 1 Card -->
      <div class="sb-matcher-player-card sb-matcher-player-1">
        <div class="sb-matcher-grid">
          <div style="text-align: center;">
            <img src="/player1.svg" alt="Player 1" style="width: min(70vw, 260px); margin: 0 auto 18px;" />
            <p class="font-schoolbell" style="font-size: 1.45rem; line-height: 1.2; color: #26140A;">if you dislike sweet snacks and add extra chilli without tasting</p>
            <div style="max-width: 380px; margin: 24px auto 0; text-align: left;">
              <div class="sb-flavor-meter-row"><div class="sb-flavor-meter-label"><span>spice</span><span>82%</span></div><div class="sb-meter-track"><div class="sb-meter-fill" data-fill="82" style="width: 82%;"></div></div></div>
              <div class="sb-flavor-meter-row"><div class="sb-flavor-meter-label"><span>sour</span><span>100%</span></div><div class="sb-meter-track"><div class="sb-meter-fill" data-fill="100" style="width: 100%; background: var(--sb-pickle-green);"></div></div></div>
              <div class="sb-flavor-meter-row"><div class="sb-flavor-meter-label"><span>crunch</span><span>68%</span></div><div class="sb-meter-track"><div class="sb-meter-fill" data-fill="68" style="width: 68%;"></div></div></div>
              <div class="sb-flavor-meter-row"><div class="sb-flavor-meter-label"><span>attitude</span><span>100%</span></div><div class="sb-meter-track"><div class="sb-meter-fill" data-fill="100" style="width: 100%; background: var(--sb-pink);"></div></div></div>
            </div>
          </div>
          <div style="background: #fff; border-radius: 32px; padding: 32px; text-align: center; border: 3px solid var(--sb-pickle-green);">
            <p class="font-coolvetica" style="font-size: 1.6rem; color: var(--sb-pickle-green); margin: 0 0 12px;">selection locked:</p>
            <img src="/side-eye-jar.svg" alt="Side Eye Sour" style="width: 180px; margin: 0 auto 16px;" />
            <h3 class="font-coolvetica text-pink" style="font-size: 2.4rem; margin: 0 0 8px;">SIDE EYE SOUR</h3>
            <p class="font-schoolbell" style="font-size: 1.3rem; color: var(--sb-text-muted); margin-bottom: 20px;">Lemon & Chaat Masala • ₹399</p>
            <a href="/products/sideeyesour" class="sb-brush-cta" style="background-image: url('/sideeyectabg.svg'); color: #FFF; width: 100%;">
              <span>get side eye sour ¬‿¬</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Player 2 Card -->
      <div class="sb-matcher-player-card sb-matcher-player-2" style="display: none;">
        <div class="sb-matcher-grid">
          <div style="text-align: center;">
            <img src="/player2.svg" alt="Player 2" style="width: min(70vw, 260px); margin: 0 auto 18px;" />
            <p class="font-schoolbell" style="font-size: 1.45rem; line-height: 1.2; color: #26140A;">you want tang? you handle spice! makes sense ;)</p>
            <div style="max-width: 380px; margin: 24px auto 0; text-align: left;">
              <div class="sb-flavor-meter-row"><div class="sb-flavor-meter-label"><span>spice</span><span>84%</span></div><div class="sb-meter-track"><div class="sb-meter-fill" data-fill="84" style="width: 84%;"></div></div></div>
              <div class="sb-flavor-meter-row"><div class="sb-flavor-meter-label"><span>tang</span><span>100%</span></div><div class="sb-meter-track"><div class="sb-meter-fill" data-fill="100" style="width: 100%; background: var(--sb-amber);"></div></div></div>
              <div class="sb-flavor-meter-row"><div class="sb-flavor-meter-label"><span>hit</span><span>84%</span></div><div class="sb-meter-track"><div class="sb-meter-fill" data-fill="84" style="width: 84%;"></div></div></div>
              <div class="sb-flavor-meter-row"><div class="sb-flavor-meter-label"><span>snaps</span><span>100%</span></div><div class="sb-meter-track"><div class="sb-meter-fill" data-fill="100" style="width: 100%; background: var(--sb-pink);"></div></div></div>
            </div>
          </div>
          <div style="background: #fff; border-radius: 32px; padding: 32px; text-align: center; border: 3px solid var(--sb-amber);">
            <p class="font-coolvetica" style="font-size: 1.6rem; color: var(--sb-amber); margin: 0 0 12px;">selection locked:</p>
            <img src="/tamarin-jar.svg" alt="Tamarin Tease" style="width: 180px; margin: 0 auto 16px;" />
            <h3 class="font-coolvetica text-pickle" style="font-size: 2.4rem; margin: 0 0 8px;">TAMARIN’ TEASE</h3>
            <p class="font-schoolbell" style="font-size: 1.3rem; color: var(--sb-text-muted); margin-bottom: 20px;">Tamarind & Chilli • ₹399</p>
            <a href="/products/tamarintease" class="sb-brush-cta" style="background-image: url('/tamarinteasectabg.svg'); color: #FFF; width: 100%;">
              <span>get tamarin tease →</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs -->
    <section class="sb-faq-section" aria-label="Frequently Asked Questions">
      <div style="text-align: center; margin-bottom: 36px;">
        <h2 class="font-coolvetica text-pink" style="font-size: clamp(2.4rem, 5vw, 4.4rem); margin: 0; line-height: 1;">
          get your <span class="font-rascal" style="color: var(--sb-pickle-green);">FAQs</span>
        </h2>
        <p class="font-schoolbell" style="font-size: clamp(1.6rem, 2.8vw, 2.6rem); margin: 6px 0 0; color: #1D1D1D;">of what you put in ur mouth</p>
      </div>
      <div class="sb-faq-list">
        <div class="sb-faq-item open">
          <button type="button" class="sb-faq-question-btn"><span>1. what is it made of?</span><span class="sb-faq-icon">+</span></button>
          <div class="sb-faq-answer"><p>sourboo is made using sliced gherkins, flavoured for that sharp, mouth-watering hit.</p></div>
        </div>
        <div class="sb-faq-item">
          <button type="button" class="sb-faq-question-btn"><span>2. is sourboo vegetarian?</span><span class="sb-faq-icon">+</span></button>
          <div class="sb-faq-answer"><p>yes!! 100% vegetarian.</p></div>
        </div>
        <div class="sb-faq-item">
          <button type="button" class="sb-faq-question-btn"><span>3. is this a pickle?</span><span class="sb-faq-icon">+</span></button>
          <div class="sb-faq-answer"><p>nope not in the traditional sense. it's not meant to sit quietly next to your meal.</p></div>
        </div>
        <div class="sb-faq-item">
          <button type="button" class="sb-faq-question-btn"><span>4. how do i eat it?</span><span class="sb-faq-icon">+</span></button>
          <div class="sb-faq-answer"><p>straight from the jar. no cooking needed. add it to chaat or snacks if you want but it holds its own.</p></div>
        </div>
        <div class="sb-faq-item">
          <button type="button" class="sb-faq-question-btn"><span>5. how should i store it?</span><span class="sb-faq-icon">+</span></button>
          <div class="sb-faq-answer"><p>store in a cool, dry place and once opened, refrigerate and keep the lid closed properly.</p></div>
        </div>
      </div>
    </section>
  `;
  return wrapLayout(content, 'Shop Crunchy Pickles | Sourboo Store');
}

function getPdpPageHtml(slug) {
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const isTamarin = slug.includes('tamarin');

  const content = `
    <section class="sb-pdp-section" aria-label="Product Details">
      <div class="sb-pdp-grid">
        <div class="sb-pdp-gallery-col">
          <div class="sb-pdp-gallery-main">
            <img id="PdpMainImage" src="/${product.image}" alt="${product.name}" width="600" height="600" />
          </div>
          <div class="sb-pdp-thumbs">
            <button type="button" class="sb-pdp-thumb active" data-full-src="/${product.image}">
              <img src="/${product.image}" alt="Jar" />
            </button>
            <button type="button" class="sb-pdp-thumb" data-full-src="/${product.lifestyle}">
              <img src="/${product.lifestyle}" alt="Lifestyle" />
            </button>
            <button type="button" class="sb-pdp-thumb" data-full-src="/fridge.webp">
              <img src="/fridge.webp" alt="Fridge" />
            </button>
          </div>
        </div>

        <div class="sb-pdp-info-col">
          <h1 class="sb-pdp-title">
            <span class="font-coolvetica text-pickle">${product.name.split(' ')[0]} </span>
            <span class="font-rascal text-pink">${product.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p class="sb-pdp-price">₹${product.price}</p>
          <p class="font-schoolbell" style="font-size: 1.45rem; line-height: 1.2; color: var(--sb-text-dark); margin: 0 0 20px;">
            ${product.hoverLabel}
          </p>

          <div style="background: rgba(255, 255, 136, 0.4); border-left: 4px solid var(--sb-pickle-green); padding: 12px 16px; border-radius: 8px; margin-bottom: 24px;">
            <p class="font-coolvetica" style="font-size: 1.15rem; color: var(--sb-pickle-dark); margin: 0;">
              ★ Pre-orders only. Dispatched within 2-4 working days. Delivery timelines vary by location.
            </p>
          </div>

          <div class="sb-pdp-qty-row">
            <div class="sb-qty-picker">
              <button type="button" id="PdpQtyDec" class="sb-qty-btn">-</button>
              <input type="text" id="PdpQuantityInput" value="1" readonly class="sb-qty-value" />
              <button type="button" id="PdpQtyInc" class="sb-qty-btn">+</button>
            </div>
            <button type="button" class="sb-pdp-add-cta sb-add-to-cart-trigger" data-slug="${product.slug}" data-name="${product.name}" data-price="${product.price}" data-image="/${product.image}">
              Add to Cart →
            </button>
          </div>

          <!-- 3 Handwritten Tabs -->
          <div class="sb-pdp-tabs-wrap">
            <div class="sb-tab-buttons-row">
              <button type="button" class="sb-tab-btn active" data-tab="TabInJar" style="background-image: url('/inthejarbg.svg');">In the jar</button>
              <button type="button" class="sb-tab-btn" data-tab="TabOnTongue" style="background-image: url('/onthetonguebg.svg');">On the tongue</button>
              <button type="button" class="sb-tab-btn" data-tab="TabAfterOpening" style="background-image: url('/afteropeningbg.svg');">After opening</button>
            </div>

            <div id="TabInJar" class="sb-tab-panel active">
              <h3 class="font-coolvetica text-pickle" style="font-size: 1.4rem; margin: 0 0 10px;">${product.name}</h3>
              <p style="margin: 0 0 12px;"><strong>Quantity:</strong> 350 grams (Snackable pickled gherkins)</p>
              <p style="margin: 0;"><strong>Ingredients:</strong><br>${product.ingredients}</p>
            </div>

            <div id="TabOnTongue" class="sb-tab-panel">
              <p style="margin: 0; font-size: 1.35rem; line-height: 1.3; white-space: pre-line;">${product.tongue}</p>
            </div>

            <div id="TabAfterOpening" class="sb-tab-panel">
              <p style="margin: 0; font-size: 1.35rem; line-height: 1.3; white-space: pre-line;">${product.storage}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  return wrapLayout(content, `${product.name} | Sourboo`);
}

function getAboutPageHtml() {
  const content = `
    <article class="sb-about-section" aria-label="Our Story">
      <!-- Chapter 1 -->
      <div class="sb-about-hero-grid">
        <div class="sb-about-cover-wrap">
          <img src="/about-cover.JPG" alt="Sakshi, Founder" width="680" height="840" />
        </div>
        <div>
          <h1 class="font-coolvetica text-pink" style="font-size: clamp(2.6rem, 5.5vw, 5rem); line-height: 0.94; margin: 0 0 16px;">hi i am sakshi,</h1>
          <p class="font-schoolbell text-pickle" style="font-size: clamp(1.8rem, 3.2vw, 3rem); line-height: 1.1; margin: 0 0 24px;">and i am really glad you are here</p>
          <p class="font-schoolbell" style="font-size: clamp(1.35rem, 2vw, 1.8rem); line-height: 1.25; color: var(--sb-text-dark);">
            if u are here, i am assuming, you like sour or curious enough to try it.
          </p>
        </div>
      </div>

      <!-- Chapter 2 -->
      <div style="margin: 80px 0; text-align: center;">
        <h2 class="font-coolvetica text-pink" style="font-size: clamp(2rem, 4vw, 3.8rem); max-width: 900px; margin: 0 auto 36px; line-height: 1.05;">
          I've always been (annoyingly) obsessed with flavours.
        </h2>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 24px;">
          <img src="/section-two-1.svg" alt="Mixing drinks" style="width: min(88vw, 320px); border-radius: 20px;" />
          <img src="/section-two-2.svg" alt="Tasting everything" style="width: min(88vw, 320px); border-radius: 20px;" />
          <img src="/section-two-3.svg" alt="Food journey" style="width: min(88vw, 320px); border-radius: 20px;" />
        </div>
        <p class="font-schoolbell" style="font-size: clamp(1.4rem, 2.4vw, 2.2rem); max-width: 780px; margin: 32px auto 0;">
          spent 5 years around food and drinks from london bar shifts to a 9-5 desk job in India.
        </p>
      </div>

      <!-- Chapter 3 -->
      <div style="margin: 90px 0; text-align: center;">
        <h2 class="font-coolvetica text-pickle" style="font-size: clamp(2.4rem, 4.8vw, 4.4rem); margin: 0 0 20px;">different lives, same cravings</h2>
        <div class="sb-tongue-map-wrap">
          <img src="/section-three-tongue.svg" alt="Tongue diagram" style="width: 100%; height: auto;" />
          <div class="sb-tongue-callout" style="top: 14%; left: 10%;">→ India loves chaaat</div>
          <div class="sb-tongue-callout" style="top: 42%; right: 4%;">→ India loves flavour</div>
          <div class="sb-tongue-callout" style="bottom: 16%; left: 12%;">→ India loves that sour & spicy hit</div>
        </div>
      </div>

      <!-- Chapter 4 -->
      <div style="margin: 80px 0; text-align: center;">
        <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 30px;">
          <span class="sb-brush-cta" style="background-image: url('/boldbg.svg'); color: #fff;">BOLD</span>
          <span class="sb-brush-cta" style="background-image: url('/spicybg.svg'); color: #fff;">spicy</span>
          <span class="sb-brush-cta" style="background-image: url('/sourbg.svg'); color: #fff;">sour</span>
        </div>
        <p class="font-schoolbell" style="font-size: clamp(1.5rem, 2.5vw, 2.4rem); max-width: 720px; margin: 0 auto 40px; color: var(--sb-text-muted);">
          but doesn't want to feel weighed down after snacking.
        </p>
        <h3 class="font-coolvetica text-pink" style="font-size: clamp(2rem, 3.8vw, 3.6rem); margin: 0 0 20px;">MY BIGGEST ISSUE?</h3>
        <p class="font-schoolbell" style="font-size: clamp(1.6rem, 2.8vw, 2.6rem); margin: 0 0 32px;">Sour was always treated like a side.</p>
        <div style="display: flex; justify-content: center; align-items: center; gap: 40px; flex-wrap: wrap;">
          <div><img src="/lemonsqueze.gif" alt="Lemon squeeze" style="width: 140px; border-radius: 50%;" /><p class="font-schoolbell" style="font-size: 1.25rem;">A squeeze here.</p></div>
          <div><img src="/spoonofpickle.gif" alt="Spoon of pickle" style="width: 140px; border-radius: 50%;" /><p class="font-schoolbell" style="font-size: 1.25rem;">A spoon of pickle there.</p></div>
        </div>
      </div>

      <!-- Chapter 5 -->
      <div style="margin: 90px 0; text-align: center;">
        <img src="/paper-tear.svg" alt="Paper tear" style="width: 100%; margin-bottom: 30px;" />
        <p class="font-schoolbell text-pickle" style="font-size: clamp(1.8rem, 3vw, 2.8rem);">Introducing</p>
        <img src="/logo.svg" alt="Sourboo logo" style="width: 240px; margin: 0 auto 16px;" />
        <img src="/tagline.svg" alt="Tagline" style="width: 320px; margin: 0 auto 28px;" />
        <p class="font-schoolbell" style="font-size: clamp(1.6rem, 2.6vw, 2.6rem); max-width: 820px; margin: 0 auto 16px; line-height: 1.2;">
          sour first snack, made for people who don't eat quietly.<br>for women who love loud flavours, strong opinions, and fully indulging.
        </p>
      </div>

      <!-- Chapter 6 -->
      <div style="margin-top: 80px; text-align: center;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; max-width: 1100px; margin: 0 auto 40px;">
          <img src="/section-six-top-1.webp" alt="Tasting 1" style="border-radius: 20px; width: 100%; aspect-ratio: 4/3; object-fit: cover;" />
          <img src="/section-six-top-2.webp" alt="Tasting 2" style="border-radius: 20px; width: 100%; aspect-ratio: 4/3; object-fit: cover;" />
          <img src="/section-six-top-3.webp" alt="Tasting 3" style="border-radius: 20px; width: 100%; aspect-ratio: 4/3; object-fit: cover;" />
        </div>
        <div style="max-width: 580px; margin: 0 auto; background: var(--sb-bg-yellow); border: 3px solid var(--sb-pickle-green); border-radius: 28px; padding: 36px 30px;">
          <h3 class="font-schoolbell text-pink" style="font-size: 2.2rem; margin: 0 0 14px;">hellooo</h3>
          <p class="font-schoolbell" style="font-size: 1.45rem; line-height: 1.3; margin: 0 0 18px;">
            i am sakshi the founder of sourboo.<br><br>we are hosting our next tasting pop-up soon! come through and make some sour faces with us.
          </p>
          <p class="font-schoolbell text-pink" style="font-size: 1.6rem; margin: 0;">xx</p>
        </div>
      </div>
    </article>
  `;
  return wrapLayout(content, 'Our Story | Sourboo');
}

function getContactPageHtml() {
  const content = `
    <main style="min-height: 80vh; background: var(--sb-bg-yellow); color: var(--sb-pink); padding: 120px 24px 80px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h1 class="font-coolvetica" style="font-size: clamp(3rem, 7vw, 6rem); line-height: 0.94; margin: 0 0 20px;">Contact</h1>
        <p class="font-coolvetica" style="font-size: clamp(1.5rem, 2.8vw, 3rem); line-height: 1.2; max-width: 900px; margin-bottom: 40px;">
          For collabs, stockists, events, order support, and all things Sourboo.
        </p>
        <div style="display: flex; flex-direction: column; gap: 32px;">
          <article>
            <h2 class="font-coolvetica" style="font-size: 1.8rem; margin: 0 0 8px;">COMPANY NAME</h2>
            <p class="font-coolvetica" style="font-size: 2.4rem; margin: 0;">Sourboo Snacks LLP</p>
          </article>
          <article>
            <h2 class="font-coolvetica" style="font-size: 1.8rem; margin: 0 0 8px;">MAIL</h2>
            <a href="mailto:cravings@sourboo.com" class="font-coolvetica" style="font-size: 2.4rem; text-decoration: underline;">cravings@sourboo.com</a>
          </article>
          <article>
            <h2 class="font-coolvetica" style="font-size: 1.8rem; margin: 0 0 8px;">PHONE NUMBER</h2>
            <a href="tel:+918120202060" class="font-coolvetica" style="font-size: 2.4rem; text-decoration: underline;">+91 8120202060</a>
          </article>
          <article>
            <h2 class="font-coolvetica" style="font-size: 1.8rem; margin: 0 0 14px;">CONNECT WITH US</h2>
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <a href="https://www.instagram.com/eatsourboo/" target="_blank" class="sb-brush-cta" style="background-image: url('/ctabg.svg'); color: #2F4918; font-size: 1.4rem;">Instagram (@eatsourboo)</a>
              <a href="https://chat.whatsapp.com/L9YSdLAYGfuEke1zXhvoWN" target="_blank" class="sb-brush-cta" style="background-image: url('/ctabg2.svg'); color: #26140A; font-size: 1.4rem;">WhatsApp Community</a>
            </div>
          </article>
        </div>
      </div>
    </main>
  `;
  return wrapLayout(content, 'Contact Us | Sourboo');
}

function getLegalPageHtml(title, body) {
  const content = `
    <main style="min-height: 80vh; background: var(--sb-pink); color: var(--sb-bg-yellow); padding: 120px 24px 80px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h1 class="font-coolvetica" style="font-size: clamp(3rem, 7vw, 6rem); line-height: 0.94; margin: 0 0 36px;">${title}</h1>
        <div class="font-coolvetica" style="font-size: clamp(1.35rem, 2.2vw, 2.4rem); line-height: 1.35; white-space: pre-line;">
          ${body}
        </div>
      </div>
    </main>
  `;
  return wrapLayout(content, `${title} | Sourboo`);
}

// Server router
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // 1. API: Popup Leads POST
  if (pathname === '/api/popup-leads' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Lead saved successfully!' }));
    });
    return;
  }

  // 2. Static Asset delivery (look in shopify-theme/assets)
  const cleanAssetPath = pathname.replace(/^\/assets\//, '/').replace(/^\//, '');
  const assetFilePath = path.join(ASSETS_DIR, cleanAssetPath);

  if (fs.existsSync(assetFilePath) && fs.statSync(assetFilePath).isFile()) {
    const mime = getMime(assetFilePath);
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'public, max-age=3600'
    });
    fs.createReadStream(assetFilePath).pipe(res);
    return;
  }

  // 3. HTML Pages
  if (pathname === '/' || pathname === '/home') {
    const forcePopup = parsedUrl.searchParams.get('popup') === 'true';
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getHomePageHtml());
    return;
  }

  if (pathname === '/popup' || pathname === '/popup/coupon') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(wrapLayout('<div style="padding: 100px 20px; text-align: center;"><h1 class="font-coolvetica text-pink">Personality Quiz Active</h1></div>', 'Sourboo Personality Quiz', true));
    return;
  }

  if (pathname === '/collections/all' || pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getShopPageHtml());
    return;
  }

  if (pathname.startsWith('/products/') || pathname.startsWith('/product/')) {
    const slug = pathname.split('/').pop();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getPdpPageHtml(slug));
    return;
  }

  if (pathname === '/pages/about' || pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getAboutPageHtml());
    return;
  }

  if (pathname === '/pages/contact' || pathname === '/contact' || pathname === '/pages/join-us' || pathname === '/join') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getContactPageHtml());
    return;
  }

  if (pathname.includes('shipping')) {
    const body = `All orders are processed within 2–4 business days after payment confirmation.
Metro cities: 3–5 business days after dispatch.
Non-metro locations: 5–8 business days after dispatch.
Flat shipping of ₹100 applies nationwide.`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLegalPageHtml('Shipping Policy', body));
    return;
  }

  if (pathname.includes('refund')) {
    const body = `If you receive a damaged package, please contact us within 48 hours of delivery with supporting photographs at cravings@sourboo.com.
Perishable food items cannot be returned once opened, but replacements are provided for broken seals.`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLegalPageHtml('Refund Policy', body));
    return;
  }

  if (pathname.includes('privacy')) {
    const body = `Sourboo Snacks LLP values your privacy. We collect customer emails and phone numbers solely for order fulfilment, delivery notifications, and exclusive sour perks. No spam, ever.`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLegalPageHtml('Privacy Policy', body));
    return;
  }

  if (pathname.includes('terms')) {
    const body = `By using the Sourboo website, you agree to our terms of service. Products are subject to availability and pre-order batch releases.`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLegalPageHtml('Terms & Conditions', body));
    return;
  }

  // 404 Fallback
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(wrapLayout('<div style="padding: 140px 20px; text-align: center;"><h1 class="font-coolvetica text-pink">404 - craving not found :(</h1><p><a href="/" style="text-decoration: underline;">Return home</a></p></div>', '404 | Sourboo'));
});

server.listen(PORT, () => {
  console.log(`Sourboo Interactive Preview Server running at http://localhost:${PORT}`);
});
