const https = require('https');

function get(path) {
  return new Promise((resolve) => {
    https.get('https://www.sourboo.com' + path, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function checkForms() {
  const contact = await get('/contact');
  const join = await get('/join');

  console.log('=== CONTACT PAGE FORMS ===');
  const contactForms = contact.match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Form count on /contact:', contactForms.length);
  contactForms.forEach(f => console.log(f.slice(0, 500)));

  console.log('\n=== JOIN PAGE FORMS ===');
  const joinForms = join.match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Form count on /join:', joinForms.length);
  joinForms.forEach(f => console.log(f.slice(0, 500)));

  // If no <form>, check for inputs and buttons
  const contactInputs = contact.match(/<input[^>]*>/gi) || [];
  console.log('Contact inputs:', contactInputs);

  const joinInputs = join.match(/<input[^>]*>/gi) || [];
  console.log('Join inputs:', joinInputs);
}

checkForms();
