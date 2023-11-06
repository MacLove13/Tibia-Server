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
exports.DataSync = void 0;
const GameState = __importStar(require("@game/state"));
class DataSync {
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
            InLayer: this.InLayer
        };
    }
    constructor(race, uClass) {
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
        this.ID = DataSync.lastID.toString();
        this.Race = race;
        this.UClass = uClass;
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
        this.MaxExp = GameState.config.Player.LvlExp[this.Level];
        const mobConfig = GameState.config.Mobs[this.Race];
        if (mobConfig) {
            this.Speed = mobConfig.Speed;
            this.ExpAtDead = mobConfig.Experience;
            this.MaxHP = mobConfig.HP;
            this.HP = mobConfig.HP;
        }
        DataSync.lastID++;
    }
}
exports.DataSync = DataSync;
DataSync.lastID = 0;
//# sourceMappingURL=dataSync.js.map