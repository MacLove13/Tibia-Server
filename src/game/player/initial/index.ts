import * as SocketIO from 'socket.io';
import * as Model from '@models/item';
import { serverEvent } from '@events';
import { Player } from '@game/player';
import * as ItemTemplate from '@game/item_template';

const BACKPACK_ITEMTEMPLATE_ID = 2;

function createInitialItems(player: Player, socket: SocketIO.Socket) {

  if (player.syncData.equipments != null) return;
  const backpack = ItemTemplate.GetByID(BACKPACK_ITEMTEMPLATE_ID);

  if (!backpack || !backpack.id) {
    throw new Error('Backpack não encontrado ou ID não está definido.');
  }

  Model.Item.create({
    character_id: player.syncData.SqlID,
    item_template_id: backpack.id,
    quantity: 1
  }).then((item: any) => {
    player.syncData.equipments = {
      helmet: null,
      amulet: null,
      bag: item.uuid,
      leftHand: null,
      rightHand: null,
      armor: null,
      legs: null,
      boot: null,
      ring: null,
      ammo: null,
    };

    player.Save();
  }).catch(error => {
    console.log(error)
    player.syncData.equipments = {
      helmet: null,
      amulet: null,
      bag: null,
      leftHand: null,
      rightHand: null,
      armor: null,
      legs: null,
      boot: null,
      ring: null,
      ammo: null,
    };
  });

  
}

serverEvent.on('user:connect', createInitialItems);
