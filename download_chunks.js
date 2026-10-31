const https = require('https');
const fs = require('fs');
const path = require('path');

const chunks = [
  '119132ccca6af685.js',
  '7d6514a90169e63d.js',
  'aee6c7720838f8a2.js',
  'turbopack-e181750e88734ffb.js',
  'ff1a16fafef87110.js',
  'd2be314c3ece3fbe.js',
  '743b92e4815d7971.js',
  '88c074a13781afc1.js',
  'ae3fa56abd7041b1.js',
  'a6dad97d9634a72d.js',
  '1c7169261bc4f2b5.js'
];

if (!fs.existsSync('chunks')) {
  fs.mkdirSync('chunks');
}

function download(chunkName) {
  return new Promise((resolve) => {
    const url = 'https://www.sourboo.com/_next/static/chunks/' + chunkName;
    const dest = path.join('chunks', chunkName);
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    }).on('error', (err) => {
      console.error('Error downloading', chunkName, err);
      resolve(null);
    });
  });
}

async function run() {
  for (const c of chunks) {
    await download(c);
  }
  console.log('Downloaded all chunks.');
}

run();
