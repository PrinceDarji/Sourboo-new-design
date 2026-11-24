const fs = require('fs');
let css = fs.readFileSync('repo/sourboo-final-main/app/sourboo-home.css', 'utf8');

const heroCss = `/* --------------------------------------------------------------------------
   Hero - Authentic Editorial Campaign Composition
   Matches Reference: "India's First Cult Sour Snack"
   -------------------------------------------------------------------------- */
.sbx-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100svh - var(--sbx-nav-h, 72px));
  padding: clamp(44px, 6vh, 80px) clamp(24px, 5vw, 84px);
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
    rgba(250, 248, 245, 0.98) 42%,
    rgba(250, 248, 245, 0.72) 58%,
    rgba(250, 248, 245, 0.2) 78%,
    transparent 100%
  );
  pointer-events: none;
}

.sbx-hero__frame {
  position: absolute;
  inset: 0;
}

.sbx-hero__img {
  object-fit: cover;
  object-position: 86% 50%;
  transform: scale(1.08);
  transform-origin: center right;
}

.sbx-hero__bubbles {
  display: none;
}

.sbx-hero__copy {
  position: relative;
  z-index: 2;
  width: min(680px, 58vw);
  max-width: 100%;
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
  font-size: clamp(3.4rem, 7.4vw, 7.2rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: #0e3e1f;
  text-transform: uppercase;
}

/* 3 Pink Sparks radiating above ST */
.sbx-hero__sparks {
  position: absolute;
  top: -0.26em;
  right: -0.42em;
  width: 0.54em;
  height: 0.6em;
  overflow: visible;
  pointer-events: none;
  transform: rotate(6deg);
}

/* Line 2: CULT SOUR SNACK in Tilted Pink Banner */
.sbx-hero__banner-wrap {
  display: block;
  margin: 10px 0 16px;
}

.sbx-hero__banner {
  display: inline-block;
  background: #f50a59;
  color: #d7f557;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;
  font-size: clamp(3.2rem, 7.2vw, 6.8rem);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.01em;
  padding: 0.08em 0.36em 0.12em;
  border-radius: 4px;
  transform: rotate(-3deg);
  box-shadow: 0 12px 32px rgba(245, 10, 89, 0.32);
  text-transform: uppercase;
}

/* Subtitle / Lede */
.sbx-hero__sub {
  display: block;
  font-family: var(--font-satoshi), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.2rem, 1.8vw, 1.55rem);
  font-weight: 700;
  line-height: 1.25;
  color: #0e3e1f;
  max-width: 460px;
  margin-top: 18px;
}

/* Shop Now CTA with Hand-drawn Lime Wave Underline */
.sbx-hero__cta-row {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: clamp(24px, 3.8vw, 38px);
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
  font-size: clamp(1.9rem, 2.9vw, 2.6rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #f50a59;
  line-height: 1;
}

.sbx-hero__shop-wave {
  width: 100%;
  height: 16px;
  margin-top: 3px;
  overflow: visible;
}

@media (max-width: 860px) {
  .sbx-hero {
    min-height: auto;
    padding: 36px 20px 48px;
    align-items: flex-start;
  }

  .sbx-hero__copy {
    width: 100%;
  }

  .sbx-hero__media::after {
    background: linear-gradient(
      180deg,
      #FAF8F5 0%,
      rgba(250, 248, 245, 0.95) 55%,
      rgba(250, 248, 245, 0.65) 80%,
      transparent 100%
    );
  }

  .sbx-hero__lead-line {
    font-size: clamp(2.8rem, 11vw, 4.4rem);
  }

  .sbx-hero__banner {
    font-size: clamp(2.6rem, 10.5vw, 4.2rem);
  }

  .sbx-hero__sub {
    font-size: 1.15rem;
    max-width: 100%;
  }
}
`;

const startMarker = '/* --------------------------------------------------------------------------\r\n   Hero';
const altStartMarker = '/* --------------------------------------------------------------------------\n   Hero';
let startIdx = css.indexOf(startMarker);
if (startIdx === -1) startIdx = css.indexOf(altStartMarker);

const endMarker = '/* --------------------------------------------------------------------------\r\n   Cravings intro';
const altEndMarker = '/* --------------------------------------------------------------------------\n   Cravings intro';
let endIdx = css.indexOf(endMarker, startIdx);
if (endIdx === -1) endIdx = css.indexOf(altEndMarker, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  css = css.slice(0, startIdx) + heroCss + '\r\n\r\n' + css.slice(endIdx);
  fs.writeFileSync('repo/sourboo-final-main/app/sourboo-home.css', css, 'utf8');
  console.log('Successfully replaced Hero CSS in sourboo-home.css!');
} else {
  console.log('Indices not found:', startIdx, endIdx);
}
