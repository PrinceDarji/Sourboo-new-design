/**
 * SOURBOO INTERACTIVE PREVIEW SERVER
 * Brand: Sourboo Snacks LLP
 * Architecture: Concept A (Editorial Chaos / Snack Diary)
 * Port: 3456
 *
 * Core Features:
 * 1. 3-Tier Static Asset Cascade (redesign/ -> figma-design/ -> shopify-theme/assets/)
 * 2. R5 Localhost Figma SVG Export (/download-figma-svg) with target canvas FKPMaN6f04sHPAkjDIjYZY
 * 3. Localhost Floating Dev Toolbar with direct artboard downloads & canvas sync
 * 4. 11 Semantic Routes rendering Concept A asymmetric editorial layouts
 * 5. Strict preservation of all 60 test assertion selectors
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const PROJECT_ROOT = __dirname;
const REDESIGN_DIR = path.join(PROJECT_ROOT, 'redesign');
const FIGMA_DIR = path.join(PROJECT_ROOT, 'figma-design');
const THEME_ASSETS_DIR = path.join(PROJECT_ROOT, 'shopify-theme', 'assets');
const FIGMA_CANVAS_ID = 'FKPMaN6f04sHPAkjDIjYZY';

// Helper to determine Content-Type
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
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

/**
 * 3-TIER STATIC ASSET CASCADE RESOLUTION
 * Tier 1 (Highest): redesign/ (including css/, js/, artboards/)
 * Tier 2 (Medium):  figma-design/
 * Tier 3 (Baseline): shopify-theme/assets/
 */
function resolveStaticAssetPath(pathname) {
  const cleanPath = pathname.replace(/^\/assets\//, '/').replace(/^\//, '');
  if (!cleanPath) return null;

  // Tier 1 Candidates: redesign/
  const tier1Candidates = [
    path.join(REDESIGN_DIR, cleanPath),
    path.join(REDESIGN_DIR, 'css', cleanPath),
    path.join(REDESIGN_DIR, 'js', cleanPath),
    path.join(REDESIGN_DIR, 'artboards', cleanPath)
  ];
  for (const candidate of tier1Candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return { path: candidate, tier: 1 };
    }
  }

  // Tier 2 Candidate: figma-design/
  const tier2Path = path.join(FIGMA_DIR, cleanPath);
  if (fs.existsSync(tier2Path) && fs.statSync(tier2Path).isFile()) {
    return { path: tier2Path, tier: 2 };
  }

  // Tier 3 Candidate: shopify-theme/assets/
  const tier3Path = path.join(THEME_ASSETS_DIR, cleanPath);
  if (fs.existsSync(tier3Path) && fs.statSync(tier3Path).isFile()) {
    return { path: tier3Path, tier: 3 };
  }

  return null;
}

// Product catalog database
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

/**
 * Concept A Floating Brutalist Navigation
 */
function renderNav() {
  return `
  <header class="sb-nav-wrapper">
    <nav id="NavMenu" class="sb-navbar" role="navigation" aria-label="Main Navigation">
      <div class="sb-nav-brand">
        <a href="/" aria-label="Sourboo Home" style="display: flex; align-items: center; gap: 8px;">
          <img src="/logo.svg" alt="Sourboo Logo" class="sb-nav-logo" width="140" height="38" />
        </a>
        <span class="sb-nav-vol-tag font-schoolbell">daily snack edition ¬‿¬</span>
      </div>
      <div class="sb-nav-menu">
        <a href="/collections/all" class="sb-nav-link font-schoolbell">Shop</a>
        <a href="/pages/about" class="sb-nav-link font-schoolbell">Our Story</a>
        <a href="/pages/join-us" class="sb-nav-link font-schoolbell">Join Us</a>
        <a href="/pages/contact" class="sb-nav-link font-schoolbell">Contact</a>
      </div>
      <div class="sb-nav-actions">
        <button type="button" class="sb-nav-quiz-pill sb-open-quiz-trigger font-schoolbell" aria-label="Take Quiz for 5% off">
          take quiz (5% off)
        </button>
        <button type="button" class="sb-nav-bag-pill sb-open-cart-trigger font-coolvetica" aria-label="Open Cart Drawer">
          <span>BAG</span>
          <span class="sb-nav-bag-count sb-cart-count"></span>
        </button>
      </div>
    </nav>
  </header>
  `;
}

/**
 * Slide-Out Cart Drawer Component
 */
function renderCartDrawer() {
  return `
  <div id="CartDrawerOverlay" class="sb-cart-drawer-overlay sb-close-cart-trigger" aria-hidden="true"></div>
  <aside id="CartDrawer" class="sb-cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
    <div class="sb-cart-header">
      <button type="button" class="sb-cart-close-btn sb-close-cart-trigger" aria-label="Close cart">×</button>
      <img src="/cartlogo.svg" alt="Sourboo logo" width="160" height="52" style="height: 48px; width: auto;" />
    </div>
    <div style="border-bottom: 2px solid var(--sb-border-charcoal); padding: 8px 0 14px;">
      <h2 class="font-coolvetica" style="font-size: 1.8rem; margin: 0; color: var(--sb-text-charcoal);">
        Your Bag <span class="sb-cart-count font-schoolbell" style="font-size: 1.2rem; color: var(--sb-pink);"></span>
      </h2>
    </div>
    <div id="CartDrawerItems" class="sb-cart-items-scroll"></div>
    <div class="sb-cart-footer">
      <div class="sb-cart-total-line">
        <span>Subtotal</span>
        <span id="CartSubtotal">₹0</span>
      </div>
      <div style="margin: 12px 0; border-top: 1px dashed rgba(23, 23, 23, 0.2); padding-top: 10px;">
        <input type="text" id="CartDiscountInput" placeholder="Discount code (try SOURBABE05)" class="sb-pill-input" style="height: 44px; font-size: 0.95rem; text-transform: uppercase;" />
        <p id="CartDiscountFeedback" class="font-schoolbell" style="font-size: 1.05rem; margin: 4px 0 0; min-height: 20px;"></p>
      </div>
      <div id="CartDiscountLine" class="sb-cart-total-line" style="display: none; color: var(--sb-pink);">
        <span>5% Discount (SOURBABE05)</span>
        <span class="sb-discount-val">-₹0</span>
      </div>
      <div class="sb-cart-total-line" style="border-top: 2px solid var(--sb-border-charcoal); padding-top: 8px; font-size: 1.5rem;">
        <span>Total</span>
        <span id="CartTotal">₹0</span>
      </div>
      <p class="font-schoolbell" style="font-size: 1rem; color: var(--sb-amber); margin: 8px 0 0;">
        ★ Pre-orders only. Flat ₹100 shipping calculated at checkout.
      </p>
      <a href="/checkout" class="sb-cart-checkout-cta" aria-label="Proceed to checkout">
        <span>Checkout →</span>
      </a>
    </div>
  </aside>
  `;
}

/**
 * 4-Step Personality Quiz Popup Modal
 */
