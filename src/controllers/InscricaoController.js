// src/controllers/InscricaoController.js
const InscricaoModel = require("../models/InscricaoModel");

function store(req, res) {
    const { eventoId, participanteId } = req.body;

    if (!eventoId || !participanteId) {
        return res
            .status(400)
            .json({ erro: "eventoId e participanteId são obrigatórios" });
    }

    const resultado = InscricaoModel.criar(
        parseInt(eventoId),
        parseInt(participanteId)
    );

    if (resultado.erro) {
        return res.status(400).json(resultado);
    }

    res.status(201).json(resultado);
}

function index(req, res) {
    const inscricoes = InscricaoModel.listarTodas();
    res.json(inscricoes);
}

function listarPorEvento(req, res) {
    const eventoId = parseInt(req.params.eventoId);

    const inscricoes = InscricaoModel.listarPorEvento(eventoId);

    res.json(inscricoes);
}

function cancelar(req, res) {
    const id = parseInt(req.params.id);

    const inscricao = InscricaoModel.cancelar(id);

    if (!inscricao) {
        return res.status(404).json({ erro: "Inscrição não encontrada" });
    }

    res.status(200).json(inscricao);
}

function buscarDetalhes(req, res) {
    const id = parseInt(req.params.id);
    const detalhes = InscricaoModel.buscarDetalhesPorId(id);

    if (!detalhes) {
        return res.status(404).json({ erro: "Inscrição não encontrada" });
    }

    res.json(detalhes);
}

module.exports = { store, index, listarPorEvento, cancelar, buscarDetalhes };