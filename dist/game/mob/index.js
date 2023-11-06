"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mob = void 0;
const dataSync_1 = require("@game/mob/dataSync");
class Mob {
    constructor(mobType, pos) {
        this.lastMoveTime = 0;
        this.moveDelay = 35000;
        this.LastAttackTime = 0;
        this.AttackDelay = 850;
        this.syncData = new dataSync_1.mobDataSync(mobType);
        this.syncData.Position = pos;
        this.moveDelay = 35000 / this.syncData.Speed;
    }
    GetID() {
        return this.syncData.ID;
    }
    IsDead() {
        return this.syncData.HP <= 0;
    }
    InSafeZone() {
        return false;
    }
    GetJSON() {
        return this.syncData.toJSON();
    }
    GetHP() {
        return this.syncData.HP;
    }
}
exports.Mob = Mob;
require("@game/mob/movementation");
require("@game/mob/attack");
require("@game/mob/stream");
//# sourceMappingURL=index.js.map