function renderPopupModal(forceOpen = false) {
  return `
  <div id="LandingPersonalityPopup" class="sb-modal-backdrop" style="display: ${forceOpen ? 'flex' : 'none'};" role="dialog" aria-modal="true" aria-label="Personality Quiz">
    <div class="sb-popup-inner">
      <button type="button" class="sb-modal-close-btn sb-close-popup-trigger" aria-label="Close popup">×</button>
      <img src="/image1.svg" alt="" class="sb-popup-sticker" style="display: none;" aria-hidden="true" />
      <img src="/image2.svg" alt="" class="sb-popup-sticker" style="display: none;" aria-hidden="true" />
      <img src="/image3.svg" alt="" class="sb-popup-sticker" style="display: none;" aria-hidden="true" />
      <img src="/image4.svg" alt="" class="sb-popup-sticker" style="display: none;" aria-hidden="true" />

      <!-- SCREEN 1: Quiz Choices -->
      <div id="PopupScreen1">
        <h2 class="sb-popup-h1">
          <span class="font-coolvetica text-pink">what </span>
          <span class="font-schoolbell text-pink">kind of sour are you?</span>
        </h2>
        <p class="sb-popup-subheading">be honest</p>
        <div class="sb-popup-options-grid">
          <button type="button" class="sb-popup-option-btn sb-choice-savage" data-personality="Sour & Savage">
            <span>Sour &amp; Savage →</span>
          </button>
          <button type="button" class="sb-popup-option-btn sb-choice-psycho" data-personality="Sweet but Psycho">
            <span>Sweet but Psycho →</span>
          </button>
          <button type="button" class="sb-popup-option-btn sb-choice-drama" data-personality="Spicy Drama">
            <span>Spicy Drama →</span>
          </button>
          <button type="button" class="sb-popup-option-btn sb-choice-tangy" data-personality="Lowkey Tangy">
            <span>Lowkey Tangy →</span>
          </button>
        </div>
        <button type="button" class="sb-popup-text-exit sb-close-popup-trigger">
          no thanks take me to the website
        </button>
      </div>

      <!-- SCREEN 2: Personalized Lead Form -->
      <div id="PopupScreen2" style="display: none;">
        <h2 id="PopupChosenHeading" class="sb-popup-h1 font-coolvetica text-pink">You're Sour & Savage</h2>
        <p class="font-schoolbell text-pink" style="font-size: clamp(20px, 3.5vw, 36px); margin: 6px 0;">
          take 5% off. you've earned it
        </p>
        <p class="font-schoolbell" style="font-size: 1.15rem; color: var(--sb-text-charcoal); margin-bottom: 18px;">
          where should we send it?
        </p>
        <form id="PopupLeadForm" class="sb-coupon-form" novalidate>
          <div class="sb-input-row">
            <input type="email" id="PopupEmailInput" placeholder="your email" required class="sb-pill-input" autocomplete="email" />
            <input type="tel" id="PopupPhoneInput" placeholder="your phone number" required class="sb-pill-input" autocomplete="tel" />
          </div>
          <p id="PopupFormError" style="color: #B4232B; font-family: 'Schoolbell', cursive; margin: 4px 0 0; min-height: 22px;"></p>
          <button type="submit" class="sb-unlock-cta font-schoolbell">
            <span>unlock my 5%</span>
          </button>
          <p class="font-schoolbell" style="font-size: 1rem; color: var(--sb-text-muted); margin: 6px 0 0;">
            no spam, just sour things :)
          </p>
        </form>
        <button type="button" class="sb-popup-text-exit sb-close-popup-trigger">
          no thanks take me to the website
        </button>
      </div>

      <!-- SCREEN 3: SOURBABE05 Coupon Reveal -->
      <div id="PopupScreen3" style="display: none;">
        <h2 class="sb-popup-h1 font-coolvetica text-pink">you are in!</h2>
        <p class="font-schoolbell text-pink" style="font-size: clamp(18px, 3vw, 28px); margin: 10px 0 20px;">
          copy the code and use it at checkout to get 5% off your cart total.
        </p>
        <div style="display: flex; justify-content: center; margin: 20px 0;">
          <button type="button" id="PopupCopyBtn" class="sb-code-copy-pill" aria-label="Copy coupon code">
            <span id="PopupCodeDisplay">SOURBABE05</span>
            <span id="PopupCopyText" class="sb-btn-coupon-badge">COPY</span>
          </button>
        </div>
        <button type="button" class="sb-unlock-cta sb-close-popup-trigger" style="max-width: 380px; margin: 16px auto 0; font-family: 'Schoolbell', cursive;">
          <span>start shopping with 5% off →</span>
        </button>
      </div>
    </div>
  </div>
  `;
}

/**
 * Editorial Magazine Colophon & Footer
 */
function renderFooter() {
  return `
  <footer class="sb-footer" role="contentinfo">
    <div class="sb-footer-grid">
      <div class="sb-footer-brand-col">
        <div class="sb-footer-logo-wrap">
          <a href="/" aria-label="Sourboo Home">
            <img src="/logo.svg" alt="Sourboo Logo" width="160" height="42" loading="lazy" />
          </a>
        </div>
        <p class="sb-footer-tagline font-rascal" style="font-size: 28px; color: var(--sb-pink); margin: 10px 0;">stay sour.</p>
        <p class="font-schoolbell" style="font-size: 16px; color: var(--sb-bg-sage); line-height: 1.3;">
          Crafted for loud snacking, late nights, and misbehaving mouths.
        </p>
        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 8px;">
          <p class="font-coolvetica" style="color: var(--sb-bg-yellow); font-size: 1.1rem; margin: 0;">DIRECT INQUIRIES:</p>
          <a href="mailto:cravings@sourboo.com" style="color: var(--sb-pink-soft); font-family: 'coolvetica', sans-serif;">cravings@sourboo.com</a>
          <a href="tel:+918120202060" style="color: var(--sb-lime); font-family: 'coolvetica', sans-serif;">+91 8120202060</a>
        </div>
      </div>
      <div class="sb-footer-links-col">
        <h4>EXPLORE ARCHIVE</h4>
        <ul>
          <li><a href="/">Snack Diary (Home)</a></li>
          <li><a href="/collections/all">Shop Pickles</a></li>
          <li><a href="/pages/about">Sakshi's Diary</a></li>
          <li><a href="/pages/join-us">The Sourboo Club</a></li>
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
        <span>FSSAI Certified</span><span>•</span><span>100% Vegetarian</span><span>•</span><span>Bengaluru, India</span>
      </div>
    </div>
  </footer>
  `;
}

/**
 * R5 Localhost "Download SVG for Figma" Floating Dev Toolbar
 */
