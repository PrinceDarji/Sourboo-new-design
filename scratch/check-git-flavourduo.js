const fs = require('fs');

const { execSync } = require('child_process');
const out = execSync('git log -p -5 repo/sourboo-final-main/app/components/home/FlavourDuo.tsx', { encoding: 'utf8' });
console.log(out.slice(0, 3000));
