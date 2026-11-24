const fs = require('fs');

const filePath = 'repo/sourboo-final-main/app/sourboo-home.css';
let css = fs.readFileSync(filePath, 'utf8');

const targetDesktop = `/* Sour Sampler - UNBOXED: Purple oval removed, natural on lime background */
.sbx-duo__both {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 5vw, 64px);
  max-width: 1040px;
  margin: clamp(48px, 7vw, 90px) auto 0;
  padding: 0 20px;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  color: #240842;
}

.sbx-duo__both-img {
  position: relative;
  flex: 0 0 clamp(160px, 22vw, 270px);
  aspect-ratio: 1;
  filter: drop-shadow(0 20px 30px rgba(44, 10, 82, 0.18));
}

.sbx-duo__both-img img {
  object-fit: contain;
}

.sbx-duo__both-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.sbx-duo__both-name {
  margin: 0 0 8px;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;
  font-size: clamp(2.4rem, 4.2vw, 3.8rem);
  line-height: 1;
  font-weight: 700;
  color: #2c0a52;
}

.sbx-duo__both-desc {
  margin: 0 0 20px;
  font-family: var(--font-satoshi), sans-serif;
  font-size: clamp(1.1rem, 1.5vw, 1.35rem);
  font-weight: 600;
  color: #240842;
  line-height: 1.4;
}

.sbx-duo__both .sbx-duo__actions {
  justify-content: flex-start;
  gap: 16px;
}

.sbx-duo__add--both {
  padding: 14px 34px !important;
  border-radius: 9999px !important;
  background: #3b1473 !important;
  color: #ffffff !important;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif !important;
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  border: none !important;
  box-shadow: 0 8px 24px rgba(59, 20, 115, 0.28) !important;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease !important;
  cursor: pointer;
}

.sbx-duo__add--both:hover {
  transform: translateY(-3px) scale(1.03) !important;
  background: #d40055 !important;
  color: #ffffff !important;
  box-shadow: 0 12px 28px rgba(212, 0, 85, 0.36) !important;
}

.sbx-duo__both .sbx-text-link {
  color: #2c0a52 !important;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: underline;
  transition: transform 0.2s ease, color 0.2s;
}

.sbx-duo__both .sbx-text-link:hover {
  color: #d40055 !important;
  transform: translateX(4px);
}`;

const replacementDesktop = `/* Sour Sampler - Large, visually prominent organic oval preserving screenshot design */
.sbx-duo__both {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(28px, 4.5vw, 64px);
  max-width: clamp(940px, 82vw, 1180px);
  margin: clamp(52px, 7vw, 92px) auto 0;
  padding: clamp(34px, 4.5vw, 58px) clamp(36px, 5.5vw, 84px);
  border-radius: 48% 52% 46% 54% / 60% 56% 44% 40%;
  background: var(--sbx-purple, #8b5cf6);
  color: #ffffff;
  backdrop-filter: none;
  box-shadow: 0 18px 42px rgba(109, 40, 217, 0.24);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sbx-duo__both-img {
  position: relative;
  flex: 0 0 clamp(190px, 22vw, 290px);
  aspect-ratio: 1;
  filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.24));
}

.sbx-duo__both-img img {
  object-fit: contain;
}

.sbx-duo__both-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 600px;
}

.sbx-duo__both-name {
  margin: 0 0 12px;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;
  font-size: clamp(3rem, 5vw, 4.5rem);
  line-height: 1;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.02em;
}

.sbx-duo__both-desc {
  margin: 0 0 24px;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;
  font-size: clamp(1.2rem, 1.8vw, 1.55rem);
  font-weight: 600;
  color: #ffffff;
  line-height: 1.35;
  letter-spacing: 0.02em;
  opacity: 0.98;
}

.sbx-duo__both .sbx-duo__actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: clamp(14px, 2vw, 24px);
  flex-wrap: wrap;
}

.sbx-duo__add--both {
  padding: clamp(13px, 1.5vw, 17px) clamp(26px, 3vw, 40px) !important;
  border-radius: 9999px !important;
  background: var(--sbx-lime, #d7f557) !important;
  color: var(--sbx-purple, #8b5cf6) !important;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif !important;
  font-size: clamp(1.15rem, 1.45vw, 1.35rem) !important;
  font-weight: 700 !important;
  letter-spacing: 0.04em !important;
  border: none !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16) !important;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, box-shadow 0.2s ease !important;
  cursor: pointer;
}

.sbx-duo__add--both:hover {
  background: #ffffff !important;
  color: var(--sbx-purple, #8b5cf6) !important;
  transform: translateY(-2px) scale(1.04) !important;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22) !important;
}

.sbx-duo__both .sbx-text-link {
  color: #ffffff !important;
  font-family: var(--font-coolvetica), var(--sbx-display), sans-serif;
  font-size: clamp(1.15rem, 1.45vw, 1.35rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: underline;
  text-decoration-color: #f50a59;
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
  transition: transform 0.2s ease, color 0.2s;
}

.sbx-duo__both .sbx-text-link:hover {
  color: var(--sbx-lime, #d7f557) !important;
  transform: translateX(4px);
}`;

const targetMobile = `  .sbx-duo__both {
    flex-direction: column;
    margin: 48px 20px 0;
    text-align: center;
    gap: 20px;
  }

  .sbx-duo__both-copy {
    align-items: center;
    text-align: center;
  }

  .sbx-duo__both .sbx-duo__actions {
    justify-content: center;
  }`;

const replacementMobile = `  .sbx-duo__both {
    flex-direction: column;
    margin: 44px 16px 0;
    padding: clamp(34px, 7vw, 50px) clamp(22px, 5vw, 36px);
    border-radius: 40% 60% 50% 50% / 20% 22% 18% 20%;
    text-align: center;
    gap: 22px;
    max-width: 520px;
  }

  .sbx-duo__both-img {
    flex: 0 0 clamp(170px, 46vw, 240px);
    width: clamp(170px, 46vw, 240px);
  }

  .sbx-duo__both-copy {
    align-items: center;
    text-align: center;
    max-width: 100%;
  }

  .sbx-duo__both-name {
    font-size: clamp(2.4rem, 7.5vw, 3.4rem);
    margin-bottom: 8px;
  }

  .sbx-duo__both-desc {
    font-size: clamp(1.1rem, 3.8vw, 1.35rem);
    margin-bottom: 20px;
  }

  .sbx-duo__both .sbx-duo__actions {
    justify-content: center;
    gap: 16px;
  }`;

const normalizedCss = css.replace(/\r\n/g, '\n');
const normalizedTargetDesktop = targetDesktop.replace(/\r\n/g, '\n');
const normalizedTargetMobile = targetMobile.replace(/\r\n/g, '\n');

if (!normalizedCss.includes(normalizedTargetDesktop)) {
  console.error('Target desktop not found in css!');
  process.exit(1);
}
if (!normalizedCss.includes(normalizedTargetMobile)) {
  console.error('Target mobile not found in css!');
  process.exit(1);
}

let updated = normalizedCss.replace(normalizedTargetDesktop, replacementDesktop.replace(/\r\n/g, '\n'));
updated = updated.replace(normalizedTargetMobile, replacementMobile.replace(/\r\n/g, '\n'));

fs.writeFileSync(filePath, updated, 'utf8');
console.log('Successfully updated Sour Sampler styles in sourboo-home.css');
