import * as SocketIO from 'socket.io';
import { characterList } from "@game/state";
import { Player } from "@game/player";
// import * as Backpack from '../../Features/Backpack/LoadBackpack';
import { serverEvent } from '@events';
import { GetCharacterByAuthCode } from '@game/player/load/authentication';

import * as Chat from '@game/chat';
import * as Model from "@models/character";

export async function LoadCharacter(plr: Player, socket: SocketIO.Socket, authcode: string) {

  console.log("authcode: " + authcode)
  console.log("Loading Character By Authcode")
  const characterId = await GetCharacterByAuthCode(authcode);

  console.log("Character loaded. Id: " + characterId);
  if (characterId == null) {
    console.log("Character not founded by Code");
    return;
  }


  Model.Character.findOne({ where: { id: characterId } })
  .then((char: any) => {
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

    plr.AddPlayerList();

    serverEvent.emit('user:connect', plr, socket);

    // Chat.OnConnection(plr, socket);
  })
  .catch(err => {
    console.error('Erro ao buscar usuário:', err);
  });
}
