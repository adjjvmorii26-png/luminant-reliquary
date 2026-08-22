/**
 * Luminant Reliquary — Glass Orchard Growth
 */
const fs = require('fs');
const path = require('path');
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'luminant.config'), 'utf8'));
const CRY_DIR = path.join(__dirname, 'crystals');

function loadCrystals() {
  return fs.readdirSync(CRY_DIR).filter(f => f.endsWith('.go')).map(f => {
    const txt = fs.readFileSync(path.join(CRY_DIR, f), 'utf8');
    const res = parseFloat((txt.match(/resonance:\s*([\d.]+)/) || [])[1] || 0.5);
    const growth = parseFloat((txt.match(/growth:\s*([\d.]+)/) || [])[1] || 0.4);
    return { file: f, res, growth };
  });
}

function grow(tick = 0) {
  const crystals = loadCrystals();
  const avgRes = crystals.reduce((s, c) => s + c.res, 0) / crystals.length;
  const avgGrowth = crystals.reduce((s, c) => s + c.growth, 0) / crystals.length;
  const healthy = avgRes > CONFIG.glass_orchard.resonance_floor;
  console.log(`[orchard] tick=${String(tick).padStart(2)}  resonance=${avgRes.toFixed(3)}  growth=${avgGrowth.toFixed(3)}  healthy=${healthy}`);
  return { avgRes: +avgRes.toFixed(3), avgGrowth: +avgGrowth.toFixed(3), healthy, count: crystals.length };
}

module.exports = { grow, loadCrystals };
if (require.main === module) {
  console.log('GLASS ORCHARD online…\n');
  for (let t = 0; t < 10; t++) grow(t);
}
