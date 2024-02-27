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
exports.Player = exports.allPlayers = void 0;
const dataSync_1 = require("@game/character/dataSync");
const socket_1 = require("@socket/socket");
const GameState = __importStar(require("@game/state"));
var startSprites = ["Hero"];
var playerClass = ["Warrior"];
exports.allPlayers = [];
// import '@game/player/movimentation';
// import '@game/player/attack';
class Player {
    constructor(socket) {
        this.AttackDelay = 850;
        this.LastAttackTime = 0;
        this.activeEnemiesList = false;
        this.inSafeZone = false;
        this.mainBackpackId = 0;
        this.conversations = [];
        this.syncData = new dataSync_1.DataSync(startSprites[(Math.random() * startSprites.length) | 0], playerClass[(Math.random() * playerClass.length) | 0]);
        this.syncData.Position = { x: 60, y: 50 };
        this.syncData.ID = socket.id;
        this.socket = socket;
        this.intervalEnemies = setInterval(() => this.UpdateEnemyList(), 200);
    }
    AddPlayerList() {
        var existent = exports.allPlayers.find(x => x.syncData.ID === this.syncData.ID);
        if (existent != undefined)
            return;
        exports.allPlayers.push(this);
        console.log('PlayerList Updated - Connect');
        console.log(exports.allPlayers.length);
    }
    RemovePlayerList() {
        exports.allPlayers = exports.allPlayers.filter(x => x.syncData.ID !== this.syncData.ID);
        console.log('PlayerList Updated - Disconnect');
        console.log(exports.allPlayers.length);
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
        this.syncData.Position = { x: 60, y: 50 };
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
    UpdateExperience() {
        socket_1.serverSocket.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: this.syncData.CurrentExp });
    }
}
exports.Player = Player;
// Prototypes
require("@game/player/attack");
require("@game/player/equipments");
require("@game/player/load");
require("@game/player/movement");
require("@game/player/notification");
require("@game/player/save");
require("@game/player/stream");
// Othes
require("@game/player/initial");
//# sourceMappingURL=index.js.map