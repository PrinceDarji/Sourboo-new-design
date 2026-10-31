/**
 * SOURBOO FIGMA SVG ARTBOARD GENERATOR ENGINE
 * Produces standards-compliant SVG 1.1 documents formatted for direct
 * drag-and-drop into Figma canvas FKPMaN6f04sHPAkjDIjYZY.
 */
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = __dirname;

const TOKENS = {
  sage: '#E9ECD9',
  pink: '#E61E6E',
  pickle: '#4C8B1D',
  lime: '#BFEA5A',
  yellow: '#FFFF88',
  amber: '#C96A00',
  charcoal: '#171717',
  lilac: '#EEDDEB',
  white: '#FFFFFF',
  muted: '#555555'
};

function getDefs() {
  return `  <defs>
    <style>
      @font-face { font-family: 'Coolvetica'; src: local('Coolvetica'), url('/coolvetica.ttf'); font-weight: normal; }
      @font-face { font-family: 'Rascal'; src: local('Rascal'), url('/rascal.ttf'); font-weight: normal; }
      @font-face { font-family: 'Schoolbell'; src: local('Schoolbell'), url('/Schoolbell-Regular.ttf'); font-weight: normal; }
      .text-coolvetica { font-family: 'Coolvetica', system-ui, sans-serif; }
      .text-rascal { font-family: 'Rascal', cursive, sans-serif; }
      .text-schoolbell { font-family: 'Schoolbell', cursive, sans-serif; }
      .stroke-charcoal { stroke: ${TOKENS.charcoal}; stroke-width: 2px; }
      .stroke-charcoal-thick { stroke: ${TOKENS.charcoal}; stroke-width: 3px; }
      .stroke-charcoal-heavy { stroke: ${TOKENS.charcoal}; stroke-width: 4px; }
      .shadow-hard { filter: drop-shadow(4px 4px 0px ${TOKENS.charcoal}); }
      .shadow-hard-lg { filter: drop-shadow(6px 6px 0px ${TOKENS.charcoal}); }
    </style>
  </defs>`;
}

