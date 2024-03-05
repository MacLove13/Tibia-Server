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
exports.mobDataSync = void 0;
const GameState = __importStar(require("@game/state"));
class mobDataSync {
    toJSON() {
        return {
            Position: this.Position,
            Speed: this.Speed,
            HP: this.HP,
            MaxHP: this.MaxHP,
            Race: this.Race,
            ID: this.ID,
            Level: this.Level,
            Attack: this.Attack,
            InLayer: this.InLayer,
            Freezed: this.Freezed,
            Rotation: this.Rotation,
            Hostile: this.Hostile,
        };
    }
    constructor(race) {
        this.ID = mobDataSync.lastID.toString();
        this.Race = race;
        const mobConfig = GameState.config.Mobs[this.Race];
        if (mobConfig) {
            this.Speed = mobConfig.Speed;
            this.ExpAtDead = mobConfig.Experience;
            this.MaxHP = mobConfig.HP;
            this.HP = mobConfig.HP;
        }
        this.Attack = 0;
        this.InLayer = 0;
        this.Freezed = false;
        this.Hostile = true;
        this.Rotation = 0;
        mobDataSync.lastID++;
    }
}
exports.mobDataSync = mobDataSync;
mobDataSync.lastID = 0;
//# sourceMappingURL=dataSync.js.map