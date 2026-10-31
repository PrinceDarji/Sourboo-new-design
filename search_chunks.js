const fs = require('fs');
const path = require('path');

const chunkDir = 'chunks';
const files = fs.readdirSync(chunkDir).filter(f => f.endsWith('.js'));

const searchTerms = [
  'phonepe',
  'payment',
  'webhook',
  'callback',
  'verify',
  '/api/',
  'order',
  'discount',
  'shiprocket',
  'pixel',
  'gtag',
  'fbq',
  'ga4',
  'analytics',
  'clarity',
  'hotjar',
  'sentry',
  'supabase',
  'firebase',
  'prisma',
  'mongodb'
];

console.log('Searching in', files.length, 'files...');

files.forEach(file => {
  const content = fs.readFileSync(path.join(chunkDir, file), 'utf8');
  console.log(`\n=== File: ${file} (size: ${content.length}) ===`);
  searchTerms.forEach(term => {
    const regex = new RegExp(term, 'gi');
    const matches = content.match(regex);
    if (matches) {
      console.log(`  Term "${term}": ${matches.length} matches`);
    }
  });
});
