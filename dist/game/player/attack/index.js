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
const socket_1 = require("@socket/socket");
const GameState = __importStar(require("@game/state"));
const Geometry = __importStar(require("@utils/geometry"));
player_1.Player.prototype.Target = function (char) {
    if (this.InSafeZone()) {
        this.socket.emit("character:textNotification", { Message: "Você não pode atacar dentro de uma safezone." });
        this.targetChar = null;
        return;
    }
    if (char.InSafeZone()) {
        this.socket.emit("character:textNotification", { Message: "Você não pode atacar um alvo que está em uma safezone." });
        this.targetChar = null;
        return;
    }
    this.targetChar = char;
};
player_1.Player.prototype.Untarget = function () {
    this.targetChar = null;
};
player_1.Player.prototype.AttackTarget = function () {
    if (!this.targetChar)
        return;
    if (this.targetChar.GetHP() < 0) {
        this.targetChar = null;
        return;
    }
    if (this.InSafeZone()) {
        this.socket.emit("character:textNotification", { Message: "Você não pode atacar dentro de uma safezone." });
        this.targetChar = null;
        return;
    }
    let attackDistance = this.syncData.UClass == 'Warrior' ? 1.5 : 6;
    if (!(Date.now() - this.LastAttackTime > this.AttackDelay))
        return;
    var dist = Geometry.GetDistance(this.syncData.Position, this.targetChar.GetJSON().Position);
    if (dist > attackDistance)
        return;
    // serverSocket.sockets.emit("SpawnProjectile", { Type: 0, StartPos: this.GetJSON().Position, TargetPos: this.targetChar.GetJSON().Position });
    let randomNum = Math.floor(Math.random() * 3) + 1; // 1 ~ 3
    let criticalChance = Math.floor(Math.random() * 99) + 1; // 1 ~ 100
    let criticalRange = Math.floor(Math.random() * 99) + 1; // 1 ~100
    var dmg = this.syncData.Attack + randomNum; // Math.random() * this.syncData.Level * 6 | 0 + this.syncData.Level * 2;
    if (criticalChance < 2)
        dmg = 1;
    else if (criticalChance >= (criticalRange - 5) && criticalChance <= (criticalRange + 4)) {
        let criticalExtraDamage = Math.floor(Math.random() * 6) + 1; // 1 ~ 6
        dmg = dmg + criticalExtraDamage;
    }
    var deadInfo = this.targetChar.Hit(dmg);
    if (deadInfo) {
        this.AddExp(deadInfo.Exp);
    }
    this.LastAttackTime = Date.now();
};
player_1.Player.prototype.Hit = function (dmg) {
    socket_1.serverSocket.sockets.emit("ApplyDommage", { AttackType: 0, TargetID: this.syncData.ID, HitPoints: dmg });
    this.syncData.HP -= dmg;
    if (this.syncData.HP <= 0) {
        this.Kill();
        return { Exp: this.syncData.ExpAtDead * this.syncData.Level };
    }
};
player_1.Player.prototype.Kill = function () {
    this.syncData.HP = -1;
    const race = this.GetJSON().Race;
    socket_1.serverSocket.sockets.emit("Animation", {
        Sprites: GameState.config.Mobs[race].DeadSprites,
        Pos: this.syncData.Position,
        TicksPerFrame: 2000
    }); // TicksPerFrame 500
    this.sendNotification({
        Title: "Morte",
        Content: "Você morreu."
    });
    this.Dispose();
};
player_1.Player.prototype.CanAttack = function () {
    return (Date.now() - this.LastAttackTime) > this.AttackDelay;
};
//# sourceMappingURL=index.js.map