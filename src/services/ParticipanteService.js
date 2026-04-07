const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const {
    isRequired,
    isEmail,
    minLength,
    validar,
} = require("../helpers/validators");

function listarTodos() {
    return ParticipanteModel.listarTodos();
}

function buscarPorId(id) {
    const participante = ParticipanteModel.buscarPorId(id);

    if (!participante) {
        throw new NotFoundError("Participante");
    }

    return participante;
}

function criar(dados) {
    const { nome, email } = dados;

    const erros = validar([
        isRequired(nome, "Nome"),
        isRequired(email, "Email"),
        isEmail(email, "Email"),
        minLength(nome, 3, "Nome"),
    ]);

    if (erros) throw new ValidationError(erros.join("; "));

    return ParticipanteModel.criar({ nome, email });
}

function atualizar(id, dados) {
    const { nome, email } = dados;

    const erros = validar([
        minLength(nome, 3, "Nome"),
        isEmail(email, "Email"),
    ]);

    if (erros) throw new ValidationError(erros.join("; "));

    const atualizado = ParticipanteModel.atualizar(id, dados);

    if (!atualizado) {
        throw new NotFoundError("Participante");
    }

    return atualizado;
}

function deletar(id) {
    const deletado = ParticipanteModel.deletar(id);

    if (!deletado) {
        throw new NotFoundError("Participante");
    }

    return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };