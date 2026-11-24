const fs = require('fs');

// 1. Update app/product/page.tsx
const shopPath = 'c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/product/page.tsx';
let shopContent = fs.readFileSync(shopPath, 'utf8').replace(/\r\n/g, '\n');

// Replace imports: Remove FlavourDuo and TasteGame, import FlavorMatcher
shopContent = shopContent.replace(
  "import FlavourDuo from '../components/home/FlavourDuo';",
  "import FlavorMatcher from '../components/product/FlavorMatcher';"
);
shopContent = shopContent.replace(
  "import TasteGame from '../components/home/TasteGame';\n",
  ""
);

// Remove emojis from trust badges
shopContent = shopContent.replace('🌱 100% VEGETARIAN', '100% VEGETARIAN');
shopContent = shopContent.replace('⚡ CRAFT FERMENTED BRINE', 'CRAFT FERMENTED BRINE');
shopContent = shopContent.replace('🥒 CRINKLE-CUT CRUNCH', 'CRINKLE-CUT CRUNCH');

// Replace <FlavourDuo /> with <FlavorMatcher />
shopContent = shopContent.replace(
  '<FlavourDuo />',
  '<FlavorMatcher />'
);

// Remove <TasteGame id="shop-taste-game" />
shopContent = shopContent.replace(
  '<TasteGame id="shop-taste-game" />\n\n',
  ''
);
shopContent = shopContent.replace(
  '<TasteGame id="shop-taste-game" />',
  ''
);

