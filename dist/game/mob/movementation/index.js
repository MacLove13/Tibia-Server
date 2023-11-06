"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mob_1 = require("@game/mob");
const state_1 = require("@game/state");
const socket_1 = require("@socket/socket");
mob_1.Mob.prototype.Move = function (data) {
    if (!this.CanMove())
        return;
    state_1.ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
    this.syncData.Position.x = data.Pos.x;
    this.syncData.Position.y = data.Pos.y;
    state_1.ground.SetCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
    socket_1.serverSocket.emit("CharacterMove", { ID: this.syncData.ID, Data: data });
    this.lastMoveTime = Date.now();
};
mob_1.Mob.prototype.MoveDir = function (rot) {
    var tmpPos = { x: this.syncData.Position.x, y: this.syncData.Position.y };
    if (rot === 3 /* Rotation.Left */)
        tmpPos.x--;
    if (rot === 1 /* Rotation.Top */)
        tmpPos.y--;
    if (rot === 2 /* Rotation.Right */)
        tmpPos.x++;
    if (rot === 0 /* Rotation.Down */)
        tmpPos.y++;
    var data = { Rot: rot, Pos: tmpPos };
    this.Move(data);
};
mob_1.Mob.prototype.CanMove = function () {
    return ((Date.now() - this.lastMoveTime) > this.moveDelay) && !this.IsDead();
};
mob_1.Mob.prototype.IdleMoving = function () {
    if (!this.CanMove())
        return;
    if (Math.random() > 0.95) {
        this.MoveByVector({ x: Math.sin(Math.random() * Math.PI * 2), y: Math.sin(Math.random() * Math.PI * 2) });
    }
};
mob_1.Mob.prototype.MoveByVector = function (desiredMoveV) {
    if (!this.CanMove())
        return;
    var dataArr = new Array(4);
    var radians = Math.atan2(desiredMoveV.y, desiredMoveV.x);
    dataArr[3 /* Rotation.Left */] = ({
        can: this.TileCanMove(this.syncData.InLayer, this.syncData.Position.x - 1, this.syncData.Position.y),
        desire: Math.cos(radians)
    });
    dataArr[0 /* Rotation.Down */] = ({
        can: this.TileCanMove(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y + 1),
        desire: Math.cos(radians + (Math.PI / 2))
    });
    dataArr[2 /* Rotation.Right */] = ({
        can: this.TileCanMove(this.syncData.InLayer, this.syncData.Position.x + 1, this.syncData.Position.y),
        desire: Math.cos(radians + Math.PI)
    });
    dataArr[1 /* Rotation.Top */] = ({
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
};
mob_1.Mob.prototype.TileCanMove = function (layer, x, y) {
    return !state_1.ground.GetCollision(layer, x, y) && !state_1.ground.SafeZone(layer, x, y);
};
//# sourceMappingURL=index.js.map