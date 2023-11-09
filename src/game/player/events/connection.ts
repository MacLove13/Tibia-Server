import * as SocketIO from 'socket.io';
import { serverSocket } from '@socket/socket';
import { Player } from "@game/player";
import * as PlayerEvents from '@game/player/events';
import { LoadCharacter } from '@game/player/load';
import * as Map from '@game/map/update';
import * as GameState from '@game/state';

serverSocket.on('connection', (socket: SocketIO.Socket) => {
  console.log('A user connected');

  var plr = new Player(socket);

  PlayerEvents.OnConnection(plr, socket);
  Map.OnConnection(plr, socket);
  // CharacterEvents.OnConnection(plr, socket);

  socket.on("onPlayerConnect", function (data: { Auth: string }) {
    LoadCharacter(plr, socket, data.Auth);
  });

  socket.on('disconnect', () => {
    var char = GameState.characterList.RemoveByID(socket.id);
    if (char instanceof Player) {
      char.Disconnect();
      console.log("Character Disconnected", socket.id);
    }
  });
});
