const { grow } = require('../glass_orchard/orchard_growth.js');
const { evaluate } = require('../shatterfield/shatter_core.js');
const { weave } = require('../horizon_loom/loom_weaver.js');
async function run() {
  console.log('Reliquary Terminal online…\n');
  console.log('Orchard:', grow(0));
  console.log('Shatter:', evaluate(0));
  console.log('Loom:', weave(0));
}
if (require.main === module) run();
