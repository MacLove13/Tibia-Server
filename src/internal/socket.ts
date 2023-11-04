import { Server } from 'socket.io';
import { server } from '../server';

const serverSocket = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client's origin
    methods: ["GET", "POST"],
    credentials: true,
  }
});

serverSocket.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

console.log('Socket Initialized');
