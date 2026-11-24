const fs = require('fs');

let css = fs.readFileSync('repo/sourboo-final-main/app/sourboo-home.css', 'utf8');

// 1. Replace .sbx-hero block
const heroStart = css.indexOf('.sbx-hero {');
const heroEnd = css.indexOf('/* --------------------------------------------------------------------------\r\n   Cravings intro (food first)') !== -1 
  ? css.indexOf('/* --------------------------------------------------------------------------\r\n   Cravings intro (food first)')
  : css.indexOf('/* --------------------------------------------------------------------------\n   Cravings intro (food first)');

if (heroStart !== -1 && heroEnd !== -1) {
  const newHeroCss = `.sbx-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100svh - var(--sbx-nav-h, 72px));
  padding: clamp(36px, 5vh, 64px) clamp(24px, 5vw, 84px);
  overflow: hidden;
  background: #FAF8F5;
}

.sbx-hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.sbx-hero__media::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    #FAF8F5 0%,
    rgba(250, 248, 245, 0.95) 28%,
    rgba(250, 248, 245, 0.4) 46%,
    transparent 60%
  );
  pointer-events: none;
}

.sbx-hero__frame {
  position: absolute;
  inset: 0;
}

.sbx-hero__img {
  object-fit: cover;
  object-position: 68% 30%;
  transform: scale(1.05);
}

.sbx-hero__bubbles {
  display: none;
}

.sbx-hero__copy {
  position: relative;
  z-index: 2;
  width: auto;
  max-width: 680px;
}

.sbx-hero__content {
  position: relative;
  width: 100%;
}

.sbx-hero__title {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Line 1: INDIA'S FIRST */
.sbx-hero__lead-line {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;
  font-size: clamp(2.8rem, 5.6vw, 5.8rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: #0e3e1f;
  text-transform: uppercase;
  white-space: nowrap;
}

/* 3 Pink Sparks radiating above ST */
.sbx-hero__sparks {
  position: absolute;
  top: -0.28em;
  right: -0.42em;
  width: 0.48em;
  height: 0.54em;
  overflow: visible;
  pointer-events: none;
  transform: rotate(6deg);
}

/* Line 2: CULT SOUR SNACK in Tilted Pink Banner */
.sbx-hero__banner-wrap {
  display: block;
  margin: 8px 0 14px;
}

.sbx-hero__banner {
  display: inline-block;
  background: #f50a59;
  color: #d7f557;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;
  font-size: clamp(2.6rem, 5.4vw, 5.4rem);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.01em;
  padding: 0.06em 0.28em 0.12em;
  border-radius: 4px;
  transform: rotate(-2.8deg);
  box-shadow: 0 10px 28px rgba(245, 10, 89, 0.28);
  text-transform: uppercase;
  white-space: nowrap;
}

/* Subtitle / Lede */
.sbx-hero__sub {
  display: block;
  font-family: var(--font-satoshi), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.15rem, 1.6vw, 1.45rem);
  font-weight: 700;
  line-height: 1.25;
  color: #0e3e1f;
  max-width: 440px;
  margin-top: 14px;
}

/* Shop Now CTA with Hand-drawn Lime Wave Underline */
.sbx-hero__cta-row {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: clamp(20px, 3vw, 32px);
}

.sbx-hero__shop-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sbx-hero__shop-btn:hover {
  transform: translateY(-2px) scale(1.03);
}

.sbx-hero__shop-text {
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;
  font-size: clamp(1.8rem, 2.6vw, 2.4rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #f50a59;
  line-height: 1;
}

.sbx-hero__shop-wave {
  width: 100%;
  height: 14px;
  margin-top: 3px;
  overflow: visible;
}

@media (max-width: 860px) {
  .sbx-hero {
    min-height: auto;
    padding: 28px 20px 40px;
    flex-direction: column;
    align-items: flex-start;
  }

  .sbx-hero__media {
    position: relative;
    height: 280px;
    width: calc(100% + 40px);
    margin: 20px -20px 0;
    order: 2;
  }

  .sbx-hero__media::after {
    background: linear-gradient(
      180deg,
      #FAF8F5 0%,
      transparent 25%,
      transparent 75%,
      #FAF8F5 100%
    );
  }

  .sbx-hero__copy {
    width: 100%;
    order: 1;
  }

  .sbx-hero__lead-line {
    font-size: clamp(2.4rem, 10vw, 3.8rem);
  }

  .sbx-hero__banner {
    font-size: clamp(2.2rem, 9.5vw, 3.5rem);
    padding: 0.08em 0.25em 0.14em;
  }

  .sbx-hero__sub {
    font-size: 1.1rem;
    max-width: 100%;
  }
}

`;
  css = css.substring(0, heroStart) + newHeroCss + css.substring(heroEnd);
  console.log('Replaced hero css successfully');
} else {
  console.error('Could not find hero boundaries:', heroStart, heroEnd);
}

// 2. Add .sbx-duo .sbx-jar__hint style
if (!css.includes('.sbx-duo .sbx-jar__hint')) {
  css += `\n/* Zero purple on click-to-open hint in product showcase */\n.sbx-duo .sbx-jar__hint {\n  color: #0e3e1f !important;\n  font-weight: 700 !important;\n}\n`;
  console.log('Added sbx-duo .sbx-jar__hint override');
}

fs.writeFileSync('repo/sourboo-final-main/app/sourboo-home.css', css, 'utf8');
console.log('Saved sourboo-home.css');
