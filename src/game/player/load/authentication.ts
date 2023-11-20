import * as SocketIO from 'socket.io';
import { characterList } from "@game/state";
import { Player } from "@game/player";
import { serverEvent } from '@events';

import * as Model from "@models/character_authentication";

export async function GetCharacterByAuthCode(authcode: string) {

  console.log('GetCharacterByAuthCode called.');
  let characterId = null;

  await Model.CharacterAuthentication.findOne({ where: { code: authcode } })
  .then((char: any) => {
    if (!char) {
      console.log('Auth Code not founded.');
    }
    else {
      console.log(".character_id " + char.character_id)

      console.log('GetCharacterByAuthCode success.');
      characterId = char.character_id;
    }
  })
  .catch(err => {
    console.error('Erro ao buscar usuário:', err);
  });


  return characterId;
}
