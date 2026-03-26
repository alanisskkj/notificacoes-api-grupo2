const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
function index(req, res, next) {
    try {
        const participantes = ParticipanteModel.listarTodos();
        res.json(participantes);
    }
    catch (erro) {
        next(erro);
    }
}

function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participante = ParticipanteModel.buscarPorId(id);
        if (!participante) {
            throw new NotFoundError("Participante");
        }

        res.json(participante);
    } catch (erro) {
        next(erro);
    }
}
function store(req, res, next) {
    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            throw new ValidationError("Nome e email obrigatórios");
        }

        if (!email.includes("@")) {
            throw new ValidationError("Email inválido");
        }

        const novoParticipante = ParticipanteModel.criar({ nome, email });
        res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro);
    }
}
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);
        if (!participanteAtualizado) {
            throw new NotFoundError("Participante");
        }
        res.json(participanteAtualizado);
    }
    catch (erro) {
        next(erro);
    }
}

function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const deletado = ParticipanteModel.deletar(id);
        if (!deletado) {
            throw new NotFoundError("Participante");
        }
        res.status(204).send();
    }
    catch (erro) {
        next(erro);
    }
}
module.exports = { index, show, store, update, destroy };