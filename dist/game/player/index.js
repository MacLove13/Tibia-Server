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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const dataSync_1 = require("@game/character/dataSync");
const socket_1 = require("@socket/socket");
const GameState = __importStar(require("@game/state"));
const Geometry = __importStar(require("@utils/geometry"));
var startSprites = ["Hero"];
var playerClass = ["Warrior"];
// import '@game/player/movimentation';
// import '@game/player/attack';
class Player {
    constructor(socket) {
        this.AttackDelay = 850;
        this.LastAttackTime = 0;
        this.activeEnemiesList = false;
        this.inSafeZone = false;
        this.mainBackpackId = 0;
        this.syncData = new dataSync_1.DataSync(startSprites[(Math.random() * startSprites.length) | 0], playerClass[(Math.random() * playerClass.length) | 0]);
        this.syncData.Position = { x: 60, y: 50 };
        this.syncData.ID = socket.id;
        this.socket = socket;
        this.intervalEnemies = setInterval(() => this.UpdateEnemyList(), 200);
    }
    GetID() {
        return this.syncData.ID;
    }
    IsDead() {
        return this.syncData.HP <= 0;
    }
    InSafeZone() {
        return this.inSafeZone;
    }
    GetJSON() {
        return this.syncData.toJSON();
    }
    GetHP() {
        return this.syncData.HP;
    }
    Revive() {
        this.syncData.HP = this.syncData.MaxHP;
        this.syncData.Position = { x: 73, y: 38 };
        socket_1.serverSocket.sockets.emit("SelfHeal", { TargetID: this.syncData.ID, Health: this.syncData.HP });
        this.socket.emit("CharacterTeleport", { ID: this.syncData.ID, Data: { Rot: 0, Pos: this.syncData.Position } });
    }
    Heal(Points) {
        var newLife = this.syncData.HP + Points;
        if (newLife > this.syncData.MaxHP)
            newLife = this.syncData.MaxHP;
        this.syncData.HP = newLife;
        socket_1.serverSocket.sockets.emit("SelfHeal", { TargetID: this.syncData.ID, Health: this.syncData.HP });
    }
    UseItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            /* try {
              const item = await getItem(data.item_uuid);
              if (item) {
                if (item.type == 0) { // Food
                  // if (this.syncData.HP >= this.syncData.MaxHP) return;
        
                  this.Heal(item.item_template.HealHP);
                  this.ConsumeItem(data.item_uuid, data.backpack_uuid, item);
                }
                else if (item.type == 4) { // Sword
                  this.Equip(data.item_uuid, data.backpack_uuid, item);
                }
              } else {
                console.log('No item found with that UUID.');
              }
            } catch (error) {
              console.error('Error getting item:', error);
            } */
        });
    }
    AddExp(exp) {
        this.syncData.CurrentExp += exp;
        if (this.syncData.CurrentExp >= GameState.config.Player.LvlExp[this.syncData.Level]) {
            this.syncData.Level++;
            this.syncData.CurrentExp = 0;
            socket_1.serverSocket.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: exp, NextLvl: this.syncData.Level });
            this.syncData.MaxHP += 35;
            this.syncData.HP = this.syncData.MaxHP;
            this.syncData.Speed += 20;
            this.Sync();
        }
        else {
            socket_1.serverSocket.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: this.syncData.CurrentExp });
        }
    }
    // @ts-ignore - Ignore the following TypeScript error
    // UpdateEnemyList(): void;
    UpdateExperience() {
        socket_1.serverSocket.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: this.syncData.CurrentExp });
    }
    UpdateEnemyList() {
        let count = 0;
        let battleList = [];
        let target = null;
        if (this.targetChar != null) {
            if (this.targetChar instanceof Player)
                target = this.targetChar.syncData.ID;
        }
        GameState.characterList.ForEach((char) => {
            if (char == this)
                return;
            var dist = Geometry.GetDistance(this.syncData.Position, char.GetJSON().Position);
            if (dist > 10)
                return;
            battleList.push({
                id: char.syncData.ID,
                name: char.syncData.Race,
                level: char.syncData.level,
                hp: char.syncData.HP,
                max_hp: char.syncData.MaxHP,
                distance: dist,
            });
        });
        if (battleList.length > 0 || this.targetChar != null) {
            battleList.sort((a, b) => a.distance - b.distance);
            this.socket.emit("BattleMenu", { ID: this.syncData.ID, Data: {
                    battleList: battleList,
                    TargetID: target,
                }
            });
            this.activeEnemiesList = true;
        }
        else {
            if (this.activeEnemiesList) {
                this.socket.emit("BattleMenu", { ID: this.syncData.ID, Data: {
                        battleList: [],
                        TargetID: null,
                    }
                });
            }
            this.activeEnemiesList = false;
        }
    }
}
exports.Player = Player;
require("@game/player/attack");
require("@game/player/equipments");
require("@game/player/load");
require("@game/player/movement");
require("@game/player/notification");
require("@game/player/save");
require("@game/player/stream");
//# sourceMappingURL=index.js.map