const fs = require('fs');

function getWebpSize(buffer) {
  // VP8 chunk
  const vp8 = buffer.indexOf('VP8 ');
  if (vp8 !== -1) {
    const w = buffer.readUInt16LE(vp8 + 10) & 0x3fff;
    const h = buffer.readUInt16LE(vp8 + 12) & 0x3fff;
    return { type: 'VP8', w, h, ratio: (w/h).toFixed(2) };
  }
  // VP8L chunk (lossless)
  const vp8l = buffer.indexOf('VP8L');
  if (vp8l !== -1) {
    const b0 = buffer[vp8l + 5];
    const b1 = buffer[vp8l + 6];
    const b2 = buffer[vp8l + 7];
    const b3 = buffer[vp8l + 8];
    const w = 1 + (((b1 & 0x3f) << 8) | b0);
    const h = 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
    return { type: 'VP8L', w, h, ratio: (w/h).toFixed(2) };
  }
  // VP8X chunk (extended)
  const vp8x = buffer.indexOf('VP8X');
  if (vp8x !== -1) {
    const w = 1 + buffer.readUIntLE(vp8x + 8, 3);
    const h = 1 + buffer.readUIntLE(vp8x + 11, 3);
    return { type: 'VP8X', w, h, ratio: (w/h).toFixed(2) };
  }
  return null;
}

const files = [
  'public/about/section-six-top-1.webp',
  'public/about/section-six-top-2.webp',
  'public/about/section-six-top-3.webp',
  'public/recipe-1.jpg'
];

for (const f of files) {
  const buf = fs.readFileSync('repo/sourboo-final-main/' + f);
  if (f.endsWith('.webp')) {
    console.log(f, getWebpSize(buf));
  } else {
    // jpg size probe
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== 0xff) break;
      const marker = buf[offset + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        const h = buf.readUInt16BE(offset + 5);
        const w = buf.readUInt16BE(offset + 7);
        console.log(f, { type: 'JPEG', w, h, ratio: (w/h).toFixed(2) });
        break;
      }
      const len = buf.readUInt16BE(offset + 2);
      offset += 2 + len;
    }
  }
}
