// Template com lacunas para completar:

const baseTemplate = require('./baseTemplate');

function lembreteEvento(dados) {

  const { participanteNome, eventoNome, eventoData, eventoLocal } = dados;

  // Calcular quantos dias faltam

  const hoje = new Date();

  const dataEvento = new Date(eventoData);

  const diffMs = dataEvento - hoje;

  const diasFaltando = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const conteudo = `

    <h2>Lembrete: Evento se aproxima! ⏰</h2>

    <p>Olá <strong>${participanteNome}</strong>,</p>

    <p>Faltam <strong>${diasFaltando}</strong> dias para que o evento aconteça! 🥳</p>

  `;

  return baseTemplate(conteudo);

}

module.exports = lembreteEvento;
