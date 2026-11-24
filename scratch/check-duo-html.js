const http = require('http');

http.get('http://localhost:3000', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const idx = html.indexOf('id="flavours"');
    console.log('Index of id="flavours":', idx);
    if (idx !== -1) {
      console.log(html.substring(idx, idx + 2500));
    }
  });
});
