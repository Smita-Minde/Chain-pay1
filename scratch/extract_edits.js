const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:/Users/MST/.gemini/antigravity-ide/brain/e0730bf2-2f8a-4803-a8de-062caea47b1c/.system_generated/logs/transcript.jsonl';

const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

const targetSteps = [389, 396, 455, 488, 492, 529, 653, 673];

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (targetSteps.includes(obj.step_index)) {
      const filename = `scratch/step_${obj.step_index}.json`;
      fs.writeFileSync(filename, JSON.stringify(obj, null, 2), 'utf8');
      console.log(`Saved step ${obj.step_index} to ${filename}`);
    }
  } catch (e) {
    console.error('Error parsing line:', e);
  }
}
