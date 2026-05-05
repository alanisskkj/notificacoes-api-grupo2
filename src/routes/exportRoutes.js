const express = require('express');
const router = express.Router();

const { Evento, Participante, Inscricao } = require('../models');
const { create } = require('xmlbuilder2');

router.get('/eventos/xml', async (req, res, next) => {
  try {
    const eventos = await Evento.findAll({ order: [['data', 'ASC']] });

    const xml = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('eventos');

    eventos.forEach(e => {
      xml.ele('evento')
        .ele('id').txt(String(e.id)).up()
        .ele('nome').txt(e.nome).up()
        .ele('descricao').txt(e.descricao || '').up()
        .ele('data').txt(e.data.toISOString()).up()
        .ele('local').txt(e.local || '').up()
        .ele('capacidade').txt(String(e.capacidade || 0)).up()
      .up();
    });

    res.set('Content-Type', 'application/xml');
    res.send(xml.end({ prettyPrint: true }));
  } catch (err) {
    next(err);
  }
});

router.get('/eventos/json', async (req, res, next) => {
  try {
    const eventos = await Evento.findAll({ raw: true });

    res.set('Content-Type', 'application/json');
    res.set('Content-Disposition', 'attachment; filename="eventos.json"');

    res.json(eventos);
  } catch (err) {
    next(err);
  }
});

router.get('/inscricoes/xml', async (req, res, next) => {
  try {
    const inscricoes = await Inscricao.findAll({
      include: [
        { model: Evento, attributes: ['nome'] },
        { model: Participante, attributes: ['nome', 'email'] },
      ],
    });

    const xml = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('inscricoes');

    inscricoes.forEach(i => {
      const insc = xml.ele('inscricao');

      insc.ele('id').txt(String(i.id)).up();
      insc.ele('status').txt(i.status).up();
      insc.ele('evento').txt(i.Evento?.nome || '').up();

      const p = insc.ele('participante');
      p.ele('nome').txt(i.Participante?.nome || '').up();
      p.ele('email').txt(i.Participante?.email || '').up();

      p.up();
      insc.up();
    });

    res.set('Content-Type', 'application/xml');
    res.send(xml.end({ prettyPrint: true }));
  } catch (err) {
    next(err);
  }
});

router.get('/relatorio/inscricoes', async (req, res, next) => {
  try {
    const eventos = await Evento.findAll({
      include: [{
        model: Inscricao,
        as: 'inscricoes',
        include: [{
          model: Participante,
          as: 'participante',
          attributes: ['nome', 'email'],
        }],
      }],
      order: [['data', 'ASC']],
    });

    const relatorio = eventos.map(evento => ({
      evento: evento.nome,
      data: evento.data,
      capacidade: evento.capacidade,
      totalInscritos: evento.inscricoes.length,
      vagasRestantes: (evento.capacidade || 0) - evento.inscricoes.length,

      inscritos: evento.inscricoes.map(i => ({
        nome: i.participante?.nome,
        email: i.participante?.email,
        status: i.status,
        dataInscricao: i.dataInscricao,
      })),
    }));

    res.json({
      geradoEm: new Date().toISOString(),
      totalEventos: relatorio.length,
      relatorio,
    });

  } catch (err) {
    next(err);
  }
});

router.get('/relatorio/inscricoes/csv', async (req, res, next) => {
  try {
    const inscricoes = await Inscricao.findAll({
      include: [
        { model: Evento, as: 'evento', attributes: ['nome', 'data'] },
        { model: Participante, as: 'participante', attributes: ['nome', 'email'] },
      ],
      raw: true,
      nest: true,
    });

    let csv = 'ID,Evento,Data Evento,Participante,Email,Status,Data Inscricao\n';

    inscricoes.forEach(i => {
      csv += `${i.id},${i.evento?.nome || ''},${i.evento?.data || ''},${i.participante?.nome || ''},${i.participante?.email || ''},${i.status},${i.dataInscricao}\n`;
    });

    res.set('Content-Type', 'text/csv');
    res.set('Content-Disposition', 'attachment; filename="inscricoes.csv"');

    res.send(csv);

  } catch (err) {
    next(err);
  }
});

module.exports = router;