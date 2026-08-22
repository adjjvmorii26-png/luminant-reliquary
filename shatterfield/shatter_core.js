/**
 * Luminant Reliquary — Shatter Core
 */
const fs = require('fs');
const path = require('path');
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'luminant.config'), 'utf8'));
const SH_DIR = path.join(__dirname, 'shards');

function loadShards() {
  return fs.readdirSync(SH_DIR).filter(f => f.endsWith('.sf')).map(f => {
    const txt = fs.readFileSync(path.join(SH_DIR, f), 'utf8');
    const entropy = parseFloat((txt.match(/entropy:\s*([\d.]+)/) || [])[1] || 0.4);
    const suture = parseFloat((txt.match(/suture:\s*([\d.]+)/) || [])[1] || 0.5);
    return { file: f, entropy, suture };
  });
}

function evaluate(tick = 0) {
  const shards = loadShards();
  const avgE = shards.reduce((s, x) => s + x.entropy, 0) / shards.length;
  const avgS = shards.reduce((s, x) => s + x.suture, 0) / shards.length;
  const risk = avgE > CONFIG.shatterfield.entropy_cap;
  const canSuture = avgS >= CONFIG.shatterfield.suture_threshold;
  console.log(`[shatter] tick=${String(tick).padStart(2)}  entropy=${avgE.toFixed(3)}  suture=${avgS.toFixed(3)}  risk=${risk}  can_suture=${canSuture}`);
  return { avgE: +avgE.toFixed(3), avgS: +avgS.toFixed(3), risk, canSuture };
}

module.exports = { evaluate, loadShards };
if (require.main === module) {
  console.log('SHATTERFIELD online…\n');
  for (let t = 0; t < 6; t++) evaluate(t);
}
