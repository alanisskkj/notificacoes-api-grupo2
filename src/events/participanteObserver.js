// src/events/participanteObserver.js
const appEmitter = require('./eventEmitter');
const EmailService = require('../services/EmailService');

appEmitter.on('participante:criado', async (participante) => {
  try {
    console.log(`\n🔔 [Observer] Novo participante cadastrado: ${participante.nome}`);

    const assunto = 'Bem-vindo à Plataforma de Eventos! 🎉';
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2b6cb0;">Olá, ${participante.nome}!</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
          Bem-vindo à <strong>Plataforma de Eventos</strong>! O seu cadastro foi realizado com sucesso em nosso sistema.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
          Agora você já pode se inscrever nos eventos e acompanhar todas as novidades.
        </p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
        <p style="font-size: 12px; color: #a0aec0; text-align: center;">
          Este é um e-mail automático do Grupo 2. Não responda a esta mensagem.
        </p>
      </div>
    `;
    
    await EmailService.enviar(participante.email, assunto, htmlContent);

  } catch (erro) {
    console.error(`⚠️ [Observer Erro] Falha ao enviar e-mail para ${participante.email}:`, erro.message);
  }
});