"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("@game/player");
const GameState = __importStar(require("@game/state"));
const Geometry = __importStar(require("@utils/geometry"));
const socket_1 = require("@socket/socket");
player_1.Player.prototype.Dispose = function () {
    // serverSocket.emit("DeleteCharacters", [this.syncData.ID]);
    GameState.ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
    // this.socket.disconnect();
    this.Revive();
};
player_1.Player.prototype.Disconnect = function () {
    this.Save();
    this.RemovePlayerList();
    socket_1.serverSocket.emit("DeleteCharacters", [this.syncData.ID]);
    GameState.ground.FreeCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
    this.socket.disconnect();
};
player_1.Player.prototype.SelfAnnouce = function () {
    this.socket.broadcast.emit("NewCharacters", [this.GetJSON()]);
    GameState.ground.SetCollision(this.syncData.InLayer, this.syncData.Position.x, this.syncData.Position.y);
};
player_1.Player.prototype.Sync = function () {
    this.socket.emit("PlayerStart", this.GetJSON());
};
player_1.Player.prototype.UpdateEnemyList = function () {
    let count = 0;
    let battleList = [];
    let target = null;
    if (this.targetChar != null) {
        // if (this.targetChar instanceof Player)
        target = this.targetChar.syncData.ID;
    }
    GameState.characterList.ForEach((char) => {
        if (char == this)
            return;
        var dist = Geometry.GetDistance(this.syncData.Position, char.GetJSON().Position);
        if (dist > 12)
            return;
        battleList.push({
            id: char.syncData.ID,
            name: char.syncData.Race,
            level: char.syncData.level,
            hp: char.syncData.HP,
            max_hp: char.syncData.MaxHP,
            distance: dist,
            target: char.syncData.ID == target,
            test: target
        });
    });
    if (battleList.length > 0 || this.targetChar != null) {
        battleList.sort((a, b) => a.distance - b.distance);
        this.socket.emit("BattleMenu", { ID: this.syncData.ID, Data: {
                battleList: battleList
            }
        });
        this.activeEnemiesList = true;
    }
    else {
        if (this.activeEnemiesList) {
            this.socket.emit("BattleMenu", { ID: this.syncData.ID, Data: {
                    battleList: []
                }
            });
        }
        this.activeEnemiesList = false;
    }
};
//# sourceMappingURL=index.js.map