function getSvgHeader(width, height, title) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <title>${title}</title>
${getDefs()}`;
}

// 1. Desktop Homepage Artboard (1440 x 6200)
function generateDesktopHomeSvg() {
  return `${getSvgHeader(1440, 6200, 'Artboard - Desktop Homepage (1440px)')}
  <g id="Artboard_Desktop_Homepage_1440x6200">
    <rect width="1440" height="6200" fill="${TOKENS.sage}" />

    <!-- Top Dateline Ticker -->
    <rect x="0" y="0" width="1440" height="40" fill="${TOKENS.charcoal}" />
    <text x="720" y="26" text-anchor="middle" fill="${TOKENS.lime}" font-size="14" class="text-coolvetica" letter-spacing="1">
      SOURBOO SNACK DIARY • VOL. 02 • OCTOBER 2026 • FOR MISBEHAVING MOUTHS EVERYWHERE
    </text>

    <!-- Floating Nav Bar -->
    <g id="Navbar_Desktop" transform="translate(40, 60)">
      <rect width="1360" height="76" rx="24" fill="${TOKENS.sage}" class="stroke-charcoal shadow-hard" />
      <text x="36" y="48" fill="${TOKENS.charcoal}" font-size="28" font-weight="bold" class="text-coolvetica">SOURBOO</text>
      <text x="170" y="46" fill="${TOKENS.pink}" font-size="14" class="text-schoolbell">daily edition ¬‿¬</text>
      <text x="560" y="46" fill="${TOKENS.charcoal}" font-size="18" class="text-schoolbell">shop</text>
      <text x="640" y="46" fill="${TOKENS.charcoal}" font-size="18" class="text-schoolbell">diary</text>
      <text x="720" y="46" fill="${TOKENS.charcoal}" font-size="18" class="text-schoolbell">moments</text>
      <text x="820" y="46" fill="${TOKENS.charcoal}" font-size="18" class="text-schoolbell">club</text>
      <rect x="940" y="18" width="220" height="40" rx="20" fill="${TOKENS.yellow}" class="stroke-charcoal shadow-hard" />
      <text x="1050" y="43" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="15" class="text-schoolbell">take quiz (get 5% off)</text>
      <rect x="1180" y="18" width="140" height="40" rx="20" fill="${TOKENS.pink}" class="stroke-charcoal shadow-hard" />
      <text x="1250" y="44" text-anchor="middle" fill="${TOKENS.white}" font-size="16" class="text-coolvetica">BAG [ 0 ]</text>
    </g>

    <!-- Hero Broadsheet (7:5 Split) -->
    <g id="Section_Hero_The_Sourbroadsheet" transform="translate(64, 180)">
      <g id="Hero_Editorial_Left">
        <text x="0" y="40" fill="${TOKENS.pickle}" font-size="15" class="text-coolvetica" letter-spacing="2">FIELD REPORT // HARVEST ARCHIVE</text>
        <text x="0" y="120" fill="${TOKENS.charcoal}" font-size="76" font-weight="bold" class="text-coolvetica" letter-spacing="-1">THE SOURBOO WAY,</text>
        <text x="0" y="200" fill="${TOKENS.pink}" font-size="72" class="text-rascal">cravings come first.</text>
        <g transform="rotate(-2, 20, 240)">
          <rect x="0" y="230" width="340" height="40" rx="8" fill="${TOKENS.yellow}" class="stroke-charcoal" />
          <text x="170" y="256" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="20" class="text-schoolbell">mouth wants to misbehave ¬‿¬</text>
        </g>
        <text x="0" y="320" fill="${TOKENS.charcoal}" font-size="20" class="text-schoolbell">
          We make loud, khatta pickled gherkins for people who don't eat quietly. Whole Indian spices,
        </text>
        <text x="0" y="350" fill="${TOKENS.charcoal}" font-size="20" class="text-schoolbell">
          relentless crunch that stops you for a second, and makes you squint a little.
        </text>
        <g transform="translate(0, 400)">
          <rect x="0" y="0" width="240" height="56" rx="28" fill="${TOKENS.pink}" class="stroke-charcoal-thick shadow-hard" />
          <text x="120" y="35" text-anchor="middle" fill="${TOKENS.white}" font-size="20" class="text-schoolbell">shop the crunch →</text>
          <rect x="270" y="0" width="240" height="56" rx="28" fill="${TOKENS.yellow}" class="stroke-charcoal-thick shadow-hard" />
          <text x="390" y="35" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-schoolbell">take quiz (get 5% off)</text>
        </g>
      </g>
      <g id="Hero_Photo_Right" transform="translate(740, 20)">
        <rect width="570" height="460" rx="16" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard-lg" transform="rotate(1.5, 285, 230)" />
        <rect x="14" y="14" width="542" height="432" rx="10" fill="#E4E8D4" transform="rotate(1.5, 285, 230)" />
        <text x="285" y="240" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="22" class="text-coolvetica" transform="rotate(1.5, 285, 230)">[ hero-placeholder.webp • Hands & Pickles ]</text>
        <rect x="10" y="-10" width="100" height="30" fill="${TOKENS.yellow}" opacity="0.85" transform="rotate(-15)" />
        <rect x="460" y="420" width="100" height="30" fill="${TOKENS.yellow}" opacity="0.85" transform="rotate(10)" />
        <circle cx="510" cy="50" r="50" fill="${TOKENS.pink}" class="stroke-charcoal shadow-hard" />
        <text x="510" y="48" text-anchor="middle" fill="${TOKENS.white}" font-size="13" font-weight="bold" class="text-coolvetica">100% REAL</text>
        <text x="510" y="65" text-anchor="middle" fill="${TOKENS.lime}" font-size="12" class="text-coolvetica">KHATTA</text>
      </g>
    </g>

    <!-- The Sour Dossier (3 Staggered Cards) -->
    <g id="Section_The_Sour_Dossier" transform="translate(64, 760)">
      <text x="656" y="40" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="52" class="text-coolvetica">THE SOUR DOSSIER</text>
      <text x="656" y="80" text-anchor="middle" fill="${TOKENS.pickle}" font-size="24" class="text-schoolbell">no boring bands — staggered field reports for real cravings</text>

      <!-- Card 1: Side Eye Sour -->
      <g id="Card_SideEyeSour" transform="translate(0, 130)">
        <rect width="410" height="560" rx="24" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard" />
        <rect x="24" y="24" width="100" height="28" rx="6" fill="${TOKENS.yellow}" class="stroke-charcoal" />
        <text x="74" y="44" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="13" class="text-coolvetica">CASE #001</text>
        <text x="205" y="220" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="20" class="text-coolvetica">[ side-eye.webp ]</text>
        <text x="24" y="380" fill="${TOKENS.charcoal}" font-size="28" class="text-coolvetica">SIDE EYE SOUR</text>
        <text x="24" y="410" fill="${TOKENS.pickle}" font-size="16" class="text-schoolbell">Lemon & Chaat Masala • ₹399</text>
        <text x="24" y="450" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Sourness: ★★★★★</text>
        <text x="24" y="475" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Crunch: ★★★★★ • Spice: ★★★☆☆</text>
        <rect x="24" y="500" width="362" height="42" rx="21" fill="${TOKENS.charcoal}" />
        <text x="205" y="526" text-anchor="middle" fill="${TOKENS.lime}" font-size="15" class="text-coolvetica">QUICK ADD +</text>
      </g>

      <!-- Card 2: Tamarin' Tease (Staggered offset) -->
      <g id="Card_TamarinTease" transform="translate(450, 178)">
        <rect width="410" height="560" rx="24" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard" />
        <rect x="24" y="24" width="100" height="28" rx="6" fill="${TOKENS.amber}" class="stroke-charcoal" />
        <text x="74" y="44" text-anchor="middle" fill="${TOKENS.white}" font-size="13" class="text-coolvetica">CASE #002</text>
        <text x="205" y="220" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="20" class="text-coolvetica">[ tamarin-tease.webp ]</text>
        <text x="24" y="380" fill="${TOKENS.charcoal}" font-size="28" class="text-coolvetica">TAMARIN’ TEASE</text>
        <text x="24" y="410" fill="${TOKENS.amber}" font-size="16" class="text-schoolbell">Tamarind & Chilli • ₹399</text>
        <text x="24" y="450" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Sourness: ★★★★☆</text>
        <text x="24" y="475" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Crunch: ★★★★★ • Spice: ★★★★☆</text>
        <rect x="24" y="500" width="362" height="42" rx="21" fill="${TOKENS.charcoal}" />
        <text x="205" y="526" text-anchor="middle" fill="${TOKENS.lime}" font-size="15" class="text-coolvetica">QUICK ADD +</text>
      </g>

      <!-- Card 3: Sourboo Stash -->
      <g id="Card_SourbooStash" transform="translate(900, 140)">
        <rect width="410" height="560" rx="24" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard" />
        <rect x="24" y="24" width="130" height="28" rx="6" fill="${TOKENS.lime}" class="stroke-charcoal" />
        <text x="89" y="44" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="13" class="text-coolvetica">BEST VALUE</text>
        <text x="205" y="220" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="20" class="text-coolvetica">[ sourboo-stash.webp ]</text>
        <text x="24" y="380" fill="${TOKENS.charcoal}" font-size="28" class="text-coolvetica">SOURBOO STASH</text>
        <text x="24" y="410" fill="${TOKENS.pink}" font-size="16" class="text-schoolbell">4-Jar Variety Pack • ₹1299</text>
        <text x="24" y="450" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Free Shipping • Save ₹297</text>
        <text x="24" y="475" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Midnight Fridge Essential</text>
        <rect x="24" y="500" width="362" height="42" rx="21" fill="${TOKENS.pink}" class="stroke-charcoal" />
        <text x="205" y="526" text-anchor="middle" fill="${TOKENS.white}" font-size="15" class="text-coolvetica">CLAIM STASH +</text>
      </g>
    </g>

    <!-- Brand Manifesto Spread -->
    <g id="Section_Manifesto" transform="translate(0, 1600)">
      <rect width="1440" height="480" fill="${TOKENS.yellow}" class="stroke-charcoal-thick" />
      <text x="720" y="60" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="44" class="text-coolvetica">WHY PICKLES? BECAUSE BLAND SNACKS ARE AN INSULT TO CRAVINGS.</text>
      <text x="720" y="100" text-anchor="middle" fill="${TOKENS.pink}" font-size="24" class="text-schoolbell">for people who like flavour loud and immediate — food that fits into real moments</text>
      <g transform="translate(64, 150)">
        <rect x="0" y="0" width="300" height="260" rx="16" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="24" y="50" fill="${TOKENS.pink}" font-size="32" class="text-coolvetica">01</text>
        <text x="24" y="90" fill="${TOKENS.charcoal}" font-size="20" class="text-coolvetica">EAT WITH INTENT</text>
        <text x="24" y="130" fill="${TOKENS.muted}" font-size="16" class="text-schoolbell">We don’t do quiet snacks. Crafted to demand attention.</text>

        <rect x="330" y="0" width="300" height="260" rx="16" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="354" y="50" fill="${TOKENS.pink}" font-size="32" class="text-coolvetica">02</text>
        <text x="354" y="90" fill="${TOKENS.charcoal}" font-size="20" class="text-coolvetica">RELENTLESS CRUNCH</text>
        <text x="354" y="130" fill="${TOKENS.muted}" font-size="16" class="text-schoolbell">Straight from the fridge to your teeth. Never soggy.</text>

        <rect x="660" y="0" width="300" height="260" rx="16" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="684" y="50" fill="${TOKENS.pink}" font-size="32" class="text-coolvetica">03</text>
        <text x="684" y="90" fill="${TOKENS.charcoal}" font-size="20" class="text-coolvetica">REAL KHATTA</text>
        <text x="684" y="130" fill="${TOKENS.muted}" font-size="16" class="text-schoolbell">Hand-pressed lemon, imli pulp, rock salt. Zero fake powders.</text>

        <rect x="990" y="0" width="300" height="260" rx="16" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="1014" y="50" fill="${TOKENS.pink}" font-size="32" class="text-coolvetica">04</text>
        <text x="1014" y="90" fill="${TOKENS.charcoal}" font-size="20" class="text-coolvetica">ZERO CHILL</text>
        <text x="1014" y="130" fill="${TOKENS.muted}" font-size="16" class="text-schoolbell">100% vegetarian, FSSAI certified. Real desk & late night fuel.</text>
      </g>
    </g>

    <!-- The Moments Archive (Poster Wall) -->
    <g id="Section_The_Moments_Archive" transform="translate(64, 2180)">
      <text x="656" y="40" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="48" class="text-coolvetica">THE MOMENTS ARCHIVE</text>
      <text x="656" y="76" text-anchor="middle" fill="${TOKENS.pickle}" font-size="22" class="text-schoolbell">wheatpaste zine pinboard for real uncurated moments</text>
      <g transform="translate(0, 110)">
        <g transform="rotate(-2, 150, 210)">
          <rect x="0" y="0" width="300" height="420" rx="12" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
          <circle cx="150" cy="10" r="10" fill="${TOKENS.pink}" class="stroke-charcoal" />
          <text x="150" y="210" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="16" class="text-coolvetica">[ postcrysnack.webp ]</text>
          <text x="150" y="380" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-schoolbell">for when you need to feel feelings</text>
        </g>
        <g transform="rotate(2, 480, 210)">
          <rect x="330" y="0" width="300" height="420" rx="12" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
          <circle cx="480" cy="10" r="10" fill="${TOKENS.pink}" class="stroke-charcoal" />
          <text x="480" y="210" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="16" class="text-coolvetica">[ latenightmunchies.webp ]</text>
          <text x="480" y="380" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-schoolbell">2:14 AM fridge raid essentials</text>
        </g>
        <g transform="rotate(-1.5, 810, 210)">
          <rect x="660" y="0" width="300" height="420" rx="12" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
          <circle cx="810" cy="10" r="10" fill="${TOKENS.pink}" class="stroke-charcoal" />
          <text x="810" y="210" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="16" class="text-coolvetica">[ girldinner.webp ]</text>
          <text x="810" y="380" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-schoolbell">girl dinner: 4 pickles, 0 regrets</text>
        </g>
        <g transform="rotate(2.5, 1140, 210)">
          <rect x="990" y="0" width="300" height="420" rx="12" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
          <circle cx="1140" cy="10" r="10" fill="${TOKENS.pink}" class="stroke-charcoal" />
          <text x="1140" y="210" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="16" class="text-coolvetica">[ deskcravings.webp ]</text>
          <text x="1140" y="380" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-schoolbell">3 PM zoom call survival fuel</text>
        </g>
      </g>
    </g>

    <!-- Colophon & Footer -->
    <g id="Section_Colophon_Footer" transform="translate(0, 5750)">
      <rect width="1440" height="450" fill="${TOKENS.charcoal}" />
      <text x="64" y="80" fill="${TOKENS.lime}" font-size="36" class="text-coolvetica">SOURBOO SNACKS LLP</text>
      <text x="64" y="120" fill="${TOKENS.sage}" font-size="16" class="text-schoolbell">Crafted in Bengaluru, India • FSSAI Certified • 100% Vegetarian</text>
      <text x="64" y="160" fill="${TOKENS.pink}" font-size="20" class="text-coolvetica">STAY SOUR. NEVER QUIET.</text>
      <text x="1376" y="80" text-anchor="end" fill="${TOKENS.sage}" font-size="16" class="text-coolvetica">cravings@sourboo.com • +91 8120202060</text>
      <text x="1376" y="120" text-anchor="end" fill="${TOKENS.yellow}" font-size="16" class="text-coolvetica">@eatsourboo on Instagram</text>
    </g>
  </g>
