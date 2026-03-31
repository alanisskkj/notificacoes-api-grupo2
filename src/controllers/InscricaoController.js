const InscricaoModel = require("../models/InscricaoModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

function store(req, res, next) {
  try {
    const { eventoId, participanteId } = req.body;
    const erros = validar([
      // eventoId é obrigatório
      // _________________________________
      // participanteId é obrigatório
      // _________________________________
    ]);
    if (erros) {
      throw new ValidationError(erros.join("; "));
    }
    const resultado = InscricaoModel.criar(
      parseInt(eventoId),
      parseInt(participanteId),
    );
    res.status(201).json(resultado);
  } catch (erro) {
    next(erro);
  }
}

module.exports = { store, index };