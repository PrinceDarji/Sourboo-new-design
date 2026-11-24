const fs = require('fs');

function searchCss(file) {
  const css = fs.readFileSync(file, 'utf8');
  const lines = css.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('sbx-moments__arrow')) {
      console.log(`${file} Line ${idx + 1}: ${l}`);
      console.log(lines.slice(Math.max(0, idx - 5), Math.min(lines.length, idx + 15)).join('\n'));
    }
  });
}

searchCss('repo/sourboo-final-main/app/sourboo-home.css');
searchCss('repo/sourboo-final-main/app/sourboo-site.css');