</svg>`;
}

// 2. Mobile Homepage Artboard (390 x 4800)
function generateMobileHomeSvg() {
  return `${getSvgHeader(390, 4800, 'Artboard - Mobile Homepage (390px)')}
  <g id="Artboard_Mobile_Homepage_390x4800">
    <rect width="390" height="4800" fill="${TOKENS.sage}" />

    <!-- Mobile Nav Bar -->
    <g id="Navbar_Mobile" transform="translate(16, 16)">
      <rect width="358" height="60" rx="18" fill="${TOKENS.sage}" class="stroke-charcoal shadow-hard" />
      <text x="20" y="38" fill="${TOKENS.charcoal}" font-size="20" font-weight="bold" class="text-coolvetica">SOURBOO</text>
      <rect x="250" y="14" width="90" height="32" rx="16" fill="${TOKENS.pink}" class="stroke-charcoal" />
      <text x="295" y="35" text-anchor="middle" fill="${TOKENS.white}" font-size="13" class="text-coolvetica">BAG [0]</text>
    </g>

    <!-- Mobile Hero -->
    <g id="Hero_Mobile" transform="translate(20, 100)">
      <text x="0" y="30" fill="${TOKENS.pickle}" font-size="12" class="text-coolvetica" letter-spacing="1">SNACK DIARY • VOL. 02</text>
      <text x="0" y="70" fill="${TOKENS.charcoal}" font-size="38" class="text-coolvetica">THE SOURBOO WAY,</text>
      <text x="0" y="110" fill="${TOKENS.pink}" font-size="34" class="text-rascal">cravings come first.</text>
      <rect width="350" height="260" rx="16" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" y="130" />
      <text x="175" y="270" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="16" class="text-coolvetica">[ hero-placeholder.webp ]</text>
      <rect x="0" y="410" width="350" height="48" rx="24" fill="${TOKENS.pink}" class="stroke-charcoal shadow-hard" />
      <text x="175" y="440" text-anchor="middle" fill="${TOKENS.white}" font-size="18" class="text-schoolbell">shop the crunch →</text>
    </g>

    <!-- Mobile Dossier Deck -->
    <g id="Dossier_Mobile" transform="translate(20, 600)">
      <text x="0" y="30" fill="${TOKENS.charcoal}" font-size="28" class="text-coolvetica">THE SOUR DOSSIER</text>
      <rect width="350" height="440" rx="20" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" y="50" />
      <text x="175" y="240" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="16" class="text-coolvetica">[ side-eye.webp ]</text>
      <text x="20" y="340" fill="${TOKENS.charcoal}" font-size="22" class="text-coolvetica">SIDE EYE SOUR</text>
      <text x="20" y="365" fill="${TOKENS.pickle}" font-size="14" class="text-schoolbell">Lemon & Chaat Masala • ₹399</text>
      <rect x="20" y="390" width="310" height="40" rx="20" fill="${TOKENS.charcoal}" />
      <text x="175" y="415" text-anchor="middle" fill="${TOKENS.lime}" font-size="14" class="text-coolvetica">QUICK ADD +</text>
    </g>

    <!-- Mobile Footer -->
    <g id="Footer_Mobile" transform="translate(0, 4400)">
      <rect width="390" height="400" fill="${TOKENS.charcoal}" />
      <text x="24" y="60" fill="${TOKENS.lime}" font-size="24" class="text-coolvetica">SOURBOO SNACKS</text>
      <text x="24" y="90" fill="${TOKENS.sage}" font-size="14" class="text-schoolbell">cravings@sourboo.com</text>
      <text x="24" y="120" fill="${TOKENS.pink}" font-size="16" class="text-coolvetica">STAY SOUR. NEVER QUIET.</text>
    </g>
  </g>
