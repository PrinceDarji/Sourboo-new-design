const fs = require('fs');

const checkoutHtml = fs.readFileSync('_checkout.txt', 'utf8');

// Find all script chunks mentioned in checkout
const scripts = [...checkoutHtml.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log('Checkout scripts:', scripts);

// Check inline scripts for checkout
const inlineScripts = [...checkoutHtml.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('Checkout inline scripts count:', inlineScripts.length);

// Let's search checkoutHtml for keywords like razorpay, cashfree, stripe, phonepe, api, form, order, etc.
const keywords = ['razorpay', 'stripe', 'cashfree', 'phonepe', 'payu', 'order', 'payment', 'api/', 'shiprocket', 'delhivery'];
keywords.forEach(kw => {
  const count = (checkoutHtml.match(new RegExp(kw, 'gi')) || []).length;
  console.log(`Keyword "${kw}": ${count} occurrences`);
});

// Let's print snippets containing keywords
keywords.forEach(kw => {
  let idx = 0;
  while ((idx = checkoutHtml.toLowerCase().indexOf(kw, idx)) !== -1) {
    console.log(`\nMatch for "${kw}" at ${idx}:`);
    console.log(checkoutHtml.substring(Math.max(0, idx - 100), Math.min(checkoutHtml.length, idx + 200)));
    idx += kw.length + 50;
  }
});
