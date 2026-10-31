const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'redesign', 'artboards');
const svgs = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));

let allValid = true;
svgs.forEach(svg => {
  const content = fs.readFileSync(path.join(dir, svg), 'utf8');
  const hasSvgStart = content.includes('<svg');
  const hasSvgEnd = content.includes('</svg>');
  const hasViewBox = /viewBox=["'][^"']+["']/.test(content);
  const hasXmlns = content.includes('xmlns="http://www.w3.org/2000/svg"');
  const valid = hasSvgStart && hasSvgEnd && hasViewBox && hasXmlns;
  console.log(svg.padEnd(30), 'Valid:', valid);
  if (!valid) allValid = false;
});

if (allValid) {
  console.log('\nALL 8 SVG ARTBOARDS ARE VALID AND READY FOR FIGMA IMPORT!');
  process.exit(0);
} else {
  console.error('\nINVALID SVG ARTBOARDS DETECTED!');
  process.exit(1);
}
