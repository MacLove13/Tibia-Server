import * as SocketIO from 'socket.io';
import { serverSocket } from '@socket/socket';
import { Player } from "@game/player";
import * as PlayerEvents from '@game/player/events';
import { LoadCharacter } from '@game/player/load';
import * as Map from '@game/map/update';

serverSocket.on('connection', (socket: SocketIO.Socket) => {
  console.log('A user connected');

  var plr = new Player(socket);

  PlayerEvents.OnConnection(plr, socket);
  Map.OnConnection(plr, socket);
  // CharacterEvents.OnConnection(plr, socket);

  // serverEvent.emit('user:connect', );

  socket.on("onPlayerConnect", function (data: { Auth: string }) {
    console.log('onPlayerConnect');
    LoadCharacter(plr, socket, data.Auth);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
