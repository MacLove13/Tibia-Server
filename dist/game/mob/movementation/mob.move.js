"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mob_1 = require("@game/mob");
mob_1.Mob.prototype.Move = function (data) {
    console.log('Moving');
};
/*
Move(data: MoveData) {
    if (!this.CanMove()) return;
    // ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
    // this.syncData.Position.x = data.Pos.x;
    // this.syncData.Position.y = data.Pos.y;
    // ground.SetCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
    // socketServer.emit("CharacterMove", { ID: this.syncData.ID, Data: data });
    this.lastMoveTime = Date.now();
  }
*/
//# sourceMappingURL=mob.move.js.map