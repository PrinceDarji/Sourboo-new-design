const https = require('https');
const fs = require('fs');

function get(path) {
  return new Promise((resolve) => {
    https.get('https://www.sourboo.com' + path, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ path, status: res.statusCode, data }));
    }).on('error', err => resolve({ path, error: err.message }));
  });
}

async function run() {
  const [root, home, popup] = await Promise.all([get('/'), get('/home'), get('/popup')]);
  console.log('Root length:', root.data?.length);
  console.log('Home length:', home.data?.length);
  console.log('Is Home identical to Root?', root.data === home.data);

  // Check canonical on /home
  const homeCanon = home.data?.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  console.log('/home canonical:', homeCanon ? homeCanon[0] : 'None');

  const rootCanon = root.data?.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  console.log('/ canonical:', rootCanon ? rootCanon[0] : 'None');

  console.log('\n=== /popup preview ===');
  console.log(popup.data?.slice(0, 500));
  fs.writeFileSync('popup.html', popup.data || '');
}

run();
