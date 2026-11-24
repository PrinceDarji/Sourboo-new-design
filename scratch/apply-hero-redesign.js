const fs = require('fs');
const path = require('path');

// 1. Update app/product/page.tsx
const pagePath = path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app', 'product', 'page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Target the hero section inside ProductCatalogPage
const heroStart = pageContent.indexOf('<section className="sbx-shop__hero"');
const heroEnd = pageContent.indexOf('</section>', heroStart) + '</section>'.length;

if (heroStart === -1 || heroEnd === -1) {
  console.error('Could not find hero section in page.tsx');
  process.exit(1);
}

const newHeroMarkup = `<section className="sbx-shop__hero" aria-labelledby="sbx-shop-title">
        <div className="sbx-shop__hero-inner">
          {/* Left Column: Bold Editorial Typography & Product Actions */}
          <div className="sbx-shop__hero-copy">
            <p className="sbx-shop__kicker">
              <span>all sour, zero chill</span>
              <span className="sbx-shop__kicker-star" aria-hidden="true">★</span>
              <span>cravings come first</span>
            </p>

            <h1 id="sbx-shop-title" className="sbx-shop__title">
              <span className="sbx-shop__title-brand">SHOP SOURBOO</span>
              <span className="sbx-shop__title-product">PICKLED SNACKABLE GHERKINS</span>
              <span className="sbx-shop__title-accent">&amp; BUNDLES</span>
            </h1>

            <p className="sbx-shop__lede">
              <strong>India’s First Cult Sour Snack.</strong> Snackable pickled gherkins made to be bold, made to be yours.
            </p>

            {/* Shopping & Product Discovery CTAs */}
            <div className="sbx-shop__discovery-row">
              <a href="#flavours" className="sbx-shop__disco-btn sbx-shop__disco-btn--flavours">
                <span className="sbx-shop__disco-label">EXPLORE FLAVOURS ↓</span>
                <span className="sbx-shop__disco-tag">Single Jars • ₹399</span>
              </a>
              <a href="#bundles" className="sbx-shop__disco-btn sbx-shop__disco-btn--bundles">
                <span className="sbx-shop__disco-label">CRUNCH BUNDLES ↓</span>
                <span className="sbx-shop__disco-tag">Save up to ₹297</span>
              </a>
            </div>

            {/* Food Trust Badges - Unboxed Editorial Badges */}
            <div className="sbx-shop__badges-row">
              <span className="sbx-shop__badge-item">100% VEGETARIAN</span>
              <span className="sbx-shop__badge-bullet" aria-hidden="true">★</span>
              <span className="sbx-shop__badge-item">CRAFT FERMENTED BRINE</span>
              <span className="sbx-shop__badge-bullet" aria-hidden="true">★</span>
              <span className="sbx-shop__badge-item">CRINKLE-CUT CRUNCH</span>
            </div>
          </div>

          {/* Right Column: Visual Stage with Real Jars */}
          <div className="sbx-shop__hero-stage" aria-label="Sourboo Product Jars">
            <div className="sbx-shop__stage-jars">
              <div className="sbx-shop__jar-unit sbx-shop__jar-unit--side-eye">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/side-eye.webp"
                  alt="Side Eye Sour Jar"
                  className="sbx-shop__jar-photo"
                  width={240}
                  height={320}
                />
                <span className="sbx-shop__jar-tag sbx-shop__jar-tag--side-eye">
                  SIDE EYE SOUR
                </span>
              </div>

              <div className="sbx-shop__jar-unit sbx-shop__jar-unit--tamarin">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/tamarin-tease.webp"
                  alt="Tamarin' Tease Jar"
                  className="sbx-shop__jar-photo"
                  width={240}
                  height={320}
                />
                <span className="sbx-shop__jar-tag sbx-shop__jar-tag--tamarin">
                  TAMARIN&apos; TEASE
                </span>
              </div>
            </div>

            <div className="sbx-shop__tagline-sub">
              MOUTHS THAT MISBEHAVE
            </div>
          </div>
        </div>
      </section>`;