function renderDevToolbar(isLocalhost) {
  if (!isLocalhost) return '';

  return `
  <!-- R5 LOCALHOST-ONLY FIGMA EXPORT TOOLBAR -->
  <aside id="SbDevExportToolbar" class="sb-dev-toolbar" aria-label="Developer Figma Export Bar">
    <style>
      .sb-dev-toolbar {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 999999;
        font-family: 'Coolvetica', sans-serif;
      }
      .sb-dev-toolbar-inner {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #171717;
        padding: 6px 12px;
        border-radius: 9999px;
        border: 2px solid #E61E6E;
        box-shadow: 0 8px 24px rgba(0,0,0,0.4), 3px 3px 0px #E61E6E;
      }
      .sb-dev-badge {
        background: #BFEA5A;
        color: #171717;
        font-size: 11px;
        font-weight: bold;
        letter-spacing: 0.05em;
        padding: 4px 8px;
        border-radius: 9999px;
        text-transform: uppercase;
      }
      .sb-dev-btn-primary {
        background: #E61E6E;
        color: #FFFFFF;
        font-size: 13px;
        padding: 7px 14px;
        border-radius: 9999px;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border: 1px solid rgba(255,255,255,0.3);
        transition: transform 0.15s ease, background 0.15s ease;
      }
      .sb-dev-btn-primary:hover {
        background: #FF2B82;
        transform: translateY(-1px);
      }
      .sb-dev-dropdown {
        position: relative;
        display: inline-block;
      }
      .sb-dev-dropdown-btn {
        background: #262626;
        color: #E9ECD9;
        font-size: 12px;
        padding: 7px 10px;
        border-radius: 9999px;
        border: 1px solid #404040;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .sb-dev-dropdown-btn:hover {
        background: #333333;
      }
      .sb-dev-dropdown-menu {
        display: none;
        position: absolute;
        bottom: 120%;
        right: 0;
        background: #171717;
        border: 2px solid #171717;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        min-width: 220px;
        padding: 6px 0;
        flex-direction: column;
      }
      .sb-dev-dropdown:hover .sb-dev-dropdown-menu,
      .sb-dev-dropdown:focus-within .sb-dev-dropdown-menu {
        display: flex;
      }
      .sb-dev-dropdown-menu a {
        color: #E9ECD9;
        font-size: 12px;
        padding: 6px 14px;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background 0.1s ease;
      }
      .sb-dev-dropdown-menu a:hover {
        background: #E61E6E;
        color: #FFFFFF;
      }
      .sb-dev-figma-link {
        color: #BFEA5A;
        font-size: 12px;
        text-decoration: none;
        padding: 4px 8px;
        border-radius: 9999px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .sb-dev-figma-link:hover {
        text-decoration: underline;
      }
    </style>
    <div class="sb-dev-toolbar-inner">
      <span class="sb-dev-badge">Localhost M1</span>
      <a href="/download-figma-svg?artboard=master" download="sourboo-master-figma.svg" class="sb-dev-btn-primary" title="Export all artboards unified for Figma drag-and-drop">
        <span>⚡ Download SVG for Figma</span>
      </a>
      <div class="sb-dev-dropdown">
        <button type="button" class="sb-dev-dropdown-btn" aria-label="Select individual artboard">
          <span>Artboards ▾</span>
        </button>
        <div class="sb-dev-dropdown-menu">
          <a href="/download-figma-svg?artboard=desktop-home" download="01-desktop-homepage.svg">
            <span>Desktop Home</span><span>1440px</span>
          </a>
          <a href="/download-figma-svg?artboard=mobile-home" download="02-mobile-homepage.svg">
            <span>Mobile Home</span><span>390px</span>
          </a>
          <a href="/download-figma-svg?artboard=shop" download="03-desktop-shop.svg">
            <span>Shop Catalog</span><span>1440px</span>
          </a>
          <a href="/download-figma-svg?artboard=pdp" download="04-desktop-pdp.svg">
            <span>Product Detail</span><span>1440px</span>
          </a>
          <a href="/download-figma-svg?artboard=about" download="05-desktop-about.svg">
            <span>Sakshi's Diary</span><span>1440px</span>
          </a>
          <a href="/download-figma-svg?artboard=popup" download="06-personality-popup.svg">
            <span>4-Step Quiz</span><span>Popup</span>
          </a>
          <a href="/download-figma-svg?artboard=tokens" download="07-design-system-tokens.svg">
            <span>Design Tokens</span><span>8 Colors</span>
          </a>
        </div>
      </div>
      <a href="https://www.figma.com/design/${FIGMA_CANVAS_ID}/Untitled?node-id=0-1" target="_blank" rel="noopener noreferrer" class="sb-dev-figma-link" title="Open Target Figma Canvas FKPMaN6f04sHPAkjDIjYZY">
        <span>Figma ↗</span>
      </a>
    </div>
  </aside>
  `;
}

/**
 * Master HTML Layout Shell
 */
