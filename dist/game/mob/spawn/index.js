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
exports.Spawn = void 0;
const mob_1 = require("@game/mob");
const state_1 = require("@game/state");
const Geometry = __importStar(require("@utils/geometry"));
class Spawn {
    constructor(posX, posY) {
        this.mobList = new Array();
        this.desiredMobCount = 0;
        this.newList = new Array();
        this.spawnableMobs = new Array();
        this.pos = { x: posX, y: posY };
    }
    MaintainMobCount(count) {
        this.desiredMobCount = count;
    }
    DefineMobsInSpawn(mobs) {
        this.spawnableMobs = mobs;
    }
    Process() {
        if (this.mobList.length + this.newList.length < this.desiredMobCount) {
            this.newList.push(Date.now());
        }
        if (this.newList.length > 0) {
            if ((this.newList[0] + state_1.config.MobSpawnDelay) < Date.now()) {
                this.addNew();
                this.newList.splice(0, 1);
            }
        }
        for (var i = 0; i < this.mobList.length; i++) {
            if (this.mobList[i].IsDead()) {
                state_1.characterList.RemoveByID(this.mobList[i].GetID());
                this.mobList.splice(i, 1);
                i--;
                continue;
            }
            if (this.mobList[i].targetChar) {
                const targetChar = this.mobList[i].targetChar;
                if (targetChar === null || targetChar === void 0 ? void 0 : targetChar.InSafeZone()) {
                    targetChar.Untarget();
                }
            }
            if (this.mobList[i].syncData.Hostile && !this.mobList[i].syncData.Freezed) {
                var nearestPlr = this.getNearestPlayer(this.mobList[i]);
                if (!nearestPlr)
                    return;
                var plrPos = nearestPlr.GetJSON().Position;
                var mobPos = this.mobList[i].GetJSON().Position;
                var dist = Geometry.GetDistance(mobPos, plrPos);
                if (!nearestPlr.inSafeZone) {
                    this.mobList[i].Target(nearestPlr);
                    this.mobList[i].AttackTarget();
                }
                if (dist < 7 && dist > 1.5 && !nearestPlr.inSafeZone) {
                    this.mobList[i].MoveByVector({ x: mobPos.x - plrPos.x, y: mobPos.y - plrPos.y });
                }
                if (dist >= 7 || nearestPlr.inSafeZone) {
                    this.mobList[i].IdleMoving();
                }
            }
            else {
                if (!this.mobList[i].syncData.Freezed) {
                    this.mobList[i].IdleMoving();
                }
            }
        }
    }
    addNew() {
        var char = new mob_1.Mob(this.spawnableMobs[(Math.random() * this.spawnableMobs.length) | 0], {
            x: ((Math.random() - 0.5) * 4 + this.pos.x) | 0,
            y: ((Math.random() - 0.5) * 4 + this.pos.y) | 0
        });
        if (state_1.ground.GetCollision(char.syncData.InLayer, char.syncData.Position.x, char.syncData.Position.y))
            return;
        char.SelfAnnouce();
        state_1.characterList.AddNewMob(char);
        this.mobList.push(char);
    }
    getNearestPlayer(mob) {
        var lastDist = 1000000;
        var selectedPlayer;
        state_1.characterList.ForEachPlayer((plr) => {
            var tmpDist = Geometry.GetDistance(plr.GetJSON().Position, mob.GetJSON().Position);
            if (tmpDist < lastDist) {
                lastDist = tmpDist;
                selectedPlayer = plr;
            }
        });
        return selectedPlayer;
    }
}
exports.Spawn = Spawn;
//# sourceMappingURL=index.js.map