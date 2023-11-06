import { Player } from '@game/player';
import { Rotation, MoveData } from '@utils/interface';
import { ground } from '@game/state';

Player.prototype.Move = function (data: MoveData): void {
  if (ground.HaveAnyTileToHover(this.syncData.InLayer, data.Pos.x, data.Pos.y)) {
    this.socket.emit("map:HoverYTile", { ID: this.syncData.ID, Toggle: true });
  }
  else {
    this.socket.emit("map:HoverYTile", { ID: this.syncData.ID, Toggle: false });
  }

  if (ground.GetCollision(this.syncData.InLayer, data.Pos.x, data.Pos.y)) {
    this.socket.emit("CharacterTeleport", { ID: this.syncData.ID, Data: { Rot: 0, Pos: this.syncData.Position } });
    this.socket.emit("UpdatePositionTileEditor", { ID: this.syncData.ID, Data: data });
    this.CheckSafeZone();
    return;
  }

  ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
  this.syncData.Position.x = data.Pos.x;
  this.syncData.Position.y = data.Pos.y;
  ground.SetCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
  this.CheckSafeZone();

  this.socket.broadcast.emit("CharacterMove", { ID: this.syncData.ID, Data: data });
  this.socket.emit("UpdatePositionTileEditor", { ID: this.syncData.ID, Data: data });
}

Player.prototype.MoveDir = function (rot: Rotation): void {
  var tmpPos = { x: this.syncData.Position.x, y: this.syncData.Position.y };
  if (rot === Rotation.Left) {
      tmpPos.x--;
  }
  if (rot === Rotation.Top) {
      tmpPos.y--;
  }
  if (rot === Rotation.Right) {
      tmpPos.x++;
  }
  if (rot === Rotation.Down) {
      tmpPos.y++;
  }

  var data = { Rot: rot, Pos: tmpPos };
  this.Move(data);
}

Player.prototype.CanMove = function (): boolean {
  return true;
}

Player.prototype.CheckSafeZone = function (): void {
  if (!this.InSafeZone() && ground.SafeZone(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y)) {
    this.inSafeZone = true;
    this.socket.emit("character:textNotification", { Message: "Você entrou em uma safezone."});
  }
  else if (this.InSafeZone() && !ground.SafeZone(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y)) {
    this.inSafeZone = false;
    this.socket.emit("character:textNotification", { Message: "Você saiu de uma safezone."});
  }
}
