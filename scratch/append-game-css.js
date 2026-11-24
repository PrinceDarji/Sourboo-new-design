const fs = require('fs');

const gameCss = `
/* ==========================================================================
   Shop Taste Game / Player 1 vs Player 2 (sbx-game)
   Restored from Reference https://sourboo-new-design.vercel.app/product
   ========================================================================== */

.sbx-game {
  background: var(--sbx-lime, #d7f557);
  color: var(--sbx-purple, #8b5cf6);
  font-family: var(--font-coolvetica), 'Coolvetica', sans-serif;
  padding: clamp(60px, 8vw, 120px) clamp(16px, 4vw, 56px) clamp(80px, 10vw, 140px);
  position: relative;
  overflow: visible;
}

.sbx-game__hud {
  letter-spacing: 0.18em;
  justify-content: center;
  align-items: center;
  gap: clamp(14px, 3vw, 40px);
  margin-bottom: 24px;
  font-size: clamp(0.9rem, 1.4vw, 1.1rem);
  display: flex;
}

.sbx-game__tag {
  border-radius: 255px 18px 225px 18px / 18px 225px 18px 255px;
  background: var(--sbx-purple, #8b5cf6);
  color: #ffffff;
  font-family: var(--font-coolvetica), sans-serif;
  font-size: inherit;
  letter-spacing: 0.12em;
  cursor: pointer;
  opacity: 1;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s, color 0.2s, box-shadow 0.2s;
  border: 0;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  display: inline-flex;
}

.sbx-game__tag-cue {
  font-size: 0.7em;
}

.sbx-game__tag:hover {
  transform: rotate(-2deg) scale(1.06);
}

.sbx-game__tag.is-on {
  transform: scale(1.08) rotate(-2deg);
}

.sbx-game__tag--p1.is-on {
  background: var(--sbx-purple, #8b5cf6);
  color: #d7f557;
}

.sbx-game__tag--p2.is-on {
  background: var(--sbx-pink, #e81b6d);
  color: #ffffff;
}

.sbx-game__coin {
  background: radial-gradient(circle at 35% 30%, #ffffff, #ffe600 40%, var(--sbx-pink, #e81b6d));
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: 2.4s ease-in-out infinite sbx-coin;
  position: relative;
  box-shadow: inset -3px -3px rgba(139, 92, 246, 0.18);
  display: inline-block;
  flex-shrink: 0;
}

.sbx-game__coin span {
  background: rgba(139, 92, 246, 0.35);
  border-radius: 3px;
  position: absolute;
  inset: 8px 13px;
}

.sbx-game__head {
  text-align: center;
  margin-bottom: clamp(28px, 4.5vw, 52px);
}

.sbx-game__title {
  font-family: var(--font-coolvetica), 'Coolvetica', sans-serif;
  color: var(--sbx-pink, #e81b6d);
  margin: 0;
  font-size: clamp(2.8rem, 8vw, 6.5rem);
  font-weight: 400;
  line-height: 0.95;
  text-transform: lowercase;
}

.sbx-game__sub {
  font-family: var(--font-schoolbell), 'Schoolbell', cursive;
  color: var(--sbx-purple, #8b5cf6);
  margin: 10px 0 0;
  font-size: clamp(1.3rem, 2.4vw, 2rem);
  line-height: 1.2;
}

.sbx-game__arena {
  grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 5vw, 80px);
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  position: relative;
  align-items: start;
}

.sbx-game__arena::before {
  content: "VS";
  color: var(--sbx-pink, #e81b6d);
  font-family: var(--font-coolvetica), sans-serif;
  pointer-events: none;
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  line-height: 1;
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translate(-50%) rotate(-8deg);
  z-index: 5;
}

.sbx-game__side {
  transition: opacity 0.4s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-direction: column;
  align-items: center;
  gap: 18px;
  display: flex;
  width: 100%;
}

.sbx-game.has-p1 .sbx-game__side--p2,
.sbx-game.has-p2 .sbx-game__side--p1 {
  opacity: 0.55;
  transform: scale(0.96);
}

.sbx-game__card {
  border: 3px solid var(--sbx-purple, #8b5cf6);
  background: var(--sbx-purple, #8b5cf6);
  width: 100%;
  max-width: 440px;
  color: #ffffff;
  box-shadow: 8px 8px 0 var(--sbx-pink, #e81b6d);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s, background-color 0.2s;
  border-radius: 28px;
  padding: 28px 22px 24px;
  box-sizing: border-box;
}

.sbx-game__side--p2 .sbx-game__card {
  background: var(--sbx-pink, #e81b6d);
  border-color: var(--sbx-pink, #e81b6d);
  box-shadow: 8px 8px 0 var(--sbx-purple, #8b5cf6);
}

.sbx-game__card.is-selected {
  background: var(--sbx-purple, #8b5cf6);
  box-shadow: 8px 8px 0 #d7f557;
}

.sbx-game__side--p2 .sbx-game__card.is-selected {
  background: var(--sbx-pink, #e81b6d);
  box-shadow: 8px 8px 0 #d7f557;
}

.sbx-game__card:hover {
  transform: translateY(-4px) rotate(-1deg);
}

.sbx-game__side--p2 .sbx-game__card:hover {
  transform: translateY(-4px) rotate(1deg);
}

.sbx-game__pick {
  width: 100%;
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: transparent;
  border: 0;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0;
  display: flex;
  position: relative;
  text-align: center;
}

.sbx-game__pick:focus-visible {
  outline-offset: 4px;
  outline: 3px solid #d7f557;
}

.sbx-game__player {
  letter-spacing: 0.12em;
  text-underline-offset: 0.16em;
  color: #d7f557;
  font-size: clamp(1.6rem, 2.6vw, 2.2rem);
  text-decoration: underline;
  font-family: var(--font-coolvetica), sans-serif;
}

.sbx-game__side--p1 .sbx-game__player {
  color: #d7f557;
}

.sbx-game__side--p2 .sbx-game__player {
  color: #ffffff;
}

.sbx-game__prompt {
  color: #ffffff;
  flex-direction: column;
  gap: 3px;
  font-family: var(--font-schoolbell), 'Schoolbell', cursive;
  font-size: clamp(1.15rem, 1.8vw, 1.45rem);
  line-height: 1.25;
  display: flex;
}

.sbx-game__key {
  letter-spacing: 0.08em;
  color: #d7f557;
  font-size: 0.95rem;
  font-family: var(--font-coolvetica), sans-serif;
  margin-top: 4px;
}

.sbx-game__key kbd {
  min-width: 26px;
  height: 26px;
  color: var(--sbx-purple, #8b5cf6);
  font-family: var(--font-coolvetica), sans-serif;
  background: #d7f557;
  border-radius: 8px 10px 7px 9px;
  place-items: center;
  margin-left: 4px;
  display: inline-grid;
  box-shadow: 0 3px #e81b6d;
  font-weight: bold;
}

.sbx-game__locked-flag {
  color: var(--sbx-purple, #8b5cf6);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: #d7f557;
  border-radius: 999px;
  margin-top: 4px;
  padding: 6px 16px;
  font-size: 0.85rem;
  font-family: var(--font-coolvetica), sans-serif;
  display: inline-flex;
}

.sbx-game__result {
  width: 100%;
  margin-top: 20px;
}

.sbx-game__result[hidden] {
  display: none;
}

.sbx-game__meters {
  gap: 10px;
  margin: 0 0 20px;
  padding: 0;
  list-style: none;
  display: grid;
}

.sbx-game__meters li {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  grid-template-columns: 80px 1fr 36px;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-family: var(--font-coolvetica), sans-serif;
  display: grid;
}

.sbx-game__meter-track {
  background: rgba(255, 255, 255, 0.28);
  border-radius: 10px 6px 12px 8px;
  height: 12px;
  position: relative;
  overflow: hidden;
}

.sbx-game__meter-fill {
  height: 100%;
  border-radius: inherit;
  background: #d7f557;
  position: absolute;
  inset: 0 auto 0 0;
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.sbx-game__side--p2 .sbx-game__meter-fill {
  background: #ffffff;
}

.sbx-game__meter-value {
  text-align: right;
  font-size: 0.95rem;
}

.sbx-game__locked {
  align-items: center;
  gap: 16px;
  display: flex;
}

.sbx-game__locked-jar {
  flex: none;
  width: 84px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sbx-game__locked-jar img {
  width: 84px;
  height: auto;
  object-fit: contain;
}

.sbx-game__locked-title {
  color: #d7f557;
  margin: 0 0 4px;
  font-size: 1.15rem;
  font-family: var(--font-coolvetica), sans-serif;
}

.sbx-game__cta {
  color: #ffffff;
  text-underline-offset: 0.12em;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-size: clamp(1.4rem, 2.4vw, 1.9rem);
  line-height: 1.1;
  text-decoration: underline;
  display: inline-block;
  cursor: pointer;
  font-family: var(--font-coolvetica), sans-serif;
}

.sbx-game__cta:hover {
  transform: rotate(-3deg) scale(1.05);
  color: #d7f557;
}

.sbx-game__closing {
  font-family: var(--font-schoolbell), cursive;
  margin: 4px 0 0;
  font-size: 1.15rem;
  color: #ffffff;
}

.sbx-game__quick-add-btn {
  background: #d7f557;
  color: var(--sbx-purple, #8b5cf6);
  border: none;
  border-radius: 9999px;
  padding: 6px 14px;
  font-size: 0.9rem;
  font-family: var(--font-coolvetica), sans-serif;
  cursor: pointer;
  margin-top: 6px;
  transition: transform 0.2s;
}

.sbx-game__quick-add-btn:hover {
  transform: scale(1.05);
}

.sbx-game__coop {
  text-align: center;
  max-width: 900px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: clamp(36px, 5vw, 60px) auto 0;
  display: flex;
}

.sbx-game__coop-header {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.sbx-game__coop-tag {
  color: var(--sbx-pink, #e81b6d);
  letter-spacing: 0.18em;
  font-size: 1.05rem;
  font-family: var(--font-coolvetica), sans-serif;
  text-transform: uppercase;
  font-weight: bold;
}

.sbx-game__coop-name {
  color: var(--sbx-purple, #8b5cf6);
  font-size: 1.35rem;
  font-family: var(--font-coolvetica), sans-serif;
}

.sbx-game__coop-desc {
  color: var(--sbx-purple, #8b5cf6);
  opacity: 0.9;
  font-family: var(--font-schoolbell), cursive;
  font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  margin: 0;
}

.sbx-game__coop-btn {
  border-radius: 9999px;
  background: var(--sbx-purple, #8b5cf6);
  color: #ffffff;
  font-family: var(--font-coolvetica), sans-serif;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s, color 0.2s;
  border: 0;
  padding: 12px 28px;
  font-size: 1.15rem;
  margin-top: 8px;
}

.sbx-game__coop-btn:hover {
  background: var(--sbx-pink, #e81b6d);
  color: #ffffff;
  transform: rotate(-2deg) scale(1.05);
}

@keyframes sbx-coin {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
}

@media (max-width: 768px) {
  .sbx-game__arena {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .sbx-game__arena::before {
    text-align: center;
    order: 1;
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    transform: rotate(-8deg);
    margin: 8px 0;
  }
  .sbx-game__side--p1 {
    order: 0;
  }
  .sbx-game__side--p2 {
    order: 2;
  }
  .sbx-game__key {
    display: none;
  }
}
`;

const path = 'repo/sourboo-final-main/app/sourboo-shop.css';
let current = fs.readFileSync(path, 'utf8');

// Replace any existing sbx-game block or append
if (current.includes('.sbx-game {')) {
  current = current.replace(/\/\* ==+[\s\S]*?Shop Taste Game[\s\S]*?@media \(max-width: 768px\)[\s\S]*?\n\}/, '');
}

fs.writeFileSync(path, current + '\n\n' + gameCss.trim() + '\n');
console.log('Successfully updated sourboo-shop.css with sbx-game styling');