</svg>`;
}

// 3. Desktop Shop Collection (1440 x 3400)
function generateDesktopShopSvg() {
  return `${getSvgHeader(1440, 3400, 'Artboard - Desktop Shop Collection (1440px)')}
  <g id="Artboard_Desktop_Shop_1440x3400">
    <rect width="1440" height="3400" fill="${TOKENS.sage}" />

    <g id="Shop_Header" transform="translate(64, 100)">
      <text x="656" y="60" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="64" class="text-coolvetica">ALL SOUR, ZERO CHILL</text>
      <text x="656" y="100" text-anchor="middle" fill="${TOKENS.pickle}" font-size="24" class="text-schoolbell">crunchy snackable pickled gherkins made for loud cravings</text>
    </g>

    <!-- 6 Product Cards Grid -->
    <g id="Shop_Product_Grid" transform="translate(64, 260)">
      <!-- Card 1 -->
      <g transform="translate(0, 0)">
        <rect width="410" height="420" rx="20" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="205" y="180" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-coolvetica">[ side-eye.webp ]</text>
        <text x="24" y="320" fill="${TOKENS.charcoal}" font-size="24" class="text-coolvetica">SIDE EYE SOUR</text>
        <text x="24" y="350" fill="${TOKENS.pickle}" font-size="15" class="text-schoolbell">Lemon & Chaat Masala • ₹399</text>
        <rect x="24" y="370" width="362" height="36" rx="18" fill="${TOKENS.pink}" />
        <text x="205" y="393" text-anchor="middle" fill="${TOKENS.white}" font-size="14" class="text-coolvetica">QUICK ADD +</text>
      </g>
      <!-- Card 2 -->
      <g transform="translate(450, 0)">
        <rect width="410" height="420" rx="20" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="205" y="180" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-coolvetica">[ tamarin-tease.webp ]</text>
        <text x="24" y="320" fill="${TOKENS.charcoal}" font-size="24" class="text-coolvetica">TAMARIN’ TEASE</text>
        <text x="24" y="350" fill="${TOKENS.amber}" font-size="15" class="text-schoolbell">Tamarind & Chilli • ₹399</text>
        <rect x="24" y="370" width="362" height="36" rx="18" fill="${TOKENS.pink}" />
        <text x="205" y="393" text-anchor="middle" fill="${TOKENS.white}" font-size="14" class="text-coolvetica">QUICK ADD +</text>
      </g>
      <!-- Card 3 -->
      <g transform="translate(900, 0)">
        <rect width="410" height="420" rx="20" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="205" y="180" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-coolvetica">[ tamarind-twins.webp ]</text>
        <text x="24" y="320" fill="${TOKENS.charcoal}" font-size="24" class="text-coolvetica">TAMARIND TWINS</text>
        <text x="24" y="350" fill="${TOKENS.amber}" font-size="15" class="text-schoolbell">2 × Tamarin' Tease • ₹719</text>
        <rect x="24" y="370" width="362" height="36" rx="18" fill="${TOKENS.pink}" />
        <text x="205" y="393" text-anchor="middle" fill="${TOKENS.white}" font-size="14" class="text-coolvetica">QUICK ADD +</text>
      </g>
      <!-- Row 2 -->
      <g transform="translate(0, 460)">
        <rect width="410" height="420" rx="20" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="205" y="180" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-coolvetica">[ lemon-lovers.webp ]</text>
        <text x="24" y="320" fill="${TOKENS.charcoal}" font-size="24" class="text-coolvetica">LEMON LOVERS</text>
        <text x="24" y="350" fill="${TOKENS.pickle}" font-size="15" class="text-schoolbell">2 × Side Eye Sour • ₹729</text>
        <rect x="24" y="370" width="362" height="36" rx="18" fill="${TOKENS.pink}" />
        <text x="205" y="393" text-anchor="middle" fill="${TOKENS.white}" font-size="14" class="text-coolvetica">QUICK ADD +</text>
      </g>
      <g transform="translate(450, 460)">
        <rect width="410" height="420" rx="20" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="205" y="180" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-coolvetica">[ sour-sampler.webp ]</text>
        <text x="24" y="320" fill="${TOKENS.charcoal}" font-size="24" class="text-coolvetica">SOUR SAMPLER</text>
        <text x="24" y="350" fill="${TOKENS.pink}" font-size="15" class="text-schoolbell">1 Side Eye + 1 Tamarin • ₹729</text>
        <rect x="24" y="370" width="362" height="36" rx="18" fill="${TOKENS.pink}" />
        <text x="205" y="393" text-anchor="middle" fill="${TOKENS.white}" font-size="14" class="text-coolvetica">QUICK ADD +</text>
      </g>
      <g transform="translate(900, 460)">
        <rect width="410" height="420" rx="20" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="205" y="180" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-coolvetica">[ sourboo-stash.webp ]</text>
        <text x="24" y="320" fill="${TOKENS.charcoal}" font-size="24" class="text-coolvetica">SOURBOO STASH</text>
        <text x="24" y="350" fill="${TOKENS.pink}" font-size="15" class="text-schoolbell">4-Jar Ultimate Pack • ₹1299</text>
        <rect x="24" y="370" width="362" height="36" rx="18" fill="${TOKENS.pink}" />
        <text x="205" y="393" text-anchor="middle" fill="${TOKENS.white}" font-size="14" class="text-coolvetica">CLAIM STASH +</text>
      </g>
    </g>

    <!-- Flavour Matcher Interactive Frame -->
    <g id="Shop_Flavor_Matcher" transform="translate(0, 1260)">
      <rect width="1440" height="600" fill="${TOKENS.yellow}" class="stroke-charcoal-thick" />
      <text x="720" y="60" text-anchor="middle" fill="${TOKENS.pink}" font-size="44" class="text-coolvetica">CAN'T DECIDE?</text>
      <text x="720" y="95" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="24" class="text-schoolbell">let's match you with your flavour ;)</text>
      <g transform="translate(220, 140)">
        <rect width="460" height="380" rx="24" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="230" y="140" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-coolvetica">[ player1.svg • Khatta Champion ]</text>
        <text x="230" y="240" text-anchor="middle" fill="${TOKENS.pickle}" font-size="22" class="text-coolvetica">LOCKED: SIDE EYE SOUR</text>
        <text x="230" y="270" text-anchor="middle" fill="${TOKENS.muted}" font-size="15" class="text-schoolbell">Spice 82% • Sour 100% • Crunch 68%</text>
      </g>
      <g transform="translate(760, 140)">
        <rect width="460" height="380" rx="24" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
        <text x="230" y="140" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-coolvetica">[ player2.svg • Imli Teaser ]</text>
        <text x="230" y="240" text-anchor="middle" fill="${TOKENS.amber}" font-size="22" class="text-coolvetica">LOCKED: TAMARIN’ TEASE</text>
        <text x="230" y="270" text-anchor="middle" fill="${TOKENS.muted}" font-size="15" class="text-schoolbell">Spice 84% • Tang 100% • Hit 84%</text>
      </g>
    </g>
  </g>
