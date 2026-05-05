// src/controllers/InscricaoController.js
const InscricaoService = require('../services/InscricaoService');
const xml2js = require('xml2js');
async function store(req, res, next) {
  try {
    const novaInscricao = await InscricaoService.criar(req.body);
    res.status(201).json(novaInscricao);
  } catch (erro) {
    next(erro);
  }
}

async function index(req, res, next) {
  try {
    const inscricoes = await InscricaoService.listarTodas();
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

async function listarPorEvento(req, res, next) {
  try {
    const eventoId = parseInt(req.params.eventoId);

    const inscricoes = await InscricaoService.listarPorEvento(eventoId);

    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

async function cancelar(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const inscricao = await InscricaoService.cancelar(id);

    res.json(inscricao);
  } catch (erro) {
    next(erro);
  }
}

async function exportarXML(req, res, next) {
  try {
    const inscricoes = await InscricaoService.listarTodas();

    const objetoParaXml = {
      inscricoes: {
        inscricao: inscricoes.map(i => ({
          id: i.id,
          status: i.status,
          evento: i.evento ? i.evento.nome : 'N/A',
          participante: {
            nome: i.participante ? i.participante.nome : 'N/A',
            email: i.participante ? i.participante.email : 'N/A'
          }
        }))
      }
    };
    const builder = new xml2js.Builder({
      renderOpts: { 'pretty': true, 'indent': '  ', 'newline': '\n' },
      xmldec: { 'version': '1.0', 'encoding': 'UTF-8' }
    });
    const xml = builder.buildObject(objetoParaXml);

    res.header('Content-Type', 'application/xml');
    res.status(200).send(xml);

  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  store,
  index,
  listarPorEvento,
  cancelar,
  exportarXML,
};