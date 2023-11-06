"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("@game/player");
const state_1 = require("@game/state");
player_1.Player.prototype.Move = function (data) {
    if (state_1.ground.HaveAnyTileToHover(this.syncData.InLayer, data.Pos.x, data.Pos.y)) {
        this.socket.emit("map:HoverYTile", { ID: this.syncData.ID, Toggle: true });
    }
    else {
        this.socket.emit("map:HoverYTile", { ID: this.syncData.ID, Toggle: false });
    }
    if (state_1.ground.GetCollision(this.syncData.InLayer, data.Pos.x, data.Pos.y)) {
        this.socket.emit("CharacterTeleport", { ID: this.syncData.ID, Data: { Rot: 0, Pos: this.syncData.Position } });
        this.socket.emit("UpdatePositionTileEditor", { ID: this.syncData.ID, Data: data });
        this.CheckSafeZone();
        return;
    }
    state_1.ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
    this.syncData.Position.x = data.Pos.x;
    this.syncData.Position.y = data.Pos.y;
    state_1.ground.SetCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
    this.CheckSafeZone();
    this.socket.broadcast.emit("CharacterMove", { ID: this.syncData.ID, Data: data });
    this.socket.emit("UpdatePositionTileEditor", { ID: this.syncData.ID, Data: data });
};
player_1.Player.prototype.MoveDir = function (rot) {
    var tmpPos = { x: this.syncData.Position.x, y: this.syncData.Position.y };
    if (rot === 3 /* Rotation.Left */) {
        tmpPos.x--;
    }
    if (rot === 1 /* Rotation.Top */) {
        tmpPos.y--;
    }
    if (rot === 2 /* Rotation.Right */) {
        tmpPos.x++;
    }
    if (rot === 0 /* Rotation.Down */) {
        tmpPos.y++;
    }
    var data = { Rot: rot, Pos: tmpPos };
    this.Move(data);
};
player_1.Player.prototype.CanMove = function () {
    return true;
};
player_1.Player.prototype.CheckSafeZone = function () {
    if (!this.InSafeZone() && state_1.ground.SafeZone(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y)) {
        this.inSafeZone = true;
        this.socket.emit("character:textNotification", { Message: "Você entrou em uma safezone." });
    }
    else if (this.InSafeZone() && !state_1.ground.SafeZone(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y)) {
        this.inSafeZone = false;
        this.socket.emit("character:textNotification", { Message: "Você saiu de uma safezone." });
    }
};
//# sourceMappingURL=index.js.map