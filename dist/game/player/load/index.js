"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadCharacter = void 0;
const state_1 = require("@game/state");
// import {db} from '../../database/connection';
// import * as Backpack from '../../Features/Backpack/LoadBackpack';
const database_1 = require("@game/player/database");
function LoadCharacter(plr, socket, authcode) {
    database_1.PlayerDB.findOne({ where: { id: 1 } })
        .then((char) => {
        if (!char) {
            console.log('Usuário não encontrado!');
            return;
        }
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
    })
        .catch(err => {
        console.error('Erro ao buscar usuário:', err);
    });
}
exports.LoadCharacter = LoadCharacter;
//# sourceMappingURL=index.js.map