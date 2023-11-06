"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterDataToSync = void 0;
class CharacterDataToSync {
    toJSON() {
        return {
            Position: this.Position,
            Speed: this.Speed,
            HP: this.HP,
            MaxHP: this.MaxHP,
            Race: this.Race,
            UClass: this.UClass,
            ID: this.ID,
            MaxExp: this.MaxExp,
            Level: this.Level,
            Attack: this.Attack,
            equipments: this.equipments,
            InLayer: this.InLayer,
        };
    }
    constructor(race) {
        this.Position = { x: 60, y: 50 };
        this.Level = 5;
        this.CurrentExp = 0;
        this.ExpAtDead = 0;
        this.Attack = 0;
        this.equipments = {
            helmet: null,
            amulet: null,
            bag: null,
            leftHand: null,
            rightHand: null,
            armor: null,
            legs: null,
            boot: null,
            ring: null,
            ammo: null,
        };
        this.ID = CharacterDataToSync.lastID.toString();
        /*
        this.Race = race;
        this.UClass = "";
        this.MaxExp = config.Player.LvlExp[this.Level];
        this.Speed = config.Mobs[this.Race].Speed;
        this.ExpAtDead = config.Mobs[this.Race].Experience;
        CharacterDataToSync.lastID++;
        this.MaxHP = config.Mobs[this.Race].HP;
        this.HP = config.Mobs[this.Race].HP;
        this.Attack = 0;
        this.equipments = {
            helmet: null,
            amulet: null,
            bag: null,
            leftHand: null,
            rightHand: null,
            armor: null,
            legs: null,
            boot: null,
            ring: null,
            ammo: null,
        };
        this.InLayer = 0;

        */
    }
}
exports.CharacterDataToSync = CharacterDataToSync;
CharacterDataToSync.lastID = 0;
//# sourceMappingURL=index.js.map