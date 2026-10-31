const fs = require('fs');

const pages = ['homepage.html', '_checkout.txt', 'popup.html'];

pages.forEach(p => {
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  console.log(`\n=== TRACKING AUDIT: ${p} ===`);

  const metaPixel = content.includes('fbevents.js') || content.includes('fbq(');
  const ga4 = content.includes('googletagmanager.com/gtag/js') || content.includes('G-');
  const gtm = content.includes('googletagmanager.com/gtm.js');
  const hotjar = content.includes('hotjar.com');
  const clarity = content.includes('clarity.ms');
  const cfBeacon = content.includes('cloudflareinsights.com/beacon.min.js');

  console.log('Meta Pixel (fbq):', metaPixel);
  console.log('Google Analytics 4 (gtag/G-):', ga4);
  console.log('Google Tag Manager (GTM):', gtm);
  console.log('Hotjar:', hotjar);
  console.log('Microsoft Clarity:', clarity);
  console.log('Cloudflare Web Analytics:', cfBeacon);

  // If G- or fbq found, extract ID
  const gaId = content.match(/G-[A-Z0-9]+/g);
  if (gaId) console.log('GA4 IDs:', [...new Set(gaId)]);

  const fbId = content.match(/fbq\(['"]init['"],\s*['"](\d+)['"]/);
  if (fbId) console.log('Meta Pixel ID:', fbId[1]);
});
