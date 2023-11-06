import { Player } from '@game/player';
import { Character } from '@game/character/interface';
import { serverSocket } from '@socket/socket';
import * as GameState from '@game/state';

Player.prototype.sendNotification = function (data: { Title: string; Content: string; }): void {
  this.socket.emit("character:showNotification", data);
}

Player.prototype.textNotification = function (message: string): void {
  this.socket.emit("character:textNotification", { Message: message });
}