fs.writeFileSync(shopPath, shopContent.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated app/product/page.tsx');

// 2. Append FlavorMatcher styles to app/sourboo-shop.css
const shopCssPath = 'c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/sourboo-shop.css';
let shopCss = fs.readFileSync(shopCssPath, 'utf8').replace(/\r\n/g, '\n');

const matcherCss = `
/* ==========================================================================
   FLAVOUR MATCHER (Player 1 vs Player 2) — Unboxed, Organic Arcade Experience
   ========================================================================== */
.sb-matcher-section {
  position: relative;
  width: 100%;
  padding: clamp(64px, 8vw, 108px) clamp(20px, 4vw, 40px);
  background: #FAF7F2;
  color: #1A3320;
  overflow: hidden;
}

.sb-matcher-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto clamp(36px, 5vw, 56px);
}

.sb-matcher-badge {
  display: inline-block;
  font-size: 0.88rem;
  letter-spacing: 0.08em;
  padding: 6px 18px;
  border-radius: 9999px;
  background: #083d1a;
  color: #d7f557;
  margin-bottom: 14px;
}

.sb-matcher-title {
  margin: 0;
  color: #e81b6d;
  font-size: clamp(2.6rem, 5.5vw, 4.8rem);
  line-height: 0.95;
}

.sb-matcher-sub {
  margin: 10px 0 0;
  color: #2F4918;
  font-size: clamp(1.4rem, 2.4vw, 2.2rem);
}

/* Switcher Buttons Pill */
.sb-matcher-switch-wrap {
  display: inline-flex;
  gap: 12px;
  margin-top: 24px;
  background: rgba(8, 61, 26, 0.08);
  padding: 6px;
  border-radius: 9999px;
  flex-wrap: wrap;
  justify-content: center;
}

.sb-matcher-switch-btn {
  padding: 10px 24px;
  font-size: 1.1rem;
  border-radius: 9999px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.sb-matcher-switch-btn.active {
  background: #e81b6d;
  color: #ffffff;
  border-color: #083d1a;
  box-shadow: 2px 2px 0 #083d1a;
}

.sb-matcher-switch-btn:not(.active) {
  background: transparent;
  color: #083d1a;
}

.sb-matcher-switch-btn:not(.active):hover {
  background: rgba(255, 255, 255, 0.7);
}

/* Stage Layout — Two Columns, Completely Unboxed */
.sb-matcher-stage {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(40px, 6vw, 72px);
  align-items: center;
  max-width: 1080px;
  margin: 0 auto;
}

@media (min-width: 820px) {
  .sb-matcher-stage {
    grid-template-columns: 1.05fr 0.95fr;
  }
}

.sb-matcher-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.sb-matcher-col--selection {
  background: transparent;
  padding: 20px;
}

/* Left: Character & Meters */
.sb-matcher-character-wrap {
  margin-bottom: 16px;
}

.sb-matcher-character {
  width: min(65vw, 240px);
  height: auto;
  margin: 0 auto;
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.sb-matcher-character:hover {
  transform: scale(1.04) rotate(-1.5deg);
}

.sb-matcher-persona {
  font-size: clamp(1.2rem, 1.8vw, 1.55rem);
  line-height: 1.25;
  color: #26140A;
  margin: 0 0 24px;
  max-width: 34ch;
}

.sb-matcher-meters {
  width: 100%;
  max-width: 380px;
  text-align: left;
}

.sb-flavor-meter-row {
  margin-bottom: 14px;
}

.sb-flavor-meter-label {
  display: flex;
  justify-content: space-between;
  font-family: var(--sbx-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: #1A3320;
  margin-bottom: 4px;
}

.sb-meter-track {
  width: 100%;
  height: 14px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.sb-meter-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sb-meter-fill--spice {
  background: #e81b6d;
}

.sb-meter-fill--sour {
  background: #4A6318;
}

.sb-meter-fill--crunch {
  background: #e81b6d;
}

.sb-meter-fill--attitude {
  background: #e81b6d;
}

.sb-meter-fill--tang {
  background: #C96A00;
}

.sb-meter-fill--hit {
  background: #e81b6d;
}

.sb-meter-fill--snaps {
  background: #C96A00;
}

/* Right: Locked Selection Jar & CTA — Unboxed */
.sb-matcher-locked-label {
  font-size: 1.4rem;
  letter-spacing: 0.04em;
  color: #e81b6d;
  margin-bottom: 12px;
  font-weight: 700;
}

.sb-matcher-locked-label--amber {
  color: #C96A00;
}

.sb-matcher-jar-stage {
  margin: 12px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sb-matcher-jar-img {
  width: auto;
  height: clamp(220px, 28vw, 300px);
  object-fit: contain;
  filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.16));
  transition: transform 0.3s ease;
}

.sb-matcher-jar-img:hover {
  transform: scale(1.05);
}

.sb-matcher-product-name {
  margin: 12px 0 4px;
  color: #083d1a;
  font-size: clamp(2rem, 3.6vw, 3rem);
  line-height: 1;
}

.sb-matcher-product-name--amber {
  color: #083d1a;
}

.sb-matcher-descriptor {
  margin: 0 0 24px;
  font-size: 1.25rem;
  color: #555555;
}

.sb-matcher-cta-wrap {
  width: 100%;
  max-width: 360px;
}

.sb-matcher-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 28px;
  font-size: 1.35rem;
  line-height: 1;
  border-radius: 9999px;
  text-decoration: none;
  border: 3px solid #083d1a;
  box-shadow: 4px 4px 0 #083d1a;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.sb-matcher-cta:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #083d1a;
}

.sb-matcher-cta:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 #083d1a;
}

.sb-matcher-cta--side-eye {
  background: #e81b6d;
  color: #ffffff;
}

.sb-matcher-cta--tamarin {
  background: #083d1a;
  color: #d7f557;
}
`;

if (!shopCss.includes('FLAVOUR MATCHER (Player 1 vs Player 2)')) {
  shopCss += '\n' + matcherCss;
  fs.writeFileSync(shopCssPath, shopCss.replace(/\n/g, '\r\n'), 'utf8');
  console.log('Successfully appended FlavorMatcher CSS to app/sourboo-shop.css');
} else {
  console.log('FlavorMatcher CSS already present');
}
