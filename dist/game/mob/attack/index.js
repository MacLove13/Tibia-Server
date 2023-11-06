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
const mob_1 = require("@game/mob");
const GameState = __importStar(require("@game/state"));
const socket_1 = require("@socket/socket");
const Geometry = __importStar(require("@utils/geometry"));
mob_1.Mob.prototype.Target = function (char) {
    if (char.InSafeZone())
        return;
    this.targetChar = char;
};
mob_1.Mob.prototype.Untarget = function () {
    this.targetChar = null;
};
mob_1.Mob.prototype.AttackTarget = function () {
    if (!this.targetChar)
        return;
    if (this.targetChar.GetHP() < 0) {
        this.Untarget();
        return;
    }
    if (this.targetChar.InSafeZone()) {
        this.Untarget();
        return;
    }
    if (!this.CanAttack())
        return;
    var dist = Geometry.GetDistance(this.syncData.Position, this.targetChar.GetJSON().Position);
    if (dist > 1.5)
        return;
    var dmg = Math.random() * 5 | 0 + 1;
    this.targetChar.Hit(dmg);
    this.LastAttackTime = Date.now();
};
mob_1.Mob.prototype.Hit = function (dmg) {
    socket_1.serverSocket.sockets.emit("ApplyDommage", { AttackType: 0, TargetID: this.syncData.ID, HitPoints: dmg });
    this.syncData.HP -= dmg;
    if (this.syncData.HP <= 0) {
        this.Kill();
        return { Exp: this.syncData.ExpAtDead };
    }
    return { Exp: this.syncData.ExpAtDead }; // Remove on uncomment code
};
mob_1.Mob.prototype.Kill = function () {
    this.syncData.HP = -1;
    this.Dispose();
    const race = this.GetJSON().Race;
    socket_1.serverSocket.sockets.emit("Animation", {
        Sprites: GameState.config.Mobs[race].DeadSprites,
        Pos: this.syncData.Position,
        TicksPerFrame: 2000
    });
};
mob_1.Mob.prototype.CanAttack = function () {
    return ((Date.now() - this.LastAttackTime) > this.AttackDelay) && !this.IsDead();
};
//# sourceMappingURL=index.js.map