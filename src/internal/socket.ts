import * as SocketIO from 'socket.io';
import { server } from '../server';
import { Player } from '@game/player';

import { serverEvent } from '@events';

export const serverSocket = new SocketIO.Server(server, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"], // Allowing both local addresses
    methods: ["GET", "POST"],
    credentials: true,
  }
});

serverSocket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
});

// serverSocket.use((socket, next) => {
//   next(new Error('Authentication error'));
// });

console.log('Socket Initialized');
