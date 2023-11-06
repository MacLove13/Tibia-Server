import * as SocketIO from 'socket.io';
import { characterList } from "@game/state";
import { Player } from "@game/player";
// import {db} from '../../database/connection';
// import * as Backpack from '../../Features/Backpack/LoadBackpack';

import { PlayerDB } from "@game/player/database";

export function LoadCharacter(plr: Player, socket: SocketIO.Socket, authcode: string) {

  PlayerDB.findOne({ where: { id: 1 } })
  .then((char: any) => {
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
    socket.emit("NewCharacters", characterList.GetAllSyncData());
    plr.SelfAnnouce();
    characterList.AddNewPlayer(plr);
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
