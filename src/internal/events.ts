import EventEmitter from 'events';

class EventBus extends EventEmitter {}
export const serverEvent = new EventBus();
