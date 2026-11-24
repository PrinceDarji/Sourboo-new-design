const fs = require('fs');

const path = 'repo/sourboo-final-main/app/sourboo-story.css';
let css = fs.readFileSync(path, 'utf8');

const newStyles = `
/* --------------------------------------------------------------------------
   EDITORIAL NARRATIVE & SOUR MANIFESTO STYLES (No boxes, no cropped images)
   -------------------------------------------------------------------------- */

.sb-story-tagline {
  font-family: var(--font-coolvetica), sans-serif;
  color: var(--sbx-purple);
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: inline-block;
}

.sb-story-palate-bridge {
  margin-top: clamp(48px, 7vw, 90px);
  padding-top: clamp(32px, 5vw, 60px);
  border-top: 2px dashed rgba(255, 255, 255, 0.35);
  max-width: 820px;
}

.sb-story-palate-bridge__heading {
  font-family: var(--font-coolvetica), sans-serif;
  font-size: clamp(2.2rem, 4.8vw, 3.8rem);
  color: #ffffff;
  margin: 0 0 16px;
  line-height: 1.05;
}

.sb-story-palate-bridge__text {
  font-family: var(--font-satoshi), sans-serif;
  font-size: clamp(1.15rem, 1.9vw, 1.45rem);
  line-height: 1.5;
  color: #ffffff;
  opacity: 0.95;
  margin: 0;
}

.sb-story-editorial-gallery {
  margin-top: clamp(40px, 6vw, 70px);
  width: 100%;
}

.sb-story-editorial-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: clamp(28px, 4vw, 44px);
  align-items: start;
}

@media (min-width: 640px) {
  .sb-story-editorial-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .sb-story-editorial-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(20px, 2.5vw, 36px);
  }
}

.sb-story-editorial-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sb-story-editorial-item:hover {
  transform: translateY(-6px) scale(1.02);
}

.sb-story-editorial-item--1 {
  transform: rotate(-1.5deg);
}

.sb-story-editorial-item--2 {
  transform: rotate(1.2deg);
  margin-top: clamp(0px, 3vw, 30px);
}

.sb-story-editorial-item--3 {
  transform: rotate(-1.2deg);
}

.sb-story-editorial-item--dish {
  transform: rotate(1.5deg);
  margin-top: clamp(0px, 2.5vw, 24px);
}

.sb-story-editorial-frame {
  width: 100%;
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(139, 92, 246, 0.16);
  background: transparent;
  display: flex;
  justify-content: center;
}

.sb-story-editorial-img {
  width: 100%;
  height: auto;
  max-width: 100%;
  display: block;
  object-fit: contain; /* Complete original image, absolutely no cropping */
}

.sb-story-editorial-caption {
  margin-top: 14px;
  font-family: var(--font-schoolbell), cursive;
  font-size: clamp(1.1rem, 1.6vw, 1.3rem);
  color: var(--sbx-purple, #8b5cf6);
  line-height: 1.25;
  max-width: 24ch;
}
`;

fs.writeFileSync(path, css + '\n\n' + newStyles.trim() + '\n');
console.log('Successfully updated sourboo-story.css');
