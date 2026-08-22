const fs = require('fs');
const path = require('path');
function weave(tick=0) {
  const dir = path.join(__dirname, 'threads');
  const n = fs.readdirSync(dir).filter(f=>f.endsWith('.hl')).length;
  const entropy = 0.15 + 0.1*Math.sin(tick*0.2);
  console.log(`[loom] tick=${tick}  threads=${n}  entropy=${entropy.toFixed(3)}`);
  return { threads: n, entropy: +entropy.toFixed(3) };
}
module.exports = { weave };
if (require.main === module) for (let t=0;t<6;t++) weave(t);
