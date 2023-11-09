import * as SocketIO from 'socket.io';
import * as Model from '@models/item';
import { serverEvent } from '@events';
import { Player } from '@game/player';
import * as ItemTemplate from '@game/item_template';

function createInitialItems(data: { player: Player, socket: SocketIO.Socket }) {

  const backpack = ItemTemplate.GetByID(1);

  if (!backpack || !backpack.id) {
    throw new Error('Backpack não encontrado ou ID não está definido.');
  }

  Model.Item.create({
    character_id: data.player.syncData.SqlID,
    item_template_id: backpack.id,
    quantity: 1
  }).then((item: any) => {
    data.player.syncData.equipments = {
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

    data.player.Save();
  }).catch(error => {
    data.player.syncData.equipments = {
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

// serverEvent.on('user:connect', createInitialItems);
