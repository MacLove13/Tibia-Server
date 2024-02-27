"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverEvent = void 0;
const events_1 = __importDefault(require("events"));
class EventBus extends events_1.default {
}
exports.serverEvent = new EventBus();
// Escutando o evento 'mensagem'
exports.serverEvent.on('mensagem', (msg) => {
    console.log(`Mensagem recebida: ${msg}`);
});
// Algum tempo depois, em outra parte do código...
// Emitindo um evento 'mensagem'
exports.serverEvent.emit('mensagem', 'Olá, este é um teste de evento!');
//# sourceMappingURL=events.js.map