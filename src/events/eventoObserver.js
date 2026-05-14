const appEmitter = require('./eventEmitter');

appEmitter.on('evento:criado', (evento) => {
    try {
        console.log(`[OBSERVER] Evento criado: ${evento.nome}`);
    } catch (err) {
        console.error('[EVENTO OBSERVER] erro:', err.message);
    }
});