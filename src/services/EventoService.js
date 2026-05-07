const { Evento } = require('../models');
const { Op } = require('sequelize');
const cache = require('../config/cache');

async function listarTodos(opcoes = {}) {

  const chaveCache = `eventos:${JSON.stringify(opcoes)}`;

  const cacheExiste = cache.get(chaveCache);

  if (cacheExiste) {
    console.log('Retornando eventos do CACHE');
    return cacheExiste;
  }

  console.log('Buscando eventos no BANCO');

  const {
    pagina = 1,
    porPagina = 10,
    ordenarPor = 'data',
    ordem = 'ASC',
    busca = null,
  } = opcoes;

  const where = {};

  if (busca) {
    where.nome = {
      [Op.like]: `%${busca}%`,
    };
  }

  const { count, rows } = await Evento.findAndCountAll({
    where,

    order: [
      [ordenarPor, ordem.toUpperCase()],
    ],

    limit: parseInt(porPagina),

    offset:
      (parseInt(pagina) - 1) *
      parseInt(porPagina),
  });

  const resultado = {
    dados: rows,
    total: count,
    pagina: parseInt(pagina),
    porPagina: parseInt(porPagina),
    totalPaginas: Math.ceil(
      count / parseInt(porPagina)
    ),
  };

  cache.set(chaveCache, resultado);

  return resultado;
}

async function listarFuturos() {

  return Evento.findAll({
    where: {
      data: {
        [Op.gt]: new Date(),
      },
    },

    order: [
      ['data', 'ASC'],
    ],
  });
}

async function buscarPorId(id) {

  const evento = await Evento.findByPk(id);

  if (!evento) {
    throw new Error('Evento não encontrado');
  }

  return evento;
}

async function criar(dados) {

  const evento = await Evento.create(dados);

  cache.flushAll();

  return evento;
}

async function atualizar(id, dados) {

  const evento = await buscarPorId(id);

  await evento.update(dados);

  cache.flushAll();

  return evento;
}

async function deletar(id) {

  const evento = await buscarPorId(id);

  await evento.destroy();

  cache.flushAll();
}

module.exports = {
  listarTodos,
  listarFuturos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};