const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:/Users/MST/.gemini/antigravity-ide/brain/e0730bf2-2f8a-4803-a8de-062caea47b1c/.system_generated/logs/transcript.jsonl';

const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const tc of obj.tool_calls) {
        if (tc.args && tc.args.TargetFile) {
          console.log(`Step: ${obj.step_index} | File: ${tc.args.TargetFile} | Action: ${tc.name}`);
        }
      }
    }
  } catch (e) {
    // Ignore invalid JSON lines
  }
}
