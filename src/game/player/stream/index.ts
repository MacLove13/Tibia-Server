import { Player } from '@game/player';
import { Rotation, MoveData } from '@utils/interface';
import * as GameState from '@game/state';
import * as Geometry from '@utils/geometry';
import { serverSocket } from '@socket/socket';

Player.prototype.Dispose = function (): void {
	// serverSocket.emit("DeleteCharacters", [this.syncData.ID]);
  GameState.ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
 // this.socket.disconnect();

  this.Revive();
}

Player.prototype.Disconnect = function (): void {
	this.Save();

  serverSocket.emit("DeleteCharacters", [this.syncData.ID]);
  GameState.ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
  this.socket.disconnect();
}

Player.prototype.SelfAnnouce = function (): void {
  this.socket.broadcast.emit("NewCharacters", [this.GetJSON()]);
  GameState.ground.SetCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
}

Player.prototype.Sync = function (): void {
  this.socket.emit("PlayerStart", this.GetJSON());
}

Player.prototype.UpdateEnemyList = function (): void {
  let count = 0;
  let battleList: any[] = [];
  let target = null;

  if (this.targetChar != null) {
    if (this.targetChar instanceof Player)
      target = this.targetChar.syncData.ID;
  }

  GameState.characterList.ForEach((char: any) => {
    if (char == this) return;
    var dist = Geometry.GetDistance(this.syncData.Position, char.GetJSON().Position);
    if (dist > 10) return;

    battleList.push({
      id: char.syncData.ID,
      name: char.syncData.Race,
      level: char.syncData.level,
      hp: char.syncData.HP,
      max_hp: char.syncData.MaxHP,
      distance: dist,
    })
  });

  if (battleList.length > 0 || this.targetChar != null) {
    battleList.sort((a, b) => a.distance - b.distance);

    this.socket.emit("BattleMenu", { ID: this.syncData.ID, Data: {
        battleList: battleList,
        TargetID: target,
      }
    });

    this.activeEnemiesList = true;
  }
  else {
    if (this.activeEnemiesList) {
      this.socket.emit("BattleMenu", { ID: this.syncData.ID, Data: {
          battleList: [],
          TargetID: null,
        }
      });
    }

    this.activeEnemiesList = false;
  }
}
