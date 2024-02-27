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
exports.LoadCharacter = void 0;
const state_1 = require("@game/state");
// import * as Backpack from '../../Features/Backpack/LoadBackpack';
const _events_1 = require("@events");
const authentication_1 = require("@game/player/load/authentication");
const Model = __importStar(require("@models/character"));
function LoadCharacter(plr, socket, authcode) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("authcode: " + authcode);
        console.log("Loading Character By Authcode");
        const characterId = yield (0, authentication_1.GetCharacterByAuthCode)(authcode);
        console.log("Character loaded. Id: " + characterId);
        if (characterId == null) {
            console.log("Character not founded by Code");
            return;
        }
        Model.Character.findOne({ where: { id: characterId } })
            .then((char) => {
            if (!char) {
                console.log('Usuário não encontrado!');
                return;
            }
            plr.syncData.SqlID = char.id;
            plr.syncData.Name = char.name;
            plr.syncData.Level = char.level;
            plr.syncData.CurrentExp = char.experience;
            plr.syncData.UUID = char.uuid;
            plr.syncData.HP = char.health;
            plr.syncData.MaxHP = char.max_health;
            plr.syncData.Speed = char.speed;
            plr.syncData.Race = char.skin_name;
            plr.syncData.Position = char.position;
            plr.syncData.equipments = char.equipments;
            plr.Sync();
            socket.emit("NewCharacters", state_1.characterList.GetAllSyncData());
            plr.SelfAnnouce();
            state_1.characterList.AddNewPlayer(plr);
            plr.UpdateExperience();
            plr.sendNotification({
                Title: 'Tibia on Rails',
                Content: 'Bem vindo a Alpha v0.1'
            });
            plr.UpdateEquipments();
            plr.CheckSafeZone();
            plr.AddPlayerList();
            _events_1.serverEvent.emit('user:connect', plr, socket);
            // Chat.OnConnection(plr, socket);
        })
            .catch(err => {
            console.error('Erro ao buscar usuário:', err);
        });
    });
}
exports.LoadCharacter = LoadCharacter;
//# sourceMappingURL=index.js.map