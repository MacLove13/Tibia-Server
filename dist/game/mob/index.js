"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mob = void 0;
const character_1 = require("@game/character");
require("@game/mob/movimentation");
require("@game/mob/attack");
class Mob {
    constructor(mobType, pos) {
        this.lastMoveTime = 0;
        this.moveDelay = 35000;
        this.LastAttackTime = 0;
        this.AttackDelay = 850;
        this.syncData = new character_1.CharacterDataToSync(mobType);
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
//# sourceMappingURL=index.js.map