pageContent = pageContent.slice(0, heroStart) + newHeroMarkup + pageContent.slice(heroEnd);
fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Successfully updated app/product/page.tsx');

// 2. Update app/sourboo-shop.css
const cssPath = path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app', 'sourboo-shop.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const cssHeroStart = cssContent.indexOf('.sbx-shop__hero {');
const cssBundlesStart = cssContent.indexOf('.sbx-shop__bundles {');

if (cssHeroStart === -1 || cssBundlesStart === -1) {
  console.error('Could not find hero CSS in sourboo-shop.css');
  process.exit(1);
}

const newHeroCss = `.sbx-shop__hero {
  position: relative;
  padding: calc(var(--sbx-nav-h, 74px) + 38px) clamp(20px, 4.5vw, 64px) clamp(54px, 6.5vw, 84px);
  background: #d7f557;
  color: #083d1a;
  overflow: hidden;
  border-bottom: 2px solid rgba(8, 61, 26, 0.16);
}

.sbx-shop__hero-inner {
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
  position: relative;
  z-index: 2;
}

@media (min-width: 960px) {
  .sbx-shop__hero-inner {
    grid-template-columns: 1.15fr 0.85fr;
    gap: clamp(48px, 5.5vw, 80px);
  }
}

.sbx-shop__hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

/* Eyebrow Kicker - Clean, unboxed editorial */
.sbx-shop__kicker {
  margin: 0 0 18px;
  color: #083d1a;
  font-family: var(--font-coolvetica), 'Coolvetica', sans-serif;
  font-size: clamp(0.92rem, 1.2vw, 1.12rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.sbx-shop__kicker-star {
  color: #f50a59;
  font-size: 0.9em;
  display: inline-block;
}

/* Main Shop Title - Editorial hierarchy with generous spacing */
.sbx-shop__title {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  font-family: var(--font-coolvetica), 'Coolvetica', sans-serif;
  text-transform: uppercase;
}

.sbx-shop__title-brand {
  display: block;
  font-size: clamp(40px, 5.8vw, 76px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: 0.035em;
  color: #083d1a;
  margin-bottom: 8px;
}

.sbx-shop__title-product {
  display: block;
  font-size: clamp(26px, 3.6vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.03em;
  color: #083d1a;
  margin-bottom: 6px;
}

.sbx-shop__title-accent {
  display: block;
  font-size: clamp(26px, 3.6vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.03em;
  color: #f50a59;
}

/* Lede / Supporting copy - Spacious, clean */
.sbx-shop__lede {
  max-width: 48ch;
  margin: clamp(20px, 2.5vw, 28px) 0 0;
  font-family: var(--font-satoshi), sans-serif;
  font-size: clamp(1.1rem, 1.4vw, 1.32rem);
  line-height: 1.5;
  color: #083d1a;
  letter-spacing: 0.01em;
}

.sbx-shop__lede strong {
  font-weight: 700;
  color: #083d1a;
}

/* Product Discovery Action Buttons - Playful, bold, unboxed pills */
.sbx-shop__discovery-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-top: clamp(28px, 3.4vw, 38px);
  width: 100%;
}

.sbx-shop__disco-btn {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding: 14px 30px 15px;
  border-radius: 9999px;
  text-decoration: none;
  font-family: var(--font-coolvetica), 'Coolvetica', sans-serif;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
  min-width: 200px;
}

.sbx-shop__disco-btn--flavours {
  background: #f50a59;
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(245, 10, 89, 0.28);
}

.sbx-shop__disco-btn--flavours:hover {
  transform: translateY(-3px) rotate(-1.5deg) scale(1.02);
  box-shadow: 0 14px 28px rgba(245, 10, 89, 0.36);
}

.sbx-shop__disco-btn--bundles {
  background: #ff7a00;
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(255, 122, 0, 0.28);
}

.sbx-shop__disco-btn--bundles:hover {
  transform: translateY(-3px) rotate(1.5deg) scale(1.02);
  box-shadow: 0 14px 28px rgba(255, 122, 0, 0.36);
}

.sbx-shop__disco-label {
  font-size: clamp(1.12rem, 1.4vw, 1.32rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 1.1;
  text-transform: uppercase;
}

.sbx-shop__disco-tag {
  font-size: 0.92rem;
  opacity: 0.95;
  letter-spacing: 0.02em;
  margin-top: 3px;
  font-family: var(--font-satoshi), sans-serif;
  font-weight: 600;
}

/* Badges - Editorial typography with star accents, completely unboxed */
.sbx-shop__badges-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin-top: clamp(24px, 2.8vw, 32px);
}

.sbx-shop__badge-item {
  color: #083d1a;
  font-family: var(--font-coolvetica), 'Coolvetica', sans-serif;
  font-size: clamp(0.92rem, 1.15vw, 1.05rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.sbx-shop__badge-bullet {
  color: #f50a59;
  font-size: 0.85em;
}

/* Visual Stage - Jars as clear visual hero focus on the right */
.sbx-shop__hero-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.sbx-shop__stage-jars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(16px, 3.5vw, 32px);
  position: relative;
  width: 100%;
}

.sbx-shop__jar-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sbx-shop__jar-unit--side-eye {
  transform: rotate(-3deg);
}

.sbx-shop__jar-unit--side-eye:hover {
  transform: rotate(-1deg) scale(1.04) translateY(-6px);
}

.sbx-shop__jar-unit--tamarin {
  transform: rotate(3deg);
}

.sbx-shop__jar-unit--tamarin:hover {
  transform: rotate(1deg) scale(1.04) translateY(-6px);
}

.sbx-shop__jar-photo {
  width: clamp(150px, 19vw, 240px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 22px 30px rgba(8, 61, 26, 0.22));
}

.sbx-shop__jar-tag {
  margin-top: 14px;
  padding: 5px 16px;
  border-radius: 9999px;
  font-family: var(--font-coolvetica), 'Coolvetica', sans-serif;
  font-size: clamp(0.92rem, 1.15vw, 1.05rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffffff;
}

.sbx-shop__jar-tag--side-eye {
  background: #f50a59;
  box-shadow: 0 4px 14px rgba(245, 10, 89, 0.25);
}

.sbx-shop__jar-tag--tamarin {
  background: #ff7a00;
  box-shadow: 0 4px 14px rgba(255, 122, 0, 0.25);
}

.sbx-shop__tagline-sub {
  margin-top: 22px;
  font-family: var(--font-schoolbell), 'Schoolbell', cursive;
  font-size: clamp(1.2rem, 1.6vw, 1.5rem);
  color: #083d1a;
  letter-spacing: 0.02em;
  transform: rotate(-2deg);
  opacity: 0.9;
}

@media (max-width: 959px) {
  .sbx-shop__hero {
    padding-top: calc(var(--sbx-nav-h, 68px) + 24px);
    padding-bottom: 44px;
  }
  .sbx-shop__hero-inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .sbx-shop__hero-copy {
    width: 100%;
    align-items: flex-start;
  }
  .sbx-shop__hero-stage {
    margin-top: 10px;
    width: 100%;
  }
  .sbx-shop__stage-jars {
    justify-content: center;
    gap: 16px;
  }
  .sbx-shop__jar-photo {
    width: clamp(135px, 40vw, 185px);
  }
  .sbx-shop__discovery-row {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }
  .sbx-shop__disco-btn {
    width: 100%;
    text-align: center;
    align-items: center;
  }
}

`;

cssContent = cssContent.slice(0, cssHeroStart) + newHeroCss + cssContent.slice(cssBundlesStart);
fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully updated app/sourboo-shop.css');
