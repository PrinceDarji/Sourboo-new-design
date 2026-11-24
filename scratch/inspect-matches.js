const fs = require('fs');

function inspect(file, line, count = 25) {
  console.log('=== ' + file + ' ===');
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const start = Math.max(0, line - 10);
  const end = Math.min(lines.length, line + count);
  for (let i = start; i < end; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}

inspect('repo/sourboo-final-main/app/components/site/Marquee.tsx', 12, 40);
inspect('repo/sourboo-final-main/app/components/home/FoodSensoryStory.tsx', 205, 30);
inspect('repo/sourboo-final-main/app/components/home/GoodTasteMoments.tsx', 29, 30);
inspect('repo/sourboo-final-main/app/sourboo-home.css', 701, 40);
