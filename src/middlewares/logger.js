function logger(req, res, next) {
  const dataHora = new Date().toLocaleString("pt-BR");

  console.log(`[${dataHora}] ${req.method} ${req.url}`);

  next();
}

module.exports = logger;