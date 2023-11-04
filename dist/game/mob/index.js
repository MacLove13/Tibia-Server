"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mob = void 0;
const character_1 = require("@game/character");
class Mob {
    constructor(mobType, pos) {
        // private syncData;
        this.lastMoveTime = 0;
        this.moveDelay = 35000;
        this.LastAttackTime = 0;
        this.AttackDelay = 850;
        this.syncData = new character_1.CharacterDataToSync(mobType);
        this.syncData.Position = pos;
        this.moveDelay = 35000 / this.syncData.Speed;
    }
}
exports.Mob = Mob;
//# sourceMappingURL=index.js.map