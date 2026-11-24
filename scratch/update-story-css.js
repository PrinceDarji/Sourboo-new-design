const fs = require('fs');

const cssPath = 'c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/sourboo-story.css';
let content = fs.readFileSync(cssPath, 'utf8');
content = content.replace(/\r\n/g, '\n');

// 1. Update Hero image styling: Remove forced blob border-radius, make it natural editorial food photo
const oldHeroBlob = `.sb-story-hero__blob-frame {
  position: relative;
  width: min(420px, 100%);
  aspect-ratio: 1 / 1.15;
  border-radius: 46% 54% 50% 50% / 54% 48% 52% 46%;
  overflow: hidden;
  background: var(--sbx-purple);
  box-shadow:
    0 24px 60px rgba(76, 29, 149, 0.25),
    0 4px 12px rgba(0, 0, 0, 0.1);
  transform: rotate(-1.5deg);
  transition: transform 0.4s var(--sbx-spring);
}`;

const newHeroBlob = `/* Editorial natural food brand photography — natural proportions, soft angles */
.sb-story-hero__blob-frame {
  position: relative;
  width: min(420px, 100%);
  aspect-ratio: 4 / 5;
  border-radius: 18px;
  overflow: hidden;
  background: var(--sbx-purple);
  box-shadow:
    0 24px 60px rgba(76, 29, 149, 0.22),
    0 6px 16px rgba(0, 0, 0, 0.08);
  transform: rotate(-1.5deg);
  transition: transform 0.4s var(--sbx-spring);
}`;

if (content.includes(oldHeroBlob)) {
  content = content.replace(oldHeroBlob, newHeroBlob);
  console.log('Updated hero photo frame');
} else {
  console.log('oldHeroBlob not found');
}

// 2. Update Act 2: Flavour obsession stream photos — Remove uniform pebble shapes, use editorial pacing
const oldStepFrames = `/* Organic curved pebble shapes for the 3 journey photos — zero boxes */
.sb-story-step__frame {
  position: relative;
  width: min(290px, 85vw);
  aspect-ratio: 1 / 1.15;
  overflow: hidden;
  box-shadow: 0 20px 48px rgba(32, 4, 18, 0.35);
  transition: transform 0.35s var(--sbx-spring);
}

.sb-story-step__frame--1 {
  border-radius: 42% 58% 60% 40% / 54% 46% 54% 46%;
  transform: rotate(-2deg);
}

.sb-story-step__frame--2 {
  border-radius: 56% 44% 48% 52% / 46% 54% 46% 54%;
  transform: rotate(1.5deg);
}

.sb-story-step__frame--3 {
  border-radius: 48% 52% 58% 42% / 52% 48% 52% 48%;
  transform: rotate(-1deg);
}`;

const newStepFrames = `/* Natural editorial food photography presentation — varied proportions, soft angles, zero blob cages */
.sb-story-step__frame {
  position: relative;
  width: min(320px, 88vw);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 48px rgba(32, 4, 18, 0.28);
  transition: transform 0.35s var(--sbx-spring);
}

.sb-story-step__frame--1 {
  aspect-ratio: 4 / 5;
  transform: rotate(-1.8deg);
}

.sb-story-step__frame--2 {
  aspect-ratio: 16 / 11;
  transform: rotate(1.4deg);
  margin-top: 14px;
}

.sb-story-step__frame--3 {
  aspect-ratio: 4 / 5;
  transform: rotate(-1.2deg);
}`;

if (content.includes(oldStepFrames)) {
  content = content.replace(oldStepFrames, newStepFrames);
  console.log('Updated journey photo frames');
} else {
  console.log('oldStepFrames not found');
}

// 3. Update Act 4: The Problem Droplets — Remove circular/droplet clipping so GIFs breathe naturally
const oldDroplets = `/* Fluid organic droplet silhouettes — zero boxes */
.sb-story-droplet__media {
  width: clamp(130px, 20vw, 180px);
  aspect-ratio: 1 / 1;
  border-radius: 50% 50% 40% 60% / 55% 45% 55% 45%;
  overflow: hidden;
  background: #eedef5;
  box-shadow: 0 16px 36px rgba(76, 29, 149, 0.16);
  transition: transform 0.3s var(--sbx-spring);
}

.sb-story-droplet:hover .sb-story-droplet__media {
  transform: scale(1.06) rotate(-2deg);
}

.sb-story-droplet__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}`;

const newDroplets = `/* Natural food visuals with organic breathing room — no rigid circles or blob cages */
.sb-story-droplet__media {
  width: clamp(140px, 20vw, 190px);
  aspect-ratio: 1 / 1;
  overflow: visible;
  transition: transform 0.3s var(--sbx-spring);
}

.sb-story-droplet:hover .sb-story-droplet__media {
  transform: scale(1.05) rotate(-2deg);
}

.sb-story-droplet__media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 14px 28px rgba(76, 29, 149, 0.18));
}`;

if (content.includes(oldDroplets)) {
  content = content.replace(oldDroplets, newDroplets);
  console.log('Updated problem droplets');
} else {
  console.log('oldDroplets not found');
}

// 4. Update Act 5: Manifesto Hero Dish — Natural editorial layout
const oldDishShape = `/* Pebble oval for hero dish — zero boxes */
.sb-story-manifesto__dish-shape {
  width: min(340px, 90vw);
  aspect-ratio: 1 / 1.1;
  border-radius: 46% 54% 50% 50% / 54% 48% 52% 46%;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(76, 29, 149, 0.22);
  transition: transform 0.3s var(--sbx-spring);
}`;

const newDishShape = `/* Natural editorial hero food dish — crisp, clean, premium presentation */
.sb-story-manifesto__dish-shape {
  width: min(360px, 92vw);
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(76, 29, 149, 0.22);
  transform: rotate(-1deg);
  transition: transform 0.3s var(--sbx-spring);
}`;

if (content.includes(oldDishShape)) {
  content = content.replace(oldDishShape, newDishShape);
  console.log('Updated manifesto dish shape');
} else {
  console.log('oldDishShape not found');
}

// 5. Add / Update eyes styling
const eyesStyles = `
/* --------------------------------------------------------------------------
   EYES ANIMATION SEQUENCE (Restored Moving Eyes)
   -------------------------------------------------------------------------- */
.sb-eyes-sequence-container {
  position: relative;
  width: min(340px, 85vw);
  height: clamp(80px, 14vw, 130px);
}

.sb-story-problem__eyes-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto clamp(20px, 4vw, 36px);
}

.sb-story-problem__eyes {
  position: relative;
  width: min(340px, 82vw);
  height: clamp(80px, 14vw, 130px);
}

.sb-story-crave__eyes {
  position: relative;
  z-index: 2;
  width: min(340px, 85vw);
  height: clamp(80px, 14vw, 130px);
  margin-bottom: -15px;
  display: flex;
  justify-content: center;
}

.sb-story-crave__eyes-img {
  position: relative;
  width: 100%;
  height: 100%;
}
`;

// Replace old .sb-story-crave__eyes block
const oldCraveEyes = `.sb-story-crave__eyes {
  position: relative;
  z-index: 2;
  margin-bottom: -15px;
}`;

if (content.includes(oldCraveEyes)) {
  content = content.replace(oldCraveEyes, eyesStyles.trim());
  console.log('Replaced .sb-story-crave__eyes with full eyes styles');
} else {
  content += '\n' + eyesStyles;
  console.log('Appended eyes styles to sourboo-story.css');
}

fs.writeFileSync(cssPath, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated app/sourboo-story.css');