</svg>`;
}

// 4. Desktop Product Detail Page (1440 x 3600)
function generateDesktopPdpSvg() {
  return `${getSvgHeader(1440, 3600, 'Artboard - Desktop PDP (1440px)')}
  <g id="Artboard_Desktop_PDP_1440x3600">
    <rect width="1440" height="3600" fill="${TOKENS.sage}" />

    <!-- PDP Split Layout -->
    <g id="PDP_Split_Main" transform="translate(64, 120)">
      <!-- Left Gallery -->
      <g id="PDP_Gallery">
        <rect width="620" height="580" rx="24" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard" />
        <text x="310" y="290" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="24" class="text-coolvetica">[ side-eye.webp • Crinkle Cut Jar ]</text>
        <g transform="translate(0, 600)">
          <rect x="0" y="0" width="80" height="80" rx="10" fill="${TOKENS.white}" class="stroke-charcoal" />
          <rect x="100" y="0" width="80" height="80" rx="10" fill="${TOKENS.white}" class="stroke-charcoal" />
          <rect x="200" y="0" width="80" height="80" rx="10" fill="${TOKENS.white}" class="stroke-charcoal" />
        </g>
      </g>
      <!-- Right Info & Folder Tabs -->
      <g id="PDP_Info" transform="translate(680, 0)">
        <text x="0" y="40" fill="${TOKENS.pickle}" font-size="14" class="text-coolvetica" letter-spacing="1">SNACKABLE PICKLED GHERKINS</text>
        <text x="0" y="90" fill="${TOKENS.charcoal}" font-size="54" class="text-coolvetica">SIDE EYE SOUR</text>
        <text x="0" y="140" fill="${TOKENS.pink}" font-size="36" class="text-coolvetica">₹399</text>
        <text x="0" y="180" fill="${TOKENS.muted}" font-size="16" class="text-schoolbell">Lemon & Chaat Masala • Net wt. 350g</text>

        <!-- Pre-order SLA notice -->
        <g transform="translate(0, 220)">
          <rect width="600" height="50" rx="8" fill="#FFF9C4" stroke="${TOKENS.pickle}" stroke-width="2" />
          <text x="20" y="32" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">
            ★ Pre-orders only. Dispatched within 2-4 working days. Delivery timelines vary by location.
          </text>
        </g>

        <!-- Add to cart row -->
        <g transform="translate(0, 300)">
          <rect width="120" height="54" rx="27" fill="${TOKENS.white}" class="stroke-charcoal" />
          <text x="60" y="34" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="18" class="text-coolvetica">-  1  +</text>
          <rect x="140" y="0" width="460" height="54" rx="27" fill="${TOKENS.pink}" class="stroke-charcoal shadow-hard" />
          <text x="370" y="34" text-anchor="middle" fill="${TOKENS.white}" font-size="20" class="text-schoolbell">Add to Cart →</text>
        </g>

        <!-- 3 Handwritten Physical Folder Tabs -->
        <g id="PDP_Folder_Tabs" transform="translate(0, 400)">
          <!-- Tabs Header -->
          <rect x="0" y="0" width="160" height="42" rx="12 12 0 0" fill="${TOKENS.yellow}" class="stroke-charcoal" />
          <text x="80" y="27" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="16" class="text-schoolbell">In the jar</text>
          <rect x="170" y="0" width="160" height="42" rx="12 12 0 0" fill="${TOKENS.sage}" class="stroke-charcoal" />
          <text x="250" y="27" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="16" class="text-schoolbell">On the tongue</text>
          <rect x="340" y="0" width="160" height="42" rx="12 12 0 0" fill="${TOKENS.sage}" class="stroke-charcoal" />
          <text x="420" y="27" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="16" class="text-schoolbell">After opening</text>

          <!-- Tab Content Panel -->
          <rect x="0" y="40" width="600" height="260" rx="0 16 16 16" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
          <text x="24" y="80" fill="${TOKENS.pickle}" font-size="20" class="text-coolvetica">Net Wt. 350g (Drained: 180g)</text>
          <text x="24" y="120" fill="${TOKENS.charcoal}" font-size="15" class="text-schoolbell">Ingredients: Gherkins, Lemon slices, Rock salt, Chaat masala,</text>
          <text x="24" y="145" fill="${TOKENS.charcoal}" font-size="15" class="text-schoolbell">Whole red chilli, Mustard seeds, Vinegar, Mineral salt.</text>
          <text x="24" y="190" fill="${TOKENS.muted}" font-size="14" class="text-schoolbell">100% vegetarian. Zero added artificial colors or preservatives.</text>
        </g>
      </g>
    </g>
  </g>
