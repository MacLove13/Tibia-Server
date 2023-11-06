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
exports.Stop = exports.Start = void 0;
const GameState = __importStar(require("@game/state"));
const spawn_1 = require("@game/mob/spawn");
var intervalHandle;
var spawnList = new Array();
function Start() {
    intervalHandle = setInterval(ServerInterval, 50);
    // Load Mobs from Data
    for (var i = 0; i < GameState.config.MobSpawns.length; i++) {
        spawnList.push(new spawn_1.Spawn(GameState.config.MobSpawns[i].Position.x, GameState.config.MobSpawns[i].Position.y));
        spawnList[i].MaintainMobCount(GameState.config.MobSpawns[i].Count);
        spawnList[i].DefineMobsInSpawn(GameState.config.MobSpawns[i].Mobs);
    }
}
exports.Start = Start;
function Stop() {
    if (intervalHandle)
        clearInterval(intervalHandle);
}
exports.Stop = Stop;
function ServerInterval() {
    GameState.characterList.ForEachPlayer((plr) => {
        plr.AttackTarget();
        if (plr.IsDead()) {
            GameState.characterList.RemoveByID(plr.GetID());
        }
    });
    for (var i = 0; i < spawnList.length; i++) {
        spawnList[i].Process();
    }
}
//# sourceMappingURL=loop.js.map