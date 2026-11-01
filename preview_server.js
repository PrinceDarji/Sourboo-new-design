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
        <a href="/" aria-label="Sourboo Home">
          <img src="/logo.svg" alt="Sourboo Logo" class="sb-nav-logo" width="140" height="38" />
        </a>
      </div>
      <div class="sb-nav-menu">
        <a href="/collections/all" class="sb-nav-link">Shop</a>
        <a href="/pages/about" class="sb-nav-link">About</a>
        <a href="/pages/join-us" class="sb-nav-link">Join Us</a>
      </div>
      <div class="sb-nav-actions">
        <!-- Search Icon -->
        <a href="/collections/all" class="sb-nav-icon-btn" aria-label="Search products">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </a>
        <!-- Account Icon -->
        <a href="/pages/join-us" class="sb-nav-icon-btn" aria-label="User Account">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>
        <!-- Bag/Cart Icon Button -->
        <button type="button" class="sb-nav-bag-pill sb-open-cart-trigger" aria-label="Open Cart Drawer">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span class="sb-nav-bag-count sb-cart-count">0</span>
        </button>
      </div>
    </nav>
  </header>
  `;
}

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
          <span class="font-coolvetica text-pink">What </span>
          <span class="font-schoolbell text-pink">kind of sour are you?</span>
        </h2>
        <p class="sb-popup-subheading">Be honest</p>
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
          No thanks, take me to the website
        </button>
      </div>

      <!-- SCREEN 2: Personalized Lead Form -->
      <div id="PopupScreen2" style="display: none;">
        <h2 id="PopupChosenHeading" class="sb-popup-h1 font-coolvetica text-pink">You're Sour & Savage</h2>
        <p class="font-schoolbell text-pink" style="font-size: clamp(20px, 3.5vw, 36px); margin: 6px 0;">
          Take 5% off. You've earned it
        </p>
        <p class="font-schoolbell" style="font-size: 1.15rem; color: var(--sb-text-charcoal); margin-bottom: 18px;">
          Where should we send it?
        </p>
        <form id="PopupLeadForm" class="sb-coupon-form" novalidate>
          <div class="sb-input-row">
            <input type="email" id="PopupEmailInput" placeholder="Your email" required class="sb-pill-input" autocomplete="email" />
            <input type="tel" id="PopupPhoneInput" placeholder="Your phone number" required class="sb-pill-input" autocomplete="tel" />
          </div>
          <p id="PopupFormError" style="color: #B4232B; font-family: 'Schoolbell', cursive; margin: 4px 0 0; min-height: 22px;"></p>
          <button type="submit" class="sb-unlock-cta font-schoolbell">
            <span>Unlock my 5%</span>
          </button>
          <p class="font-schoolbell" style="font-size: 1rem; color: var(--sb-text-muted); margin: 6px 0 0;">
            No spam, just sour things :)
          </p>
        </form>
        <button type="button" class="sb-popup-text-exit sb-close-popup-trigger">
          No thanks, take me to the website
        </button>
      </div>

      <!-- SCREEN 3: SOURBABE05 Coupon Reveal -->
      <div id="PopupScreen3" style="display: none;">
        <h2 class="sb-popup-h1 font-coolvetica text-pink">You are in!</h2>
        <p class="font-schoolbell text-pink" style="font-size: clamp(18px, 3vw, 28px); margin: 10px 0 20px;">
          Copy the code and use it at checkout to get 5% off your cart total.
        </p>
        <div style="display: flex; justify-content: center; margin: 20px 0;">
          <button type="button" id="PopupCopyBtn" class="sb-code-copy-pill" aria-label="Copy coupon code">
            <span id="PopupCodeDisplay">SOURBABE05</span>
            <span id="PopupCopyText" class="sb-btn-coupon-badge">COPY</span>
          </button>
        </div>
        <button type="button" class="sb-unlock-cta sb-close-popup-trigger" style="max-width: 380px; margin: 16px auto 0; font-family: 'Schoolbell', cursive;">
          <span>Start shopping with 5% off →</span>
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
    <!-- ═══════════════════════════════════════════════════════
         SECTION 1: HERO (7:5 ASYMMETRIC BROADSHEET)
         ═══════════════════════════════════════════════════════ -->
    <header class="sb-hero-v3 sb-broadsheet-hero" aria-label="the sourboo way, CRAVINGS COME FIRST">
      <div class="sb-hero-v3-inner sb-broadsheet-hero-grid">
        <!-- Left Editorial Text Column -->
        <div class="sb-hero-text-col sb-hero-editorial-col">
          <div class="sb-dateline-ticker" aria-hidden="true" style="display:none;">
            <span>ISSUE NO. 03 • BENGALURU, INDIA</span>
            <span class="sb-dateline-pill">SNACK DIARY</span>
          </div>
          <div class="sb-hero-tagline-wrap">
            <span class="sb-hero-tagline font-schoolbell sb-marginalia-note">made for mouths that misbehave</span>
            <span class="sb-doodle-pink-bolt">⚡</span>
          </div>
          <h1 class="sb-hero-headline sb-hero-h1 font-coolvetica text-charcoal">
            Cravings<br>
            <span class="font-coolvetica text-charcoal">come first.</span><br>
            <span class="sb-hero-headline-accent font-coolvetica">Everything else can wait.</span>
          </h1>
          <div class="sb-hero-action-row sb-hero-cta-row">
            <a href="/collections/all" class="sb-hero-cta-primary sb-brush-cta sb-cta-pink">
              <span>Shop Pickles →</span>
            </a>
          </div>
        </div>

        <!-- Right Visual Photo Column -->
        <div class="sb-hero-visual-col sb-hero-photo-col">
          <!-- Hot Pink Spiky Sticker -->
          <div class="sb-sticker-starburst font-coolvetica">
            <span>SOUR.</span>
            <span>TANGY.</span>
            <span>UNFILTERED.</span>
          </div>
          <div class="sb-hero-photo-wrap">
            <img src="/hero-placeholder.webp" alt="Hands holding fresh crunchy Sourboo pickle slices" class="sb-hero-photo-img sb-hero-broadsheet-img" width="1600" height="900" fetchpriority="high" />
          </div>
        </div>
      </div>
    </header>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 2: WAVY TRUST RIBBON
         ═══════════════════════════════════════════════════════ -->
    <div class="sb-trust-ribbon-wrap">
      <div class="sb-trust-ribbon-inner">
        <div class="sb-trust-item">
          <span class="sb-trust-icon">🥒</span>
          <span>Small batch</span>
        </div>
        <div class="sb-trust-divider"></div>
        <div class="sb-trust-item">
          <span class="sb-trust-icon">🍃</span>
          <span>Real ingredients</span>
        </div>
        <div class="sb-trust-divider"></div>
        <div class="sb-trust-item">
          <span class="sb-trust-icon">🫙</span>
          <span>No boring pickles</span>
        </div>
        <div class="sb-trust-divider"></div>
        <div class="sb-trust-item">
          <span class="sb-trust-icon">⚡</span>
          <span>Big mood</span>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 3: THE PICKLE LINEUP (PRODUCT DOSSIER)
         ═══════════════════════════════════════════════════════ -->
    <section id="ProductShowcase" class="sb-lineup-section sb-dossier-showcase" aria-label="The Pickle Lineup">
      <div class="sb-section-eyebrow" style="display:none;">THE SOUR DOSSIER</div>
      <div class="sb-lineup-inner">
        <div class="sb-lineup-header-row">
          <div class="sb-lineup-badge-group">
            <div class="sb-lineup-cloud-badge font-rascal">
              The Pickle Lineup
            </div>
            <div class="sb-lineup-subtitle font-coolvetica">
              Six moods. One obsession— all things sour.
            </div>
          </div>
          <div class="sb-lineup-nav-arrows">
            <button type="button" class="sb-lineup-nav-btn" aria-label="Previous">‹</button>
            <button type="button" class="sb-lineup-nav-btn" aria-label="Next">›</button>
          </div>
        </div>

        <div class="sb-lineup-main-grid">
          <!-- Left Feature: Big Pink Hero Card -->
          <div class="sb-lineup-hero-card">
            <img src="/side-eye-jar.png" alt="Side Eye Sour Jar Big Feature" class="sb-lineup-hero-jar" loading="lazy" />
          </div>

          <!-- Right Grid: 3 Staggered Product Cards -->
          <div class="sb-dossier-grid sb-lineup-cards-row">
            <!-- Card 1: Side Eye Sour -->
            <article class="sb-dossier-card sb-product-card-v3" data-slug="sideeyesour">
              <a href="/products/sideeyesour" class="sb-card-img-stage bg-green" aria-label="View Side Eye Sour">
                <img src="/side-eye-jar.png" alt="Side Eye Sour" class="sb-dossier-jar-img sb-card-jar-img" loading="lazy" />
              </a>
              <div class="sb-card-info-wrap">
                <div class="sb-dossier-tape">CASE #001</div>
                <h3 class="sb-card-name sb-dossier-title font-coolvetica">
                  <a href="/products/sideeyesour">Side Eye Sour</a>
                </h3>
                <p class="sb-card-subtitle sb-dossier-desc font-schoolbell">The classic. Sharp, bold and a little rude.</p>
                <div class="sb-dossier-meter">
                  <div class="sb-meter-line"><span>Sourness</span><span>★★★★★</span></div>
                  <div class="sb-meter-line"><span>Crunch</span><span>★★★★★</span></div>
                </div>
                <div class="sb-card-buy-bar sb-dossier-footer">
                  <span class="sb-card-price sb-dossier-price font-coolvetica">₹349</span>
                  <button type="button" class="sb-card-add-btn sb-quick-add-pill sb-add-to-cart-trigger" data-slug="sideeyesour" data-name="SIDE EYE SOUR" data-price="349" data-image="/side-eye-jar.png">Add to cart</button>
                </div>
              </div>
            </article>

            <!-- Card 2: Tamarin' Tease -->
            <article class="sb-dossier-card sb-product-card-v3" data-slug="tamarintease">
              <a href="/products/tamarintease" class="sb-card-img-stage bg-pink" aria-label="View Tamarin' Tease">
                <img src="/tamarin-jar.png" alt="Tamarin' Tease" class="sb-dossier-jar-img sb-card-jar-img" loading="lazy" />
              </a>
              <div class="sb-card-info-wrap">
                <div class="sb-dossier-tape">CASE #002</div>
                <h3 class="sb-card-name sb-dossier-title font-coolvetica">
                  <a href="/products/tamarintease">Tamarin' Tease</a>
                </h3>
                <p class="sb-card-subtitle sb-dossier-desc font-schoolbell">Sweet. Tangy. Totally addictive.</p>
                <div class="sb-dossier-meter">
                  <div class="sb-meter-line"><span>Sourness</span><span>★★★★☆</span></div>
                  <div class="sb-meter-line"><span>Crunch</span><span>★★★★★</span></div>
                </div>
                <div class="sb-card-buy-bar sb-dossier-footer">
                  <span class="sb-card-price sb-dossier-price font-coolvetica">₹349</span>
                  <button type="button" class="sb-card-add-btn sb-quick-add-pill sb-add-to-cart-trigger" data-slug="tamarintease" data-name="TAMARIN' TEASE" data-price="349" data-image="/tamarin-jar.png">Add to cart</button>
                </div>
              </div>
            </article>

            <!-- Card 3: Tamarind Twins -->
            <article class="sb-dossier-card sb-product-card-v3" data-slug="tamarind-twins">
              <a href="/products/tamarind-twins" class="sb-card-img-stage bg-orange" aria-label="View Tamarind Twins">
                <img src="/tamarind-twins.webp" alt="Tamarind Twins" class="sb-dossier-jar-img sb-card-jar-img" loading="lazy" />
              </a>
              <div class="sb-card-info-wrap">
                <div class="sb-dossier-tape">VAULT #006</div>
                <h3 class="sb-card-name sb-dossier-title font-coolvetica">
                  <a href="/products/tamarind-twins">Tamarind Twins</a>
                </h3>
                <p class="sb-card-subtitle sb-dossier-desc font-schoolbell">Double the tamarind. Double the drama.</p>
                <div class="sb-dossier-meter">
                  <div class="sb-meter-line"><span>Sourness</span><span>★★★★★</span></div>
                  <div class="sb-meter-line"><span>Crunch</span><span>★★★★★</span></div>
                </div>
                <div class="sb-card-buy-bar sb-dossier-footer">
                  <span class="sb-card-price sb-dossier-price font-coolvetica">₹349</span>
                  <button type="button" class="sb-card-add-btn sb-quick-add-pill sb-add-to-cart-trigger" data-slug="tamarind-twins" data-name="Tamarind Twins" data-price="349" data-image="/tamarind-twins.webp">Add to cart</button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 4: CAMPAIGN POSTERS (MOMENTS ARCHIVE)
         ═══════════════════════════════════════════════════════ -->
    <section id="HomePosterPinboard" class="sb-moments-archive" aria-label="Campaign Poster Archive">
      <div class="sb-section-header-editorial">
        <h2 class="font-coolvetica text-charcoal" style="font-size: clamp(2rem, 3.5vw, 3.2rem); margin: 0 0 6px;">
          THE MOMENTS ARCHIVE
        </h2>
        <p class="font-schoolbell text-pickle" style="font-size: 1.35rem; margin: 0;">real snacks for uncurated life moments</p>
      </div>

      <div class="sb-moments-zine-wall sb-poster-strip-wrap">
        <!-- Poster 1: Post Cry Snack -->
        <article class="sb-zine-poster-card sb-poster-card-v3 sb-poster-postcry" style="transform: rotate(-1.5deg);">
          <div class="sb-pushpin-red" style="display:none;"></div>
          <div class="sb-poster-frame">
            <img src="/postcrysnack.webp" alt="Post Cry Snack poster" loading="lazy" width="900" height="1164" />
          </div>
          <p class="sb-poster-caption font-schoolbell">Not a meal, a moment.</p>
        </article>

        <!-- Poster 2: Late Night Munchies -->
        <article class="sb-zine-poster-card sb-poster-card-v3 sb-poster-munchies" style="transform: rotate(2deg);">
          <div class="sb-pushpin-red" style="display:none;"></div>
          <div class="sb-poster-frame">
            <img src="/latenightmunchies.webp" alt="Late Night Munchies poster" loading="lazy" width="900" height="1172" />
          </div>
          <p class="sb-poster-caption font-schoolbell">Snack irresponsibly.</p>
        </article>

        <!-- Poster 3: Girl Dinner But Sour -->
        <article class="sb-zine-poster-card sb-poster-card-v3 sb-poster-girldinner" style="transform: rotate(-2.5deg);">
          <div class="sb-pushpin-red" style="display:none;"></div>
          <div class="sb-poster-frame">
            <img src="/girldinner.webp" alt="Girl Dinner But Sour poster" loading="lazy" width="900" height="1048" />
          </div>
          <p class="sb-poster-caption font-schoolbell">Keep within reach.</p>
        </article>

        <!-- Poster 4: Desk Cravings -->
        <article class="sb-zine-poster-card sb-poster-card-v3 sb-poster-deskcravings" style="transform: rotate(1deg);">
          <div class="sb-pushpin-red" style="display:none;"></div>
          <div class="sb-poster-frame">
            <img src="/deskcravings.webp" alt="Desk Cravings poster" loading="lazy" width="1400" height="1981" />
          </div>
          <p class="sb-poster-caption font-schoolbell">Presented by Sourboo.</p>
        </article>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 5: REAL INGREDIENTS. ZERO DRAMA.
         ═══════════════════════════════════════════════════════ -->
    <section class="sb-ingredients-dossier sb-ingredients-v3" aria-label="Fresh Ingredients">
      <div class="sb-ingredients-v3-inner">
        <div class="sb-ingredients-text-wrap">
          <h2>
            Real<br>
            Ingredients.<br>
            <span class="sb-underline-pink-scribble">Zero Drama.</span>
          </h2>
        </div>
        <div class="sb-ingredients-stage-wrap">
          <img src="/freshingredients.svg" alt="Fresh crunchy cucumbers and spices" class="sb-cucumber-arc-img" loading="lazy" width="840" height="280" />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SECTION 6: CUSTOMER REVIEWS & SMARTPHONE MOCKUP
         ═══════════════════════════════════════════════════════ -->
    <section id="HomeReviewPhoneSection" class="sb-review-section sb-reviews-v3" aria-label="Customer Reviews">
      <div class="sb-reviews-v3-inner">
        <!-- Left: Grilled Cheese Photo -->
        <div class="sb-reviews-toast-col">
          <div class="sb-reviews-toast-frame">
            <img src="/recipe-1.jpg" alt="Sourboo pickles on crispy grilled cheese toast" loading="lazy" width="600" height="450" />
          </div>
        </div>

        <!-- Right: Reviews Header & Smartphone Display -->
        <div class="sb-reviews-phone-col">
          <div class="sb-reviews-header-block">
            <h2>
              People are pretty <span class="font-rascal text-pink">obsessed.</span>
            </h2>
          </div>
          <div class="sb-reviews-phone-mockup">
            <div class="sb-phone-pill-notch"></div>
            <div class="sb-phone-reviews-list">
              <div class="sb-phone-review-bubble">
                <p class="sb-phone-review-quote">"The perfect midnight snack!"</p>
                <div class="sb-phone-review-stars">★★★★★</div>
              </div>
              <div class="sb-phone-review-bubble">
                <p class="sb-phone-review-quote">"Tangy, crunchy and so addictive."</p>
                <div class="sb-phone-review-stars">★★★★★</div>
              </div>
              <div class="sb-phone-review-bubble">
                <p class="sb-phone-review-quote">"I wasn't a pickle person... now I'm a Sourboo person."</p>
                <div class="sb-phone-review-stars">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  return wrapLayout(content, 'Sourboo | The Snack Diary • The Sourboo Way', false, reqHost);
}

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
    <article class="sb-about-page-wrap" aria-label="Our Story">
      <!-- Part 1: Founder Feature Hero -->
      <section class="sb-about-hero-section">
        <div class="sb-about-hero-content">
          <span class="sb-about-eyebrow font-schoolbell">About Sourboo</span>
          <h1 class="sb-about-title font-coolvetica">
            The pickle project<br>
            that got<br>
            <span class="sb-about-highlight-pink font-coolvetica">out of hand.</span>
          </h1>
          <p class="sb-about-subhead font-schoolbell">
            Born from a serious love for tangy, punchy and slightly unhinged flavours.
          </p>
          <p class="sb-about-body-text">
            It started with late-night cravings, fridge experiments and a very serious question — why are good pickles so hard to find? Childhood raw mango obsessions never left us.
          </p>
          <p class="sb-about-body-text">
            So we made our own. Small batches, real ingredients and flavours that actually hit.
          </p>
        </div>
        <div class="sb-about-photo-frame">
          <img src="/about-cover.JPG" alt="Sourboo Founders eating crunchy pickles straight from jar" width="680" height="840" />
          <div class="sb-about-photo-annotation font-schoolbell">
            The Founders<br>(Also Chief Pickle Addicts)
          </div>
        </div>
      </section>

      <!-- Part 2: Value Props Soft Green Ribbon -->
      <section class="sb-about-props-bar" aria-label="Brand Pillars">
        <div class="sb-about-props-inner">
          <div class="sb-prop-item">
            <span style="font-size: 1.6rem;">🫙</span>
            <span>Big on Flavour</span>
          </div>
          <div class="sb-prop-item">
            <span style="font-size: 1.6rem;">🥒</span>
            <span>Real Ingredients</span>
          </div>
          <div class="sb-prop-item">
            <span style="font-size: 1.6rem;">⚡</span>
            <span>For Real Life Cravings</span>
          </div>
        </div>
      </section>

      <!-- Part 3: Our Story -->
      <section class="sb-about-story-section" aria-label="Our Origin">
        <div class="sb-story-photo-wrap">
          <div class="sb-story-tape"></div>
          <img src="/recipe-2.webp" alt="Sourboo pickle jar family on table" loading="lazy" width="600" height="450" style="border-radius: 8px;" />
          <img src="/eyes1.svg" alt="Cartoon eyes" style="width: 50px; position: absolute; bottom: 8px; left: 14px;" />
        </div>
        <div class="sb-story-content">
          <h2>
            <span class="sb-story-highlight-yellow font-rascal">Our Story</span>
          </h2>
          <p class="sb-about-body-text">
            It started with late-night cravings, fridge experiments and a very serious question – why are good pickles so hard to find?
          </p>
          <p class="sb-about-body-text">
            So we made our own. Small batches, real ingredients and flavours that actually hit.
          </p>
        </div>
      </section>

      <!-- Part 4: The Sourboo Way (3 Pillars) -->
      <section class="sb-about-pillars-section" aria-label="The Sourboo Way">
        <div class="sb-pillars-header">
          <h2 class="font-rascal">The Sourboo Way</h2>
        </div>
        <div class="sb-pillars-grid">
          <div class="sb-pillar-card">
            <div class="sb-pillar-icon">🥒</div>
            <h3 class="sb-pillar-title font-coolvetica">Simple, real ingredients</h3>
            <p class="sb-pillar-desc font-schoolbell">Farm-fresh gherkins, whole spices, and sun-dried tamarind. Zero artificial preservatives.</p>
          </div>
          <div class="sb-pillar-card">
            <div class="sb-pillar-icon">👅</div>
            <h3 class="sb-pillar-title font-coolvetica">Bold, unapologetic flavours</h3>
            <p class="sb-pillar-desc font-schoolbell">Sour that hits you right between the eyes. Tangy, spicy, crunchy goodness.</p>
          </div>
          <div class="sb-pillar-card">
            <div class="sb-pillar-icon">🫙</div>
            <h3 class="sb-pillar-title font-coolvetica">Made in small batches</h3>
            <p class="sb-pillar-desc font-schoolbell">Handcrafted in limited runs to keep the crunch razor-sharp.</p>
          </div>
        </div>
      </section>

      <!-- Part 5: Behind The Brand (Pink Torn Paper Banner) -->
      <section class="sb-behind-banner-section" aria-label="Behind the Brand">
        <div class="sb-behind-inner">
          <h2 class="sb-behind-title font-rascal">
            Behind<br>The Brand
          </h2>
          <div class="sb-behind-checklist">
            <div class="sb-checklist-item">
              <span class="sb-check-icon">✓</span>
              <span>A lot of taste testing</span>
            </div>
            <div class="sb-checklist-item">
              <span class="sb-check-icon">✓</span>
              <span>Countless fridge raids</span>
            </div>
            <div class="sb-checklist-item">
              <span class="sb-check-icon">✓</span>
              <span>Debates over "the perfect tang"</span>
            </div>
            <div class="sb-checklist-item">
              <span class="sb-check-icon">✓</span>
              <span>And a growing pickle obsession</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Part 6: Still Curious? -->
      <section class="sb-about-closing-section" aria-label="Still Curious">
        <div class="sb-closing-photo-wrap">
          <img src="/recipe-1.jpg" alt="Sourboo pickles bowl" loading="lazy" width="600" height="450" />
        </div>
        <div class="sb-closing-content">
          <h2 class="font-rascal">Still Curious?</h2>
          <p class="font-schoolbell">
            Explore the flavours, read our rant, or just say hi. We're always up for a good pickle chat.
          </p>
          <div class="sb-closing-btn-row">
            <a href="/collections/all" class="sb-btn-yellow">
              <span>Shop Now →</span>
            </a>
            <a href="/pages/contact" class="sb-btn-outline">
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </section>
    </article>
  `;
  return wrapLayout(content, 'Our Story • The Pickle Project | Sourboo', false, reqHost);
}

