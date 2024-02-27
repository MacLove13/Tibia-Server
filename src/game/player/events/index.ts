import * as SocketIO from 'socket.io';
import { serverEvent } from '@events';
import { Player } from "@game/player";
import { characterList } from "@game/state";
import { serverSocket } from '@socket/socket';
import { MoveData } from "@utils/interface";
import * as ItemTemplate from '@game/item_template';
import * as Item from '@game/item/find';

export function OnConnection(plr: Player, socket: SocketIO.Socket) {
  socket.on("PlayerMove", function (data: MoveData) {
    plr.Move(data);
  });

  socket.on("PlayerHeal", function (data: { Points: number; }) {
    plr.Heal(data.Points);
  });

  socket.on("UseItem", async function (data: { item_uuid: string; backpack_uuid: string; }) {
    const item = await Item.GetItemByUUID(data.item_uuid);
    const itemTemplate = ItemTemplate.GetByID(item.item_template_id);

    if (itemTemplate.type == 4)
      plr.Equip('leftHand', item, itemTemplate, data.backpack_uuid);
  });

  socket.on("EquipItem", async function (data: { slot: string;  item_uuid: string; }) {
    const item = await Item.GetItemByUUID(data.item_uuid);
    const itemTemplate = ItemTemplate.GetByID(item.item_template_id);

    if (itemTemplate.type == 4 && data.slot == 'leftHand')
      plr.Equip('leftHand', item, itemTemplate);
  });

  socket.on("UnequipItem", async function (data: { slot: string;  item_uuid: string; backpack_uuid: string; }) {
    plr.Unequip(data.slot, data.item_uuid, data.backpack_uuid);
  });

  socket.on("PlayerMessage", function (data: { Msg: string }) {
    serverSocket.sockets.emit("CharacterMessage", { Msg: data.Msg, ID: socket.id });
  });

  socket.on("PlayerTarget", function (data: { ID: string; IsTargeting: boolean }) {
    var plr = characterList.GetByID(socket.id);
  
    if (plr) {
      if (data.IsTargeting) {
        var targetChar = characterList.GetByID(data.ID);
        if (!targetChar) return;
        plr.Target(targetChar);
      } else {
        plr.Untarget();
      }
    }
  });

  socket.on("Character:OpenEquippedBag", function () {
    var plr = characterList.GetByID(socket.id);
    if (!plr) return;

    // @ts-ignore - Ignore the following TypeScript error
    serverEvent.emit("Backpack:Open", {
      socket: socket,
      BackpackUUID: (plr as Player).syncData.equipments.bag
    });
  });
}


