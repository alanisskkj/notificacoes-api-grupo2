const InscricaoModel = require("../models/InscricaoModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

function store(req, res, next) {
  try {
    const { participanteId, eventoId } = req.body;

    if (!participanteId || !eventoId) {
      throw new ValidationError("Participante e Evento são obrigatórios");
    }

    const inscricao = InscricaoModel.criar(participanteId, eventoId);

    res.status(201).json(inscricao);
  } catch (erro) {
    next(erro);
  }
}

function index(req, res, next) {
  try {
    const inscricoes = InscricaoModel.listarTodos();
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

module.exports = { store, index };