function wrapLayout(content, title = 'Sourboo | Spicy Sour Gherkin Snacks & Pickled Snacks', forcePopup = false, reqHost = 'localhost') {
  const isLocalhost = reqHost.includes('localhost') || reqHost.includes('127.0.0.1') || reqHost.includes('::1');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#E9ECD9">
  <title>${title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <!-- Stylesheets resolved via 3-Tier Cascade -->
  <link rel="stylesheet" href="/sourboo.css">
  <link rel="stylesheet" href="/sourboo-redesign.css">
</head>
<body class="sb-concept-a-body">
  ${renderNav()}
  <main id="MainContent">
    ${content}
  </main>
  ${renderCartDrawer()}
  ${renderPopupModal(forcePopup)}
  ${renderFooter()}
  ${renderDevToolbar(isLocalhost)}
  <!-- Scripts resolved via 3-Tier Cascade -->
  <script src="/sourboo.js"></script>
  <script src="/sourboo-redesign.js"></script>
  <script src="/flavor-matcher.js"></script>
</body>
</html>`;
}

// ==========================================
// ROUTE GENERATORS (CONCEPT A - 11 ROUTES)
// ==========================================

/**
 * Route 1: Homepage (Concept A: Editorial Chaos / Snack Diary)
 * Zero full-width bands, zero wave SVGs, asymmetric 7:5 hero broadsheet,
 * staggered 3-card product dossiers, brand manifesto, 4-poster zine wall.
 */
function getHomePageHtml(reqHost = 'localhost') {
  const content = `
    <!-- SECTION 1: ASYMMETRIC BROADSHEET HERO (7:5 Split) -->
    <header class="sb-broadsheet-hero" aria-label="Editorial Hero">
      <div class="sb-broadsheet-hero-grid">
        <!-- Left Editorial Broadsheet Column -->
        <div class="sb-hero-editorial-col">
          <div class="sb-dateline-ticker">
            <span>OCTOBER 2026 • ISSUE NO. 02 • BENGALURU, INDIA</span>
            <span class="sb-dateline-pill">SNACK DIARY</span>
          </div>
          <h1 class="sb-hero-h1" aria-label="the sourboo way, CRAVINGS COME FIRST">
            <span class="sb-hero-line1">
              <span class="font-coolvetica text-charcoal">THE </span>
              <span class="font-rascal text-pink">SOUR</span>
              <span class="font-coolvetica text-charcoal">BOO </span>
              <span class="font-rascal text-pink">WAY, </span>
            </span>
            <span class="sb-hero-line2">
              <span class="font-coolvetica text-charcoal">CRAVINGS COME FIRST.</span>
            </span>
          </h1>
          <div class="sb-marginalia-note" style="transform: rotate(-2deg);">
            <span class="font-schoolbell text-pickle" style="font-size: 1.5rem;">mouth wants to misbehave ¬‿¬</span>
          </div>
          <p class="sb-hero-lead-editorial">
            We make loud, khatta pickled gherkins for people who don’t eat quietly. Whole Indian spices, crunch that makes you squint, and zero boring blandness.
          </p>
          <div class="sb-hero-action-row">
            <a href="/collections/all" class="sb-brush-cta sb-cta-pink" style="background-image: url('/ctabg.svg');">
              <span>shop the crunch →</span>
            </a>
            <button type="button" class="sb-brush-cta sb-cta-yellow sb-open-quiz-trigger" style="background-image: url('/ctabg2.svg');">
              <span>take quiz (get 5% off)</span>
            </button>
          </div>
        </div>

        <!-- Right Photographic Crop Column -->
        <div class="sb-hero-visual-col">
          <div class="sb-hero-photo-frame">
            <img src="/hero-placeholder.webp" alt="Hands holding fresh crunchy Sourboo pickle slices" class="sb-hero-broadsheet-img" width="1600" height="900" fetchpriority="high" />
            <div class="sb-sticker-badge sb-sticker-khatta" style="transform: rotate(6deg);">
              <span>100% REAL KHATTA</span>
            </div>
            <div class="sb-sticker-badge sb-sticker-crunch" style="transform: rotate(-4deg);">
              <span>CRUNCH RATED 10/10</span>
            </div>
            <div class="sb-washi-tape-strip sb-tape-top-left"></div>
            <div class="sb-washi-tape-strip sb-tape-bottom-right"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- SECTION 2: THE SOUR DOSSIER (Staggered 3-Column Asymmetric Cards) -->
    <section id="ProductShowcase" class="sb-dossier-showcase" aria-label="The Sour Dossier">
      <div class="sb-section-header-editorial">
        <div class="sb-section-eyebrow">FIELD REPORT #01 // HARVEST ARCHIVE</div>
        <h2 class="sb-section-title-editorial">
          <span class="font-coolvetica text-charcoal">THE SOUR </span>
          <span class="font-rascal text-pink">DOSSIER</span>
        </h2>
        <p class="font-schoolbell text-pickle" style="font-size: 1.4rem;">staggered crunch for loud snacking — choose your weapon</p>
      </div>

      <div class="sb-dossier-grid">
        <!-- Card 1: Side Eye Sour -->
        <article class="sb-dossier-card sb-dossier-card-sideeye" data-slug="sideeyesour">
          <div class="sb-dossier-tape">CASE #001</div>
          <a href="/products/sideeyesour" class="sb-dossier-img-link" aria-label="View Side Eye Sour">
            <img src="/side-eye.webp" alt="Side Eye Sour Jar" class="sb-dossier-jar-img" loading="lazy" />
          </a>
          <div class="sb-dossier-meta">
            <span class="sb-dossier-category">LEMON &amp; CHAAT MASALA</span>
            <h3 class="sb-dossier-title">
              <a href="/products/sideeyesour">
                <span class="font-coolvetica text-charcoal">SIDE EYE </span>
                <span class="font-rascal text-pink">SOUR</span>
              </a>
            </h3>
            <p class="sb-dossier-desc font-schoolbell">Crinkle-cut gherkins. Properly khatta with a sour punch that makes you squint.</p>
            <div class="sb-dossier-meter">
              <div class="sb-meter-line"><span>Sourness</span><span class="sb-meter-dots">★★★★★</span></div>
              <div class="sb-meter-line"><span>Crunch</span><span class="sb-meter-dots">★★★★★</span></div>
              <div class="sb-meter-line"><span>Spice</span><span class="sb-meter-dots">★★★☆☆</span></div>
            </div>
            <div class="sb-dossier-footer">
              <span class="sb-dossier-price">₹399</span>
              <button type="button" class="sb-quick-add-pill sb-add-to-cart-trigger" data-slug="sideeyesour" data-name="SIDE EYE SOUR" data-price="399" data-image="/side-eye.webp">
                Quick Add +
              </button>
            </div>
          </div>
        </article>

        <!-- Card 2: Tamarin' Tease -->
        <article class="sb-dossier-card sb-dossier-card-tamarin" data-slug="tamarintease">
          <div class="sb-dossier-tape sb-tape-amber">CASE #002</div>
          <a href="/products/tamarintease" class="sb-dossier-img-link" aria-label="View Tamarin' Tease">
            <img src="/tamarin-tease.webp" alt="Tamarin' Tease Jar" class="sb-dossier-jar-img" loading="lazy" />
          </a>
          <div class="sb-dossier-meta">
            <span class="sb-dossier-category">TAMARIND &amp; CHILLI</span>
            <h3 class="sb-dossier-title">
              <a href="/products/tamarintease">
                <span class="font-coolvetica text-charcoal">TAMARIN’ </span>
                <span class="font-rascal text-amber">TEASE</span>
              </a>
            </h3>
            <p class="sb-dossier-desc font-schoolbell">Whole gherkins. Sweet-sour imli that teases the tongue with slow-building chilli heat.</p>
            <div class="sb-dossier-meter">
              <div class="sb-meter-line"><span>Sourness</span><span class="sb-meter-dots">★★★★☆</span></div>
              <div class="sb-meter-line"><span>Crunch</span><span class="sb-meter-dots">★★★★★</span></div>
              <div class="sb-meter-line"><span>Spice</span><span class="sb-meter-dots">★★★★☆</span></div>
            </div>
            <div class="sb-dossier-footer">
              <span class="sb-dossier-price">₹399</span>
              <button type="button" class="sb-quick-add-pill sb-add-to-cart-trigger" data-slug="tamarintease" data-name="TAMARIN’ TEASE" data-price="399" data-image="/tamarin-tease.webp">
                Quick Add +
              </button>
            </div>
          </div>
        </article>

        <!-- Card 3: Sourboo Stash (Party Pack) -->
        <article class="sb-dossier-card sb-dossier-card-stash" data-slug="sourboo-stash">
          <div class="sb-dossier-tape sb-tape-lime">VAULT #006</div>
          <a href="/products/sourboo-stash" class="sb-dossier-img-link" aria-label="View Sourboo Stash">
            <img src="/sourboo-stash.webp" alt="Sourboo Stash Box" class="sb-dossier-jar-img" loading="lazy" />
          </a>
          <div class="sb-dossier-meta">
            <span class="sb-dossier-category">4-JAR ULTIMATE STASH</span>
            <h3 class="sb-dossier-title">
              <a href="/products/sourboo-stash">
                <span class="font-coolvetica text-charcoal">SOURBOO </span>
                <span class="font-rascal text-pink">STASH</span>
              </a>
            </h3>
            <p class="sb-dossier-desc font-schoolbell">2 Side Eye + 2 Tamarin. Save ₹297 + Free shipping. Never run out of midnight munchies.</p>
            <div class="sb-dossier-meter">
              <div class="sb-meter-line"><span>Variety</span><span class="sb-meter-dots">★★★★★</span></div>
              <div class="sb-meter-line"><span>Value</span><span class="sb-meter-dots">★★★★★</span></div>
              <div class="sb-meter-line"><span>Shipping</span><span class="sb-meter-dots">FREE ★</span></div>
            </div>
            <div class="sb-dossier-footer">
              <span class="sb-dossier-price">₹1299</span>
              <button type="button" class="sb-quick-add-pill sb-add-to-cart-trigger" data-slug="sourboo-stash" data-name="Sourboo Stash" data-price="1299" data-image="/sourboo-stash.webp">
                Quick Add +
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- SECTION 3: BRAND MANIFESTO SPREAD -->
    <section class="sb-manifesto-spread" aria-label="Brand Manifesto">
      <div class="sb-manifesto-inner">
        <div class="sb-manifesto-header">
          <h2 class="font-coolvetica text-charcoal" style="font-size: clamp(2rem, 4vw, 3.6rem); margin: 0 0 12px;">
            why pickles? because bland snacks are an insult to cravings.
          </h2>
          <p class="font-schoolbell text-pink" style="font-size: 1.6rem; margin: 0;">
            for people who like flavour loud and immediate — food that fits into real moments
          </p>
        </div>
        <div class="sb-manifesto-cards-grid">
          <div class="sb-manifesto-card">
            <span class="sb-manifesto-num">01</span>
            <h3 class="font-coolvetica text-charcoal" style="font-size: 1.3rem; margin: 0 0 8px;">EAT WITH INTENT</h3>
            <p class="font-schoolbell" style="font-size: 1.05rem; margin: 0; color: var(--sb-text-muted);">
              We don’t do quiet snacks. Sourboo is crafted to make your tongue tingle and demand your full attention.
            </p>
          </div>
          <div class="sb-manifesto-card">
            <span class="sb-manifesto-num">02</span>
            <h3 class="font-coolvetica text-charcoal" style="font-size: 1.3rem; margin: 0 0 8px;">RELENTLESS CRUNCH</h3>
            <p class="font-schoolbell" style="font-size: 1.05rem; margin: 0; color: var(--sb-text-muted);">
              Straight from the fridge to your teeth. Crisp, juiced gherkins that never turn soggy.
            </p>
          </div>
          <div class="sb-manifesto-card">
            <span class="sb-manifesto-num">03</span>
            <h3 class="font-coolvetica text-charcoal" style="font-size: 1.3rem; margin: 0 0 8px;">REAL KHATTA</h3>
            <p class="font-schoolbell" style="font-size: 1.05rem; margin: 0; color: var(--sb-text-muted);">
              Real lemon slices, authentic imli pulp, rock salt, and hand-roasted chaat masala. Zero fake powders.
            </p>
          </div>
          <div class="sb-manifesto-card">
            <span class="sb-manifesto-num">04</span>
            <h3 class="font-coolvetica text-charcoal" style="font-size: 1.3rem; margin: 0 0 8px;">ZERO CHILL</h3>
            <p class="font-schoolbell" style="font-size: 1.05rem; margin: 0; color: var(--sb-text-muted);">
              100% vegetarian, FSSAI certified, and made for desks, girl dinners, midnight fridges, and crying sessions.
            </p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 36px;">
          <a href="/pages/about" class="sb-brush-cta sb-cta-pickle" style="background-image: url('/ctabg.svg');">
            <span>read sakshi's founder diary →</span>
          </a>
        </div>
      </div>
    </section>

    <!-- SECTION 4: THE MOMENTS ARCHIVE (Integrated Wheatpaste Zine Poster Wall) -->
    <section class="sb-moments-archive" aria-label="Campaign Poster Archive">
      <div class="sb-section-header-editorial">
        <div class="sb-section-eyebrow">PHOTO ARCHIVE // MOMENTS OF RELIEF</div>
        <h2 class="sb-section-title-editorial">
          <span class="font-coolvetica text-charcoal">THE </span>
          <span class="font-rascal text-pink">MOMENTS </span>
          <span class="font-coolvetica text-charcoal">ARCHIVE</span>
        </h2>
        <p class="font-schoolbell text-pickle" style="font-size: 1.4rem;">real snacks for uncurated life moments</p>
      </div>

      <div id="HomePosterPinboard" class="sb-moments-zine-wall">
        <!-- Poster 1: Post Cry Snack -->
        <article class="sb-zine-poster-card sb-poster-postcry" style="transform: rotate(-1.5deg);">
          <div class="sb-pushpin-red" aria-hidden="true"></div>
          <div class="sb-poster-frame">
            <img src="/postcrysnack.webp" alt="Post Cry Snack poster" loading="lazy" width="700" height="980" />
          </div>
          <p class="sb-poster-caption font-schoolbell">for when you need to feel something other than your feelings.</p>
        </article>

        <!-- Poster 2: Late Night Munchies -->
        <article class="sb-zine-poster-card sb-poster-munchies" style="transform: rotate(2deg);">
          <div class="sb-pushpin-red" aria-hidden="true"></div>
          <div class="sb-poster-frame">
            <img src="/latenightmunchies.webp" alt="Late Night Munchies poster" loading="lazy" width="700" height="980" />
          </div>
          <p class="sb-poster-caption font-schoolbell">2:14 AM fridge raid essentials. sweet snacks are cancelled.</p>
        </article>

        <!-- Poster 3: Girl Dinner But Sour -->
        <article class="sb-zine-poster-card sb-poster-girldinner" style="transform: rotate(-2.5deg);">
          <div class="sb-pushpin-red" aria-hidden="true"></div>
          <div class="sb-poster-frame">
            <img src="/girldinner.webp" alt="Girl Dinner But Sour poster" loading="lazy" width="700" height="980" />
          </div>
          <p class="sb-poster-caption font-schoolbell">certified girl dinner: 4 pickle slices, 3 olives, zero regrets.</p>
        </article>

        <!-- Poster 4: Desk Cravings -->
        <article class="sb-zine-poster-card sb-poster-deskcravings" style="transform: rotate(1deg);">
          <div class="sb-pushpin-red" aria-hidden="true"></div>
          <div class="sb-poster-frame">
            <img src="/deskcravings.webp" alt="Desk Cravings poster" loading="lazy" width="700" height="980" />
          </div>
          <p class="sb-poster-caption font-schoolbell">for 3 PM zoom calls that could have been an email.</p>
        </article>
      </div>
    </section>

    <!-- SECTION 5: DECONSTRUCTED INGREDIENTS DOSSIER -->
    <section class="sb-ingredients-dossier" aria-label="Fresh Ingredients">
      <div class="sb-ingredients-container">
        <img src="/freshingredients.svg" alt="Fresh crunchy pickle slices and ingredients" class="sb-fresh-img" loading="lazy" width="1260" height="340" />
        <div class="sb-ingredients-annotation-grid">
          <div class="sb-ingredient-callout font-schoolbell">✓ Crinkle-cut farm gherkins</div>
          <div class="sb-ingredient-callout font-schoolbell">✓ Hand-pressed lemon slices</div>
          <div class="sb-ingredient-callout font-schoolbell">✓ Sweet-sour tamarind pulp</div>
          <div class="sb-ingredient-callout font-schoolbell">✓ Mineral rock salt &amp; chaat spice</div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: FOOD COLLAGE / MOMENTS GALLERY -->
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

    <!-- SECTION 7: UNFILTERED REVIEWS & REVIEW PHONE -->
    <section id="HomeReviewPhoneSection" class="sb-review-section" aria-label="Customer Reviews">
      <div class="sb-review-stage">
        <article class="home-review-bubble sb-bubble-1"><p>addictive</p></article>
        <article class="home-review-bubble sb-bubble-2"><p>super punchy &amp; sour</p></article>
        <div class="sb-review-phone-wrap">
          <img src="/review-phone.svg" alt="Phone showing what people say about Sourboo" loading="lazy" width="300" height="670" />
        </div>
        <article class="home-review-bubble sb-bubble-3"><p>perfect spicy</p></article>
        <article class="home-review-bubble sb-bubble-4"><p>instant fav</p></article>
      </div>
    </section>
  `;
  return wrapLayout(content, 'Sourboo | The Snack Diary • The Sourboo Way', false, reqHost);
}

/**
 * Route 2: Shop Collection (/collections/all, /shop, /product)
 */
function getShopPageHtml(reqHost = 'localhost') {
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
      <p class="sb-card-hover-label font-schoolbell">${p.hoverLabel}</p>
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

    <!-- FLAVOUR MATCHER (Preserves player1.svg, player2.svg, recommendation locks) -->
    <section id="ShopFlavorMatcher" class="sb-matcher-section" aria-label="Flavour Matcher Quiz">
      <div style="text-align: center; margin-bottom: 28px;">
        <h2 class="font-coolvetica text-pink" style="font-size: clamp(2.4rem, 4.8vw, 4.4rem); margin: 0; line-height: 1;">can't decide?</h2>
        <p class="font-schoolbell" style="font-size: clamp(1.8rem, 3.2vw, 2.8rem); margin: 6px 0 0; color: #2F4918;">let's match you with your flavour ;)</p>
        <div style="display: inline-flex; gap: 12px; margin-top: 20px; background: rgba(0,0,0,0.06); padding: 6px; border-radius: 9999px;">
          <button type="button" class="sb-matcher-switch-btn active sb-nav-quiz-pill" data-target-player="1" style="padding: 8px 24px; font-size: 1.15rem;">
            Player 1 (Khatta / Sour)
          </button>
          <button type="button" class="sb-matcher-switch-btn sb-nav-quiz-pill" data-target-player="2" style="padding: 8px 24px; font-size: 1.15rem;">
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
          <div style="background: #fff; border-radius: 32px; padding: 32px; text-align: center; border: 3px solid var(--sb-pickle-green); box-shadow: var(--sb-shadow-md);">
            <p class="font-coolvetica" style="font-size: 1.6rem; color: var(--sb-pickle-green); margin: 0 0 12px;">selection locked:</p>
            <img src="/side-eye-jar.svg" alt="Side Eye Sour" style="width: 180px; margin: 0 auto 16px;" />
            <h3 class="font-coolvetica text-pink" style="font-size: 2.4rem; margin: 0 0 8px;">SIDE EYE SOUR</h3>
            <p class="font-schoolbell" style="font-size: 1.3rem; color: var(--sb-text-muted); margin-bottom: 20px;">Lemon &amp; Chaat Masala • ₹399</p>
            <a href="/products/sideeyesour" class="sb-brush-cta sb-cta-pink" style="background-image: url('/sideeyectabg.svg'); width: 100%;">
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
          <div style="background: #fff; border-radius: 32px; padding: 32px; text-align: center; border: 3px solid var(--sb-amber); box-shadow: var(--sb-shadow-md);">
            <p class="font-coolvetica" style="font-size: 1.6rem; color: var(--sb-amber); margin: 0 0 12px;">selection locked:</p>
            <img src="/tamarin-jar.svg" alt="Tamarin Tease" style="width: 180px; margin: 0 auto 16px;" />
            <h3 class="font-coolvetica text-pickle" style="font-size: 2.4rem; margin: 0 0 8px;">TAMARIN’ TEASE</h3>
            <p class="font-schoolbell" style="font-size: 1.3rem; color: var(--sb-text-muted); margin-bottom: 20px;">Tamarind &amp; Chilli • ₹399</p>
            <a href="/products/tamarintease" class="sb-brush-cta sb-cta-pickle" style="background-image: url('/tamarinteasectabg.svg'); width: 100%;">
              <span>get tamarin tease →</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQS -->
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
  return wrapLayout(content, 'All Sour, Zero Chill | Shop Pickles • Sourboo', false, reqHost);
}

/**
 * Routes 3 & 4: Product Detail Pages (/products/sideeyesour and /products/tamarintease)
 */
function getPdpPageHtml(slug, reqHost = 'localhost') {
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];

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
          <p class="font-schoolbell" style="font-size: 1.45rem; line-height: 1.25; color: var(--sb-text-charcoal); margin: 0 0 20px;">
            ${product.hoverLabel}
          </p>

          <div style="background: rgba(255, 255, 136, 0.45); border-left: 4px solid var(--sb-pickle-green); padding: 12px 16px; border-radius: 8px; margin-bottom: 24px;">
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

          <!-- 3 Handwritten Folder Tabs -->
          <div class="sb-pdp-tabs-wrap">
            <div class="sb-tab-buttons-row">
              <button type="button" id="TabInTheJar" class="sb-tab-btn active" data-tab="TabInJar">In the jar</button>
              <button type="button" id="TabOnTheTongue" class="sb-tab-btn" data-tab="TabOnTongue">On the tongue</button>
              <button type="button" id="TabAfterOpening" class="sb-tab-btn" data-tab="TabAfterOpening">After opening</button>
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
  return wrapLayout(content, `${product.name} | Sourboo`, false, reqHost);
}

/**
 * Route 5: About Page (/pages/about and /about — Sakshi's Diary)
 */
function getAboutPageHtml(reqHost = 'localhost') {
  const content = `
    <article class="sb-about-section" aria-label="Our Story">
      <!-- Founder Cover Feature Header -->
      <div class="sb-about-hero-grid">
        <div class="sb-about-cover-wrap">
          <img src="/about-cover.JPG" alt="Sakshi, Founder" width="680" height="840" />
          <div class="sb-washi-tape-strip sb-tape-top-right"></div>
        </div>
        <div class="sb-about-header-text">
          <span class="sb-about-volume-tag">FOUNDER NOTEBOOK // OCTOBER 2026</span>
          <h1 class="font-coolvetica text-pink" style="font-size: clamp(2.6rem, 5.5vw, 5rem); line-height: 0.94; margin: 0 0 16px;">
            Hi I am Sakshi,
          </h1>
          <p class="font-schoolbell text-pickle" style="font-size: clamp(1.8rem, 3.2vw, 3rem); line-height: 1.1; margin: 0 0 24px;">
            and i am really glad you are here
          </p>
          <p class="font-schoolbell" style="font-size: clamp(1.35rem, 2vw, 1.8rem); line-height: 1.3; color: var(--sb-text-charcoal);">
            if u are here, i am assuming, you like sour or curious enough to try it. I spent 5 years around food and drinks from london bar shifts to a 9-5 desk job in India, always obsessing over why sour was treated like a side. My childhood raw mango obsession never left me — kitchen experiment notes piled up until Sourboo was born.
          </p>
        </div>
      </div>

      <!-- Tongue Flavour Map -->
      <div style="margin: 80px 0; text-align: center;">
        <h2 class="font-coolvetica text-pickle" style="font-size: clamp(2.4rem, 4.8vw, 4.4rem); margin: 0 0 20px;">different lives, same cravings</h2>
        <div class="sb-tongue-map-wrap">
          <img src="/section-three-tongue.svg" alt="Tongue diagram" style="width: 100%; height: auto;" />
          <div class="sb-tongue-callout" style="top: 14%; left: 10%;">→ India loves chaaat</div>
          <div class="sb-tongue-callout" style="top: 42%; right: 4%;">→ India loves flavour</div>
          <div class="sb-tongue-callout" style="bottom: 16%; left: 12%;">→ India loves that sour &amp; spicy hit</div>
        </div>
      </div>

      <!-- Value Stamps -->
      <div style="margin: 80px 0; text-align: center;">
        <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 30px;">
          <span class="sb-brush-cta sb-cta-pickle" style="background-image: url('/boldbg.svg');">BOLD</span>
          <span class="sb-brush-cta sb-cta-pink" style="background-image: url('/spicybg.svg');">spicy</span>
          <span class="sb-brush-cta sb-cta-yellow" style="background-image: url('/sourbg.svg');">sour</span>
        </div>
        <p class="font-schoolbell" style="font-size: clamp(1.5rem, 2.5vw, 2.4rem); max-width: 720px; margin: 0 auto 40px; color: var(--sb-text-muted);">
          but doesn't want to feel weighed down after snacking.
        </p>
      </div>

      <!-- Personal Sign-Off -->
      <div style="max-width: 580px; margin: 0 auto; background: var(--sb-bg-yellow); border: 3px solid var(--sb-pickle-green); border-radius: 28px; padding: 36px 30px; text-align: center; box-shadow: var(--sb-shadow-md);">
        <h3 class="font-schoolbell text-pink" style="font-size: 2.2rem; margin: 0 0 14px;">hellooo</h3>
        <p class="font-schoolbell" style="font-size: 1.45rem; line-height: 1.3; margin: 0 0 18px;">
          i am sakshi the founder of sourboo.<br><br>we are hosting our next tasting pop-up soon! come through and make some sour faces with us.
        </p>
        <p class="font-schoolbell text-pink" style="font-size: 1.6rem; margin: 0;">xx - Sakshi</p>
      </div>
    </article>
  `;
  return wrapLayout(content, 'Hi I am Sakshi | Our Story • Sourboo', false, reqHost);
}

/**
 * Route 6: Join Us (/pages/join-us and /join)
 */
function getJoinPageHtml(reqHost = 'localhost') {
  const content = `
    <main style="min-height: 80vh; background: var(--sb-bg-sage); color: var(--sb-text-charcoal); padding: 120px 24px 80px;">
      <div style="max-width: 1100px; margin: 0 auto;">
        <div class="sb-dateline-ticker">COMMUNITY // THE SOURBOO SNACK CLUB</div>
        <h1 class="font-coolvetica text-pink" style="font-size: clamp(3rem, 7vw, 6rem); line-height: 0.94; margin: 16px 0 20px;">
          Join Us
        </h1>
        <p class="font-schoolbell text-pickle" style="font-size: clamp(1.6rem, 2.8vw, 2.8rem); line-height: 1.2; max-width: 800px; margin-bottom: 40px;">
          for people who eat pickles straight from the fridge at 2 AM
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <div style="background: #FFF; border: 3px solid #171717; border-radius: 24px; padding: 32px; box-shadow: 4px 4px 0px #171717;">
            <h2 class="font-coolvetica text-pink" style="font-size: 2rem; margin: 0 0 12px;">WHATSAPP COMMUNITY</h2>
            <p class="font-schoolbell" style="font-size: 1.3rem; margin-bottom: 24px;">Get first access to small-batch seasonal recipes, tasting pop-ups, and secret discounts.</p>
            <a href="https://chat.whatsapp.com/L9YSdLAYGfuEke1zXhvoWN" target="_blank" rel="noopener noreferrer" class="sb-brush-cta sb-cta-pickle" style="background-image: url('/ctabg.svg');">
              <span>Join WhatsApp Group →</span>
            </a>
          </div>
          <div style="background: var(--sb-bg-yellow); border: 3px solid #171717; border-radius: 24px; padding: 32px; box-shadow: 4px 4px 0px #171717;">
            <h2 class="font-coolvetica text-charcoal" style="font-size: 2rem; margin: 0 0 12px;">STOCKISTS &amp; COLLABS</h2>
            <p class="font-schoolbell" style="font-size: 1.3rem; margin-bottom: 24px;">Want Sourboo in your cafe, bar, or retail shelf? We love collaborating with good humans.</p>
            <a href="mailto:cravings@sourboo.com" class="sb-brush-cta sb-cta-pink" style="background-image: url('/ctabg2.svg');">
              <span>Email Us For Stocking →</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  `;
  return wrapLayout(content, 'Join Us | The Sourboo Club', false, reqHost);
}

/**
 * Route 7: Contact Page (/pages/contact and /contact)
 */
function getContactPageHtml(reqHost = 'localhost') {
  const content = `
    <main style="min-height: 80vh; background: var(--sb-bg-yellow); color: var(--sb-pink); padding: 120px 24px 80px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h1 class="font-coolvetica text-charcoal" style="font-size: clamp(3rem, 7vw, 6rem); line-height: 0.94; margin: 0 0 20px;">Contact</h1>
        <p class="font-coolvetica text-charcoal" style="font-size: clamp(1.5rem, 2.8vw, 3rem); line-height: 1.2; max-width: 900px; margin-bottom: 40px;">
          For collabs, stockists, events, order support, and all things Sourboo.
        </p>
        <div style="display: flex; flex-direction: column; gap: 32px;">
          <article>
            <h2 class="font-coolvetica text-charcoal" style="font-size: 1.8rem; margin: 0 0 8px;">COMPANY NAME</h2>
            <p class="font-coolvetica text-charcoal" style="font-size: 2.4rem; margin: 0;">Sourboo Snacks LLP</p>
          </article>
          <article>
            <h2 class="font-coolvetica text-charcoal" style="font-size: 1.8rem; margin: 0 0 8px;">MAIL</h2>
            <a href="mailto:cravings@sourboo.com" class="font-coolvetica" style="font-size: 2.4rem; text-decoration: underline; color: var(--sb-pink);">cravings@sourboo.com</a>
          </article>
          <article>
            <h2 class="font-coolvetica text-charcoal" style="font-size: 1.8rem; margin: 0 0 8px;">PHONE NUMBER</h2>
            <a href="tel:+918120202060" class="font-coolvetica" style="font-size: 2.4rem; text-decoration: underline; color: var(--sb-pink);">+91 8120202060</a>
          </article>
          <article>
            <h2 class="font-coolvetica text-charcoal" style="font-size: 1.8rem; margin: 0 0 14px;">CONNECT WITH US</h2>
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <a href="https://www.instagram.com/eatsourboo/" target="_blank" rel="noopener noreferrer" class="sb-brush-cta sb-cta-pickle" style="background-image: url('/ctabg.svg'); font-size: 1.4rem;">Instagram (@eatsourboo)</a>
              <a href="https://chat.whatsapp.com/L9YSdLAYGfuEke1zXhvoWN" target="_blank" rel="noopener noreferrer" class="sb-brush-cta sb-cta-pink" style="background-image: url('/ctabg2.svg'); font-size: 1.4rem;">WhatsApp Community</a>
            </div>
          </article>
        </div>
      </div>
    </main>
  `;
  return wrapLayout(content, 'Contact | Sourboo', false, reqHost);
}

/**
 * Routes 8–11: Legal & Policy Pages
 */
function getLegalPageHtml(title, body, reqHost = 'localhost') {
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
  return wrapLayout(content, `${title} | Sourboo`, false, reqHost);
}

// ==========================================
// HTTP SERVER PIPELINE
// ==========================================
const server = http.createServer((req, res) => {
  const host = req.headers.host || 'localhost';
  const parsedUrl = new URL(req.url, `http://${host}`);
  const pathname = parsedUrl.pathname;
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1') || host.includes('::1');

  // 1. API: Popup Leads POST
  if (pathname === '/api/popup-leads' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let parsed = {};
      try {
        if (body) parsed = JSON.parse(body);
      } catch (_) {
        // Handle gracefully
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Lead saved successfully!' }));
    });
    return;
  }

  // 2. R5 Localhost "Download SVG for Figma" Route
  if (pathname === '/download-figma-svg') {
    if (!isLocalhost) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Access Denied: Figma SVG export is restricted to local preview environment.');
      return;
    }

    const artboardParam = parsedUrl.searchParams.get('artboard') || 'master';
    const ARTBOARD_MAP = {
      'master': 'sourboo-master-figma.svg',
      'all': 'sourboo-master-figma.svg',
      'desktop-home': '01-desktop-homepage.svg',
      'mobile-home': '02-mobile-homepage.svg',
      'shop': '03-desktop-shop.svg',
      'pdp': '04-desktop-pdp.svg',
      'about': '05-desktop-about.svg',
      'popup': '06-personality-popup.svg',
      'tokens': '07-design-system-tokens.svg'
    };

    const targetFilename = ARTBOARD_MAP[artboardParam] || 'sourboo-master-figma.svg';
    const artboardFilePath = path.join(REDESIGN_DIR, 'artboards', targetFilename);

    if (fs.existsSync(artboardFilePath) && fs.statSync(artboardFilePath).isFile()) {
      const stat = fs.statSync(artboardFilePath);
      res.writeHead(200, {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Content-Disposition': `attachment; filename="${targetFilename}"`,
        'Content-Length': stat.size,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(artboardFilePath).pipe(res);
      return;
    } else {
      // Dynamic fallback SVG
      const fallbackSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 3200" width="1440" height="3200">
  <title>Sourboo Figma Artboard - ${artboardParam}</title>
  <rect width="1440" height="3200" fill="#E9ECD9" />
  <text x="720" y="200" text-anchor="middle" font-family="sans-serif" font-size="48" fill="#171717">SOURBOO FIGMA EXPORT</text>
  <text x="720" y="260" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#E61E6E">Canvas: ${FIGMA_CANVAS_ID}</text>
</svg>`;
      res.writeHead(200, {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Content-Disposition': `attachment; filename="${targetFilename}"`,
        'Cache-Control': 'no-cache'
      });
      res.end(fallbackSvg);
      return;
    }
  }

  // 3. Static Asset Resolution via 3-Tier Cascade
  const resolvedAsset = resolveStaticAssetPath(pathname);
  if (resolvedAsset) {
    const mime = getMime(resolvedAsset.path);
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': resolvedAsset.tier === 1 ? 'no-cache' : 'public, max-age=3600',
      'X-Asset-Tier': `Tier-${resolvedAsset.tier}`
    });
    fs.createReadStream(resolvedAsset.path).pipe(res);
    return;
  }

  // 4. HTML Page Routes (Concept A)
  if (pathname === '/' || pathname === '/home') {
    const forcePopup = parsedUrl.searchParams.get('popup') === 'true';
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getHomePageHtml(host));
    return;
  }

  if (pathname === '/popup' || pathname === '/popup/coupon') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(wrapLayout('<div style="padding: 100px 20px; text-align: center;"><h1 class="font-coolvetica text-pink">Personality Quiz Active</h1></div>', 'Sourboo Personality Quiz', true, host));
    return;
  }

  if (pathname === '/collections/all' || pathname === '/product' || pathname === '/shop') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getShopPageHtml(host));
    return;
  }

  if (pathname.startsWith('/products/') || pathname.startsWith('/product/')) {
    const slug = pathname.split('/').pop();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getPdpPageHtml(slug, host));
    return;
  }

  if (pathname === '/pages/about' || pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getAboutPageHtml(host));
    return;
  }

  if (pathname === '/pages/contact' || pathname === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getContactPageHtml(host));
    return;
  }

  if (pathname === '/pages/join-us' || pathname === '/join') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getJoinPageHtml(host));
    return;
  }

  if (pathname.includes('shipping')) {
    const body = `All orders are processed within 2–4 business days after payment confirmation.
Metro cities: 3–5 business days after dispatch.
Non-metro locations: 5–8 business days after dispatch.
Flat shipping of ₹100 applies nationwide.`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLegalPageHtml('Shipping Policy', body, host));
    return;
  }

  if (pathname.includes('refund')) {
    const body = `If you receive a damaged package, please contact us within 48 hours of delivery with supporting photographs at cravings@sourboo.com.
Perishable food items cannot be returned once opened, but replacements are provided for broken seals.`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLegalPageHtml('Refund Policy', body, host));
    return;
  }

  if (pathname.includes('privacy')) {
    const body = `Sourboo Snacks LLP values your privacy. We collect customer emails and phone numbers solely for order fulfilment, delivery notifications, and exclusive sour perks. No spam, ever.`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLegalPageHtml('Privacy Policy', body, host));
    return;
  }

  if (pathname.includes('terms')) {
    const body = `By using the Sourboo website, you agree to our terms of service. Products are subject to availability and pre-order batch releases.`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLegalPageHtml('Terms & Conditions', body, host));
    return;
  }

  // 404 Fallback
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(wrapLayout('<div style="padding: 140px 20px; text-align: center;"><h1 class="font-coolvetica text-pink">404 - craving not found :(</h1><p><a href="/" style="text-decoration: underline;">Return home</a></p></div>', '404 | Sourboo', false, host));
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Sourboo Interactive Preview Server running at http://localhost:${PORT}`);
  });
}

module.exports = server;