</svg>`;
}

// 5. Desktop About Page / Sakshi's Diary (1440 x 3200)
function generateDesktopAboutSvg() {
  return `${getSvgHeader(1440, 3200, 'Artboard - Sakshi\'s Diary (1440px)')}
  <g id="Artboard_Desktop_About_1440x3200">
    <rect width="1440" height="3200" fill="${TOKENS.sage}" />

    <g id="About_Cover_Feature" transform="translate(64, 120)">
      <g id="Founder_Portrait">
        <rect width="520" height="640" rx="20" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard-lg" transform="rotate(-1.5, 260, 320)" />
        <rect x="14" y="14" width="492" height="612" rx="12" fill="#E8DEC8" transform="rotate(-1.5, 260, 320)" />
        <text x="260" y="320" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="22" class="text-coolvetica" transform="rotate(-1.5, 260, 320)">[ about-cover.JPG • Sakshi ]</text>
        <rect x="420" y="-10" width="90" height="30" fill="${TOKENS.yellow}" opacity="0.8" transform="rotate(15)" />
      </g>
      <g id="Founder_Letter" transform="translate(580, 40)">
        <text x="0" y="30" fill="${TOKENS.pickle}" font-size="14" class="text-coolvetica" letter-spacing="1">FOUNDER NOTEBOOK // OCTOBER 2026</text>
        <text x="0" y="90" fill="${TOKENS.pink}" font-size="64" class="text-coolvetica">HI I AM SAKSHI,</text>
        <text x="0" y="140" fill="${TOKENS.pickle}" font-size="34" class="text-schoolbell">and i am really glad you are here</text>
        <text x="0" y="210" fill="${TOKENS.charcoal}" font-size="20" class="text-schoolbell">if u are here, i am assuming you like sour or curious enough to try it.</text>
        <text x="0" y="245" fill="${TOKENS.charcoal}" font-size="20" class="text-schoolbell">I spent 5 years around food and drinks from london bar shifts to a 9-5 desk job,</text>
        <text x="0" y="280" fill="${TOKENS.charcoal}" font-size="20" class="text-schoolbell">always obsessing over why sour was treated like a side.</text>
        <g transform="translate(0, 340)">
          <rect width="200" height="48" rx="8" fill="${TOKENS.yellow}" class="stroke-charcoal" />
          <text x="100" y="32" text-anchor="middle" fill="${TOKENS.pink}" font-size="24" class="text-schoolbell">xx - Sakshi</text>
        </g>
      </g>
    </g>

    <!-- Tongue Flavor Map -->
    <g id="Tongue_Flavor_Map" transform="translate(64, 880)">
      <text x="656" y="40" text-anchor="middle" fill="${TOKENS.pickle}" font-size="44" class="text-coolvetica">DIFFERENT LIVES, SAME CRAVINGS</text>
      <rect x="220" y="80" width="872" height="420" rx="24" fill="${TOKENS.white}" class="stroke-charcoal shadow-hard" />
      <text x="656" y="280" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="22" class="text-coolvetica">[ section-three-tongue.svg • India Loves Chaat ]</text>
    </g>
  </g>
