class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }
  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }
  toRgb() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
  }
  clamp(value) {
    return Math.max(0, Math.min(255, value));
  }
  multiply(matrix) {
    const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
    const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
    const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }
  hueRotate(angle = 0) {
    angle = (angle / 180) * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.140,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }
  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value), 0.769 - 0.769 * (1 - value), 0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value), 0.686 + 0.314 * (1 - value), 0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value), 0.534 - 0.534 * (1 - value), 0.131 + 0.869 * (1 - value),
    ]);
  }
  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value, 0.715 - 0.715 * value, 0.072 - 0.072 * value,
      0.213 - 0.213 * value, 0.715 + 0.285 * value, 0.072 - 0.072 * value,
      0.213 - 0.213 * value, 0.715 - 0.715 * value, 0.072 + 0.928 * value,
    ]);
  }
  brightness(value = 1) {
    this.multiply([value, 0, 0, 0, value, 0, 0, 0, value]);
  }
  contrast(value = 1) {
    this.multiply([value, 0, 0, 0, value, 0, 0, 0, value]);
  }
  invert(value = 1) {
    this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
  }
}

class Solver {
  constructor(target) {
    this.target = target;
    this.targetHSL = this.targetToHsl();
  }
  targetToHsl() {
    const r = this.target.r / 255;
    const g = this.target.g / 255;
    const b = this.target.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 100, s: s * 100, l: l * 100 };
  }
  solve() {
    let best = { loss: Infinity, filter: null };
    for (let i = 0; i < 15; i++) {
      const res = this.solveNarrow();
      if (res.loss < best.loss) best = res;
      if (best.loss < 1) break;
    }
    return best;
  }
  solveNarrow() {
    // Generate initial values
    let A = [100, 50, 1000, 30, 100, 100]; // invert, sepia, saturate, hue, brightness, contrast
    // Simple random search
    let bestLoss = Infinity;
    let bestA = null;
    for (let iter = 0; iter < 10000; iter++) {
      let cand = [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 2000,
        Math.random() * 360,
        80 + Math.random() * 40,
        80 + Math.random() * 40
      ];
      let color = new Color(0, 0, 0);
      color.invert(cand[0] / 100);
      color.sepia(cand[1] / 100);
      color.saturate(cand[2] / 100);
      color.hueRotate(cand[3]);
      color.brightness(cand[4] / 100);
      color.contrast(cand[5] / 100);
      let loss = Math.abs(color.r - this.target.r) + Math.abs(color.g - this.target.g) + Math.abs(color.b - this.target.b);
      if (loss < bestLoss) {
        bestLoss = loss;
        bestA = cand;
        if (loss < 2) break;
      }
    }
    return { loss: bestLoss, values: bestA };
  }
}

const target = new Color(215, 245, 87);
const solver = new Solver(target);
const res = solver.solve();
console.log('Best loss:', res.loss);
console.log('Values:', res.values);
const [inv, sep, sat, hue, br, con] = res.values.map(v => Math.round(v));
console.log(`filter: brightness(0) saturate(100%) invert(${inv}%) sepia(${sep}%) saturate(${sat}%) hue-rotate(${hue}deg) brightness(${br}%) contrast(${con}%);`);
