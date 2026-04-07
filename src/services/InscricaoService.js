const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, validar } = require("../helpers/validators");

function criar(dados) {
    const { eventoId, participanteId } = dados;

    const erros = validar([
        isRequired(eventoId, "eventoId"),
        isRequired(participanteId, "participanteId"),
    ]);
    if (erros) throw new ValidationError(erros.join("; "));

    const evento = EventoModel.buscarPorId(parseInt(eventoId));
    if (!evento) throw new NotFoundError("Evento");

    const participante = ParticipanteModel.buscarPorId(parseInt(participanteId));
    if (!participante) throw new NotFoundError("Participante");

    return InscricaoModel.criar(parseInt(eventoId), parseInt(participanteId));
}

function listarTodas() {
    return InscricaoModel.listarTodos();
}

function listarPorEvento(eventoId) {
    return InscricaoModel.listarTodos().filter(i => i.eventoId === eventoId);
}

function cancelar(id) {
    const lista = InscricaoModel.listarTodos();
    const index = lista.findIndex(i => i.id === id);
    if (index === -1) throw new NotFoundError("Inscrição");
    return lista.splice(index, 1)[0];
}

module.exports = { criar, listarTodas, listarPorEvento, cancelar };