</svg>`;
}

// 6. Personality Popup Flow (2600 x 800)
function generatePersonalityPopupSvg() {
  return `${getSvgHeader(2600, 800, 'Artboard - 4-Step Personality Popup Flow')}
  <g id="Artboard_Personality_Popup_Flow">
    <rect width="2600" height="800" fill="${TOKENS.lilac}" />

    <!-- Screen 1: Quiz Choices -->
    <g id="Popup_Screen_1" transform="translate(60, 80)">
      <rect width="560" height="640" rx="28" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard-lg" />
      <text x="280" y="60" text-anchor="middle" fill="${TOKENS.pink}" font-size="32" class="text-coolvetica">what kind of sour are you?</text>
      <text x="280" y="90" text-anchor="middle" fill="${TOKENS.muted}" font-size="18" class="text-schoolbell">be honest</text>
      <rect x="40" y="130" width="480" height="50" rx="25" fill="#FFF36A" class="stroke-charcoal" />
      <text x="60" y="162" fill="${TOKENS.charcoal}" font-size="18" class="text-schoolbell">Sour &amp; Savage →</text>
      <rect x="40" y="200" width="480" height="50" rx="25" fill="#F6E9DE" class="stroke-charcoal" />
      <text x="60" y="232" fill="${TOKENS.charcoal}" font-size="18" class="text-schoolbell">Sweet but Psycho →</text>
      <rect x="40" y="270" width="480" height="50" rx="25" fill="#F5EAFB" class="stroke-charcoal" />
      <text x="60" y="302" fill="${TOKENS.charcoal}" font-size="18" class="text-schoolbell">Spicy Drama →</text>
      <rect x="40" y="340" width="480" height="50" rx="25" fill="#F0EC84" class="stroke-charcoal" />
      <text x="60" y="372" fill="${TOKENS.charcoal}" font-size="18" class="text-schoolbell">Lowkey Tangy →</text>
      <text x="280" y="580" text-anchor="middle" fill="${TOKENS.muted}" font-size="14" class="text-schoolbell">no thanks take me to website</text>
    </g>

    <!-- Screen 2: Lead Capture -->
    <g id="Popup_Screen_2" transform="translate(680, 80)">
      <rect width="560" height="640" rx="28" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard-lg" />
      <text x="280" y="60" text-anchor="middle" fill="${TOKENS.pink}" font-size="32" class="text-coolvetica">You're Sour &amp; Savage</text>
      <text x="280" y="95" text-anchor="middle" fill="${TOKENS.pink}" font-size="20" class="text-schoolbell">take 5% off. you've earned it</text>
      <rect x="40" y="160" width="480" height="50" rx="25" fill="${TOKENS.sage}" class="stroke-charcoal" />
      <text x="60" y="192" fill="${TOKENS.muted}" font-size="16" class="text-schoolbell">your email</text>
      <rect x="40" y="230" width="480" height="50" rx="25" fill="${TOKENS.sage}" class="stroke-charcoal" />
      <text x="60" y="262" fill="${TOKENS.muted}" font-size="16" class="text-schoolbell">your phone number</text>
      <rect x="40" y="320" width="480" height="54" rx="27" fill="${TOKENS.pink}" class="stroke-charcoal shadow-hard" />
      <text x="280" y="355" text-anchor="middle" fill="${TOKENS.white}" font-size="20" class="text-schoolbell">unlock my 5%</text>
      <text x="280" y="420" text-anchor="middle" fill="${TOKENS.muted}" font-size="14" class="text-schoolbell">no spam, just sour things :)</text>
    </g>

    <!-- Screen 4: Validation Errors -->
    <g id="Popup_Screen_4" transform="translate(1300, 80)">
      <rect width="560" height="640" rx="28" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard-lg" />
      <text x="280" y="60" text-anchor="middle" fill="${TOKENS.pink}" font-size="32" class="text-coolvetica">Validation Feedback</text>
      <rect x="40" y="160" width="480" height="50" rx="25" fill="#FFF0F4" stroke="${TOKENS.pink}" stroke-width="2" />
      <text x="60" y="192" fill="${TOKENS.charcoal}" font-size="16" class="text-schoolbell">invalid@</text>
      <text x="60" y="230" fill="${TOKENS.pink}" font-size="14" class="text-schoolbell">need a real email babe</text>
      <rect x="40" y="260" width="480" height="50" rx="25" fill="#FFF0F4" stroke="${TOKENS.pink}" stroke-width="2" />
      <text x="60" y="292" fill="${TOKENS.charcoal}" font-size="16" class="text-schoolbell">123</text>
      <text x="60" y="330" fill="${TOKENS.pink}" font-size="14" class="text-schoolbell">need a valid phone for secret drops</text>
    </g>

    <!-- Screen 3: SOURBABE05 Coupon Code -->
    <g id="Popup_Screen_3" transform="translate(1920, 80)">
      <rect width="560" height="640" rx="28" fill="${TOKENS.white}" class="stroke-charcoal-thick shadow-hard-lg" />
      <text x="280" y="80" text-anchor="middle" fill="${TOKENS.pink}" font-size="36" class="text-coolvetica">you are in!</text>
      <text x="280" y="120" text-anchor="middle" fill="${TOKENS.pink}" font-size="18" class="text-schoolbell">copy the code and use at checkout</text>
      <g transform="translate(120, 200)">
        <rect width="320" height="60" rx="30" fill="${TOKENS.yellow}" class="stroke-charcoal shadow-hard" stroke-dasharray="6,4" />
        <text x="130" y="38" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="22" font-weight="bold" class="text-coolvetica">SOURBABE05</text>
        <rect x="220" y="10" width="80" height="40" rx="20" fill="${TOKENS.pink}" />
        <text x="260" y="35" text-anchor="middle" fill="${TOKENS.white}" font-size="14" class="text-coolvetica">COPY</text>
      </g>
      <rect x="40" y="320" width="480" height="54" rx="27" fill="${TOKENS.pink}" class="stroke-charcoal shadow-hard" />
      <text x="280" y="355" text-anchor="middle" fill="${TOKENS.white}" font-size="20" class="text-schoolbell">start shopping with 5% off →</text>
    </g>
  </g>
