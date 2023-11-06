import { Mob } from '@game/mob';
import { MoveData, Vector2D } from '@utils/interface';
import { ground } from '@game/state';
import { serverSocket } from '@socket/socket';
import { Rotation } from '@utils/interface';

Mob.prototype.Move = function (data: MoveData): void {
  if (!this.CanMove()) return;
  ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
  this.syncData.Position.x = data.Pos.x;
  this.syncData.Position.y = data.Pos.y;
  ground.SetCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
  serverSocket.emit("CharacterMove", { ID: this.syncData.ID, Data: data });
  this.lastMoveTime = Date.now();
};

Mob.prototype.MoveDir = function (rot: Rotation): void {
  var tmpPos = { x: this.syncData.Position.x, y: this.syncData.Position.y };
  if (rot === Rotation.Left)
    tmpPos.x--;

  if (rot === Rotation.Top)
    tmpPos.y--;

  if (rot === Rotation.Right)
    tmpPos.x++;

  if (rot === Rotation.Down)
    tmpPos.y++;

  var data = { Rot: rot, Pos: tmpPos };
  this.Move(data);
}

Mob.prototype.CanMove = function (): boolean {
  return ((Date.now() - this.lastMoveTime) > this.moveDelay) && !this.IsDead();
}

Mob.prototype.IdleMoving = function (): void {
  if (!this.CanMove()) return;
  if (Math.random() > 0.95) {
    this.MoveByVector({ x: Math.sin(Math.random() * Math.PI * 2), y: Math.sin(Math.random() * Math.PI * 2) });
  }
}

Mob.prototype.MoveByVector = function (desiredMoveV: Vector2D): void {
  if (!this.CanMove()) return;
  var dataArr = new Array<any>(4);
  var radians = Math.atan2(desiredMoveV.y, desiredMoveV.x);
        
  dataArr[Rotation.Left] = ({
    can: this.TileCanMove(this.syncData.InLayer, this.syncData.Position.x - 1, this.syncData.Position.y),
    desire: Math.cos(radians)
  });
  dataArr[Rotation.Down] = ({
    can: this.TileCanMove(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y + 1),
    desire: Math.cos(radians + (Math.PI / 2))
  });
  dataArr[Rotation.Right] = ({
    can: this.TileCanMove(this.syncData.InLayer, this.syncData.Position.x + 1, this.syncData.Position.y),
    desire: Math.cos(radians + Math.PI)
  });
  dataArr[Rotation.Top] = ({
    can: this.TileCanMove(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y - 1),
    desire: Math.cos(radians + (Math.PI / 2 * 3))
  });

  var mostdesire = -1;
  var result = -1;
  for (var i = 0; i < 4; i++) {
    if (dataArr[i].can && dataArr[i].desire > -0.1) {
      if (dataArr[i].desire > mostdesire) {
        result = i;
        mostdesire = dataArr[i].desire;
      }
    }
  }

  if (result !== -1) {
    this.MoveDir(result);
  }
}

Mob.prototype.TileCanMove = function (layer: number, x: number, y: number): boolean {
  return !ground.GetCollision(layer, x, y) && !ground.SafeZone(layer, x, y)
}
