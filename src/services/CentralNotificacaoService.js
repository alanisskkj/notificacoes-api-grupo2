const { CentralNotificacao } = require("../models");
const { NotFoundError, ValidationError } = require("../errors/AppError");

const CAMPOS_CRIACAO = ["canal", "titulo", "texto", "lida"];

function validarObjeto(dados) {
    if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
        throw new ValidationError("O corpo da requisição deve ser um objeto");
    }
}

function validarCriacao(dados) {
    validarObjeto(dados);

    const camposDesconhecidos = Object.keys(dados).filter(
        (campo) => !CAMPOS_CRIACAO.includes(campo),
    );
    if (camposDesconhecidos.length > 0) {
        throw new ValidationError("A requisição contém campos não permitidos");
    }
    if (!["PUSH", "EMAIL"].includes(dados.canal)) {
        throw new ValidationError('Canal deve ser "PUSH" ou "EMAIL"');
    }
    if (typeof dados.titulo !== "string" || !dados.titulo.trim()) {
        throw new ValidationError("Título é obrigatório");
    }
    if (dados.titulo.length > 255) {
        throw new ValidationError("Título deve ter no máximo 255 caracteres");
    }
    if (typeof dados.texto !== "string" || !dados.texto.trim()) {
        throw new ValidationError("Texto é obrigatório");
    }
    if (typeof dados.lida !== "boolean") {
        throw new ValidationError("Lida deve ser um valor booleano");
    }
}

function validarId(valor) {
    if (!/^[1-9]\d*$/.test(valor)) {
        throw new ValidationError("ID deve ser um número inteiro positivo");
    }
    const id = Number(valor);
    if (!Number.isSafeInteger(id)) {
        throw new ValidationError("ID deve ser um número inteiro válido");
    }
    return id;
}

function formatar(aviso) {
    return {
        id: aviso.id,
        canal: aviso.canal,
        titulo: aviso.titulo,
        texto: aviso.texto,
        lida: aviso.lida,
        hora: aviso.hora,
    };
}

async function listar() {
    const avisos = await CentralNotificacao.findAll({
        order: [["hora", "DESC"], ["id", "DESC"]],
    });
    return avisos.map(formatar);
}

async function criar(dados) {
    validarCriacao(dados);
    const aviso = await CentralNotificacao.create({
        canal: dados.canal,
        titulo: dados.titulo,
        texto: dados.texto,
        lida: dados.lida,
    });
    return formatar(aviso);
}

async function marcarComoLida(id, dados) {
    validarObjeto(dados);
    if (Object.keys(dados).length !== 1 || dados.lida !== true) {
        throw new ValidationError('O corpo deve conter somente "lida": true');
    }

    const aviso = await CentralNotificacao.findByPk(id);
    if (!aviso) throw new NotFoundError("Aviso");

    await aviso.update({ lida: true });
    return formatar(aviso);
}

async function excluir(id) {
    const aviso = await CentralNotificacao.findByPk(id);
    if (!aviso) throw new NotFoundError("Aviso");
    await aviso.destroy();
}

module.exports = {
    listar,
    criar,
    marcarComoLida,
    excluir,
    validarId,
};
