const fs = require('fs');

function cleanFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  let changed = false;
  for (const [target, replacement] of replacements) {
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Cleaned emojis in:', filePath);
  }
}

// 1. PdpInteractiveSection.tsx
cleanFile('c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/components/product/PdpInteractiveSection.tsx', [
  [
    `<span style={{ fontSize: '18px' }}>🌶️</span>`,
    `{/* eslint-disable-next-line @next/next/no-img-element */}\n                    <img src="/home/ingredients/red-chilli.png" alt="" width={24} height={24} />`
  ],
  ['<span>📦 Bundle Drop</span>', '<span>Bundle Drop</span>'],
  ['<span>⚡ Max Value</span>', '<span>Max Value</span>'],
]);

// 2. CartDrawer.tsx
cleanFile('c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/components/cart/CartDrawer.tsx', [
  ['🔒 100% secure checkout via PhonePe &amp; Shopify', '100% secure checkout via PhonePe &amp; Shopify']
]);

// 3. QuickBuyButton.tsx
cleanFile('c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/components/cart/QuickBuyButton.tsx', [
  ["{justAdded ? 'ADDED 🥒 ✓' : children || 'QUICK ADD +'}", "{justAdded ? 'ADDED ✓' : children || 'QUICK ADD +'}"]
]);

// 4. FavBaddiesReviews.tsx
cleanFile('c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/components/home/FavBaddiesReviews.tsx', [
  [
    `we’ll take that as a very good sign. 😌`,
    `we’ll take that as a very good sign.`
  ]
]);

// 5. checkout/page.tsx
cleanFile('c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/checkout/page.tsx', [
  ['🎉 Code', 'Code'],
  ['🥒', '']
]);
