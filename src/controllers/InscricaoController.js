const InscricaoModel = require("../models/InscricaoModel");
const { ValidationError } = require("../errors/AppError");
const { isRequired, validar } = require("../helpers/validators");

function index(req, res, next) {
  try {
    const inscricoes = InscricaoModel.listarTodos();
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

function store(req, res, next) {
  try {
    const { eventoId, participanteId } = req.body;

    const erros = validar([
      isRequired(eventoId, "ID do Evento"),
      isRequired(participanteId, "ID do Participante"),
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