import EventEmitter from 'events';

class EventBus extends EventEmitter {}
export const serverEvent = new EventBus();


// Escutando o evento 'mensagem'
serverEvent.on('mensagem', (msg) => {
  console.log(`Mensagem recebida: ${msg}`);
});

// Algum tempo depois, em outra parte do código...
// Emitindo um evento 'mensagem'
serverEvent.emit('mensagem', 'Olá, este é um teste de evento!');
