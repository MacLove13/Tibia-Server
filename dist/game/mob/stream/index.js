"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mob_1 = require("@game/mob");
const state_1 = require("@game/state");
const socket_1 = require("@socket/socket");
mob_1.Mob.prototype.Dispose = function () {
    socket_1.serverSocket.emit("DeleteCharacters", [this.syncData.ID]);
    state_1.ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
};
mob_1.Mob.prototype.SelfAnnouce = function () {
    socket_1.serverSocket.emit("NewCharacters", [this.GetJSON()]);
    state_1.ground.SetCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
};
//# sourceMappingURL=index.js.map