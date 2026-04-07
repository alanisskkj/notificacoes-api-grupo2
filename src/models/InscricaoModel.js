const { ValidationError } = require("../errors/AppError");

let inscricoes = [];
let proximoId = 1;

function criar(eventoId, participanteId) {
    const jaInscrito = inscricoes.find(
        (i) => i.eventoId === eventoId && i.participanteId === participanteId,
    );
    if (jaInscrito) {
        throw new ValidationError("Participante já inscrito neste evento");
    }
    const novaInscricao = {
        id: proximoId,
        eventoId,
        participanteId,
        dataInscricao: new Date().toISOString(),
        status: "confirmada",
    };
    proximoId++;
    inscricoes.push(novaInscricao);
    return novaInscricao;
}

function listarTodos() {
    return inscricoes;
}

module.exports = { criar, listarTodos };