function getJoinPageHtml(reqHost = 'localhost') {
  const content = `
    <div class="sb-join-page-wrap">
      <div class="sb-join-hero">
        <h1 class="font-coolvetica">Join the <span class="text-pink font-rascal">Sourboo</span> Club</h1>
        <p class="font-schoolbell">for people who eat pickles straight from the fridge at 2 AM</p>
      </div>
      <div class="sb-join-cards-grid">
        <div class="sb-join-card">
          <h2 class="font-coolvetica text-pink">WHATSAPP COMMUNITY</h2>
          <p class="font-schoolbell">Get first access to small-batch seasonal recipes, tasting pop-ups, and secret discounts.</p>
          <a href="https://chat.whatsapp.com/L9YSdLAYGfuEke1zXhvoWN" target="_blank" rel="noopener noreferrer" class="sb-btn-yellow" style="display: inline-flex; width: fit-content;">
            Join WhatsApp Group →
          </a>
        </div>
        <div class="sb-join-card accent-yellow">
          <h2 class="font-coolvetica">STOCKISTS &amp; COLLABS</h2>
          <p class="font-schoolbell">Want Sourboo in your cafe, bar, or retail shelf? We love collaborating with good humans.</p>
          <a href="mailto:cravings@sourboo.com" class="sb-btn-outline" style="display: inline-flex; width: fit-content; background: var(--sb-green-dark); color: #FFF;">
            Email Us For Stocking →
          </a>
        </div>
      </div>
    </div>
  `;
  return wrapLayout(content, 'Join Us | The Sourboo Club', false, reqHost);
}

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
