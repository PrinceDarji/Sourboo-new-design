const fs = require('fs');
const readline = require('readline');
async function run() {
  const fileStream = fs.createReadStream('C:/Users/user/.gemini/antigravity/brain/f22c98ee-5201-43c9-a5eb-84160ec3250c/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  for await (const line of rl) {
    if (line.includes('"step_index":4975') || line.includes('"step_index": 4975')) {
      const obj = JSON.parse(line);
      fs.writeFileSync('c:/Users/user/Downloads/Sourboo/scratch/prompt_4975.txt', obj.content);
      console.log('Saved prompt_4975.txt, length:', obj.content.length);
      break;
    }
  }
}
run();
