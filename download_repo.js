const https = require('https');
const fs = require('fs');
const path = require('path');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    https.get({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let nextUrl = res.headers.location;
        if (nextUrl.startsWith('/')) {
          nextUrl = parsed.protocol + '//' + parsed.hostname + nextUrl;
        }
        console.log('Redirect:', res.statusCode, '->', nextUrl.slice(0, 120));
        res.resume();
        return httpsGet(nextUrl).then(resolve).catch(reject);
      }
      resolve(res);
    }).on('error', reject);
  });
}

async function main() {
  const fileId = '1vEp4FKr_FZaIxVR4kFxDU4XKBRI2Vv8c';
  // Use confirm=t to bypass the virus scan warning
  const url = 'https://drive.usercontent.google.com/download?id=' + fileId + '&export=download&confirm=t';
  
  console.log('Downloading sourboo-final-main.zip (115 MB)...');
  const res = await httpsGet(url);
  
  console.log('Status:', res.statusCode);
  console.log('Content-Type:', res.headers['content-type']);
  console.log('Content-Length:', res.headers['content-length']);
  
  const destFile = path.join(__dirname, 'sourboo_repo.zip');
  const fileStream = fs.createWriteStream(destFile);
  let totalBytes = 0;
  
  res.on('data', (chunk) => {
    totalBytes += chunk.length;
    const mb = totalBytes / (1024 * 1024);
    if (Math.floor(mb) !== Math.floor((totalBytes - chunk.length) / (1024 * 1024))) {
      console.log('Downloaded:', mb.toFixed(1), 'MB');
    }
  });
  
  res.pipe(fileStream);
  
  fileStream.on('finish', () => {
    fileStream.close();
    console.log('Complete! Total:', (totalBytes / (1024 * 1024)).toFixed(1), 'MB');
    console.log('Saved to:', destFile);
  });
}

main().catch(console.error);
