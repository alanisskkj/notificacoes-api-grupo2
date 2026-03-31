const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isEmail } = require("../validators");

function validar(regras) {
    const erros = regras.filter(Boolean);
    return erros.length ? erros : null;
}

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

        const erros = validar([
            (!nome || nome.length < 2) && "Nome é obrigatório e deve ter pelo menos 2 caracteres",
            (!email || !isEmail(email)) && "Email é obrigatório e deve ser válido"
        ]);

        if (erros) {
            throw new ValidationError(erros.join("; "));
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
        const { nome, email } = req.body;

        const erros = validar([
            (nome && nome.length < 2) && "Nome deve ter pelo menos 2 caracteres",
            (email && !isEmail(email)) && "Email inválido"
        ]);

        if (erros) {
            throw new ValidationError(erros.join("; "));
        }

        const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);

        if (!participanteAtualizado) {
            throw new NotFoundError("Participante");
        }

        res.json(participanteAtualizado);

    } catch (erro) {
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