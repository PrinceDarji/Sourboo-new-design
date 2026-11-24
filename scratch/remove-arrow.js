const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'repo', 'sourboo-final-main', 'app', 'components', 'home', 'GoodTasteMoments.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove HandArrow from import
content = content.replace("import { HandArrow, Wave } from '../site/Organic';", "import { Wave } from '../site/Organic';");

// 2. Remove HandArrow component invocation
content = content.replace(
`      <p className="sbx-moments__line">
        Deeply Fermented • Slightly Unhinged.
        <HandArrow className="sbx-moments__arrow" />
      </p>`,
`      <p className="sbx-moments__line">
        Deeply Fermented • Slightly Unhinged.
      </p>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated GoodTasteMoments.tsx');
