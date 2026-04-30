// src/controllers/ParticipanteController.js

const ParticipanteService = require("../services/ParticipanteService");
const { ValidationError } = require("../errors/AppError");
const { isEmail } = require("../helpers/validators"); 

function validar(regras) {
    const erros = regras.filter(Boolean);
    return erros.length ? erros : null;
}

async function index(req, res, next) {
    try {
        const participantes = await ParticipanteService.listarTodos();
        res.json(participantes);
    } catch (erro) {
        next(erro);
    }
}

async function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participante = await ParticipanteService.buscarPorId(id);
        res.json(participante);
    } catch (erro) {
        next(erro);
    }
}

async function store(req, res, next) {
    try {
        const { nome, email } = req.body;

        // Validação manual antes de mandar para o Service
        const erros = validar([
            (!nome || nome.length < 2) && "Nome é obrigatório e deve ter pelo menos 2 caracteres",
            (!email || isEmail(email) !== null) && "Email é obrigatório e deve ser válido"
        ]);

        if (erros) {
            throw new ValidationError(erros.join("; "));
        }

        const novoParticipante = await ParticipanteService.criar(req.body);
        res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro);
    }
}

async function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participanteAtualizado = await ParticipanteService.atualizar(id, req.body);
        res.json(participanteAtualizado);
    } catch (erro) {
        next(erro);
    }
}

async function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        await ParticipanteService.deletar(id);
        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

module.exports = { index, show, store, update, destroy };