</svg>`;
}

// 7. Design System & Tokens Artboard (1440 x 2200)
function generateDesignSystemTokensSvg() {
  return `${getSvgHeader(1440, 2200, 'Artboard - Design System & Tokens')}
  <g id="Artboard_Design_System_Tokens">
    <rect width="1440" height="2200" fill="${TOKENS.sage}" />

    <text x="64" y="80" fill="${TOKENS.charcoal}" font-size="48" class="text-coolvetica">SOURBOO DESIGN SYSTEM &amp; TOKENS</text>
    <text x="64" y="115" fill="${TOKENS.pickle}" font-size="20" class="text-schoolbell">Concept A: Editorial Chaos / Snack Diary • Specification</text>

    <!-- 8 Color Tokens -->
    <g id="Tokens_Colors" transform="translate(64, 160)">
      <text x="0" y="30" fill="${TOKENS.charcoal}" font-size="24" class="text-coolvetica">1. THE 8 CORE COLOR TOKENS</text>
      <g transform="translate(0, 50)">
        <rect x="0" y="0" width="140" height="140" rx="16" fill="${TOKENS.sage}" class="stroke-charcoal" />
        <text x="70" y="170" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Sage Cream</text>
        <text x="70" y="190" text-anchor="middle" fill="${TOKENS.muted}" font-size="12" class="text-coolvetica">#E9ECD9</text>

        <rect x="160" y="0" width="140" height="140" rx="16" fill="${TOKENS.pink}" class="stroke-charcoal" />
        <text x="230" y="170" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Sourboo Pink</text>
        <text x="230" y="190" text-anchor="middle" fill="${TOKENS.muted}" font-size="12" class="text-coolvetica">#E61E6E</text>

        <rect x="320" y="0" width="140" height="140" rx="16" fill="${TOKENS.pickle}" class="stroke-charcoal" />
        <text x="390" y="170" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Pickle Green</text>
        <text x="390" y="190" text-anchor="middle" fill="${TOKENS.muted}" font-size="12" class="text-coolvetica">#4C8B1D</text>

        <rect x="480" y="0" width="140" height="140" rx="16" fill="${TOKENS.lime}" class="stroke-charcoal" />
        <text x="550" y="170" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Electric Lime</text>
        <text x="550" y="190" text-anchor="middle" fill="${TOKENS.muted}" font-size="12" class="text-coolvetica">#BFEA5A</text>

        <rect x="640" y="0" width="140" height="140" rx="16" fill="${TOKENS.yellow}" class="stroke-charcoal" />
        <text x="710" y="170" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Acid Yellow</text>
        <text x="710" y="190" text-anchor="middle" fill="${TOKENS.muted}" font-size="12" class="text-coolvetica">#FFFF88</text>

        <rect x="800" y="0" width="140" height="140" rx="16" fill="${TOKENS.amber}" class="stroke-charcoal" />
        <text x="870" y="170" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Tamarind Amber</text>
        <text x="870" y="190" text-anchor="middle" fill="${TOKENS.muted}" font-size="12" class="text-coolvetica">#C96A00</text>

        <rect x="960" y="0" width="140" height="140" rx="16" fill="${TOKENS.charcoal}" class="stroke-charcoal" />
        <text x="1030" y="170" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Charcoal</text>
        <text x="1030" y="190" text-anchor="middle" fill="${TOKENS.muted}" font-size="12" class="text-coolvetica">#171717</text>

        <rect x="1120" y="0" width="140" height="140" rx="16" fill="${TOKENS.lilac}" class="stroke-charcoal" />
        <text x="1190" y="170" text-anchor="middle" fill="${TOKENS.charcoal}" font-size="14" class="text-coolvetica">Popup Lilac</text>
        <text x="1190" y="190" text-anchor="middle" fill="${TOKENS.muted}" font-size="12" class="text-coolvetica">#EEDDEB</text>
      </g>
    </g>

    <!-- Typography Scales -->
    <g id="Tokens_Typography" transform="translate(64, 460)">
      <text x="0" y="30" fill="${TOKENS.charcoal}" font-size="24" class="text-coolvetica">2. TYPOGRAPHY SYSTEM (LOCAL TTF FONTS)</text>
      <text x="0" y="80" fill="${TOKENS.charcoal}" font-size="44" class="text-coolvetica">Coolvetica: DISPLAY &amp; HEADINGS • CRAVINGS COME FIRST</text>
      <text x="0" y="130" fill="${TOKENS.pink}" font-size="40" class="text-rascal">Rascal: Quirky Expressive Titles • sweet but psycho</text>
      <text x="0" y="180" fill="${TOKENS.pickle}" font-size="28" class="text-schoolbell">Schoolbell: Hand-drawn Marginalia &amp; Tasting Prose • mouth wants to misbehave ¬‿¬</text>
    </g>
  </g>
</svg>`;
}

// 8. Unified Master Bundle for direct Figma drag-and-drop
function generateMasterSvg() {
  return `${getSvgHeader(7800, 6400, 'Sourboo Master Artboards Bundle (Target Canvas: FKPMaN6f04sHPAkjDIjYZY)')}
  <rect width="7800" height="6400" fill="#E2E5D0" />
  <g id="Frame_01_Desktop_Homepage" transform="translate(0, 0)">
    ${generateDesktopHomeSvg().replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>
  <g id="Frame_03_Desktop_Shop" transform="translate(1600, 0)">
    ${generateDesktopShopSvg().replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>
  <g id="Frame_04_Desktop_PDP" transform="translate(3200, 0)">
    ${generateDesktopPdpSvg().replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>
  <g id="Frame_05_Desktop_About" transform="translate(4800, 0)">
    ${generateDesktopAboutSvg().replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>
  <g id="Frame_02_Mobile_Homepage" transform="translate(6400, 0)">
    ${generateMobileHomeSvg().replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>
  <g id="Frame_06_Personality_Popup" transform="translate(1600, 3600)">
    ${generatePersonalityPopupSvg().replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>
  <g id="Frame_07_Design_System_Tokens" transform="translate(4400, 3600)">
    ${generateDesignSystemTokensSvg().replace(/<\?xml[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>
</svg>`;
}

function generateAllArtboards() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, '01-desktop-homepage.svg'), generateDesktopHomeSvg(), 'utf-8');
  console.log('[OK] Generated 01-desktop-homepage.svg');

  fs.writeFileSync(path.join(OUTPUT_DIR, '02-mobile-homepage.svg'), generateMobileHomeSvg(), 'utf-8');
  console.log('[OK] Generated 02-mobile-homepage.svg');

  fs.writeFileSync(path.join(OUTPUT_DIR, '03-desktop-shop.svg'), generateDesktopShopSvg(), 'utf-8');
  console.log('[OK] Generated 03-desktop-shop.svg');

  fs.writeFileSync(path.join(OUTPUT_DIR, '04-desktop-pdp.svg'), generateDesktopPdpSvg(), 'utf-8');
  console.log('[OK] Generated 04-desktop-pdp.svg');

  fs.writeFileSync(path.join(OUTPUT_DIR, '05-desktop-about.svg'), generateDesktopAboutSvg(), 'utf-8');
  console.log('[OK] Generated 05-desktop-about.svg');

  fs.writeFileSync(path.join(OUTPUT_DIR, '06-personality-popup.svg'), generatePersonalityPopupSvg(), 'utf-8');
  console.log('[OK] Generated 06-personality-popup.svg');

  fs.writeFileSync(path.join(OUTPUT_DIR, '07-design-system-tokens.svg'), generateDesignSystemTokensSvg(), 'utf-8');
  console.log('[OK] Generated 07-design-system-tokens.svg');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'sourboo-master-figma.svg'), generateMasterSvg(), 'utf-8');
  console.log('[OK] Generated sourboo-master-figma.svg');
}

if (require.main === module) {
  generateAllArtboards();
}

module.exports = {
  generateAllArtboards,
  generateDesktopHomeSvg,
  generateMobileHomeSvg,
  generateDesktopShopSvg,
  generateDesktopPdpSvg,
  generateDesktopAboutSvg,
  generatePersonalityPopupSvg,
  generateDesignSystemTokensSvg,
  generateMasterSvg
};
