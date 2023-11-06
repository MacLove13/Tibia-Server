import { Mob } from '@game/mob';
import { ground } from '@game/state';
import { serverSocket } from '@socket/socket';

Mob.prototype.Dispose = function (): void {
	serverSocket.emit("DeleteCharacters", [this.syncData.ID]);
  ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
}

Mob.prototype.SelfAnnouce = function (): void {
  serverSocket.emit("NewCharacters", [this.GetJSON()]);
  ground.SetCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
}
