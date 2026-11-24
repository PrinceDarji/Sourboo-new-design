const http = require('http');

async function check() {
  const list = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9538/json/list', res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
  console.log(list);
}
check().catch(console.error);
