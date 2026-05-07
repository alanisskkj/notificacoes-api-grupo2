const NodeCache = require('node-cache');

// cache dura 30 segundos
const cache = new NodeCache({
  stdTTL: 30,
});

module.exports = cache;