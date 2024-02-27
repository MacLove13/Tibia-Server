import * as SocketIO from 'socket.io';
import { serverEvent } from '@events';
import { Item } from '@models/item';
import { characterList } from '@game/state';
import * as ItemTemplate from '@game/item_template';
import { GetItemByUUID, GetItemByID } from '@game/item/find';

export async function Open(data: { socket: SocketIO.Socket, BackpackUUID: string }) {
  var plr = characterList.GetByID(data.socket.id);
  if (!plr) return;

  let item = await GetItemByUUID(data.BackpackUUID);
  let backpackTemplate = ItemTemplate.GetByID(item.item_template_id);

  console.log("Load Item from Backpack:")
  console.log(data.BackpackUUID)

  const rows = await Item.findAll({
    where: { inside_item: data.BackpackUUID }
  });

  let itemList = [];

  rows.map(item => {
    // @ts-ignore - Ignore the following TypeScript error
    const itemTemplate = ItemTemplate.GetByID(item.item_template_id);

    // @ts-ignore - Ignore the following TypeScript error
    itemList.push({
      type: 'ITEM',
      item: {
        // @ts-ignore - Ignore the following TypeScript error
        uuid: item.uuid,
        // @ts-ignore - Ignore the following TypeScript error
        type: item.type,
        // @ts-ignore - Ignore the following TypeScript error
        name: item.name,
        // @ts-ignore - Ignore the following TypeScript error
        quantity: item.quantity,
        // @ts-ignore - Ignore the following TypeScript error
        image: item.image,
        // @ts-ignore - Ignore the following TypeScript error
        item_template_id: item.item_template_id,
        item_template: itemTemplate.toJSON()
      }
    })
  })

  // @ts-ignore - Ignore the following TypeScript error
  plr.socket.emit('Character:ShowBag', { uuid: data.BackpackUUID, slots: backpackTemplate.slots, Data: itemList });
}

export async function Update(player, backpackId) {
  let item = await GetItemByUUID(backpackId);
  let backpackTemplate = ItemTemplate.GetByID(item.item_template_id);

  const rows = await Item.findAll({
    where: { inside_item: backpackId }
  });

  let itemList = [];

  rows.map(item => {
    // @ts-ignore - Ignore the following TypeScript error
    const itemTemplate = ItemTemplate.GetByID(item.item_template_id);

    itemList.push({
      type: 'ITEM',
      item: {
        // @ts-ignore - Ignore the following TypeScript error
        uuid: item.uuid,
        // @ts-ignore - Ignore the following TypeScript error
        type: item.type,
        // @ts-ignore - Ignore the following TypeScript error
        name: item.name,
        // @ts-ignore - Ignore the following TypeScript error
        quantity: item.quantity,
        // @ts-ignore - Ignore the following TypeScript error
        image: item.image,
        // @ts-ignore - Ignore the following TypeScript error
        item_template_id: item.item_template_id,
        // @ts-ignore - Ignore the following TypeScript error
        item_template: itemTemplate.toJSON()
      }
    })
  })

  player.socket.emit('Character:ShowBag', { uuid: backpackId, slots: backpackTemplate.slots, Data: itemList });
}

serverEvent.on('Backpack:Open', Open);
