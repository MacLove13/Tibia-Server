import * as SocketIO from 'socket.io';
import { serverEvent } from '@events';
import { Player } from "@game/player";
import { characterList } from "@game/state";
import { serverSocket } from '@socket/socket';
import { MoveData } from "@utils/interface";

// import * as ItemTemplate from '../../Features/ItemTemplate/ItemTemplate';

export function OnConnection(plr: Player, socket: SocketIO.Socket) {
  socket.on("PlayerMove", function (data: MoveData) {
    plr.Move(data);
  });

  socket.on("PlayerHeal", function (data: { Points: number }) {
    plr.Heal(data.Points);
  });

  socket.on("UseItem", function (data: { item_uuid: number, backpack_uuid: string }) {
    // plr.UseItem(data);
  });

  socket.on("EquipItem", function (data: { item_uuid: string }) {

    // BackpackItem.findOne({
    //   where: {
    //     uuid: data.item_uuid
    //   }
    // }).then(item => {
    //   if (item) {
        
    //     const itemTemplate = ItemTemplate.GetByID(item.item_template_id);

    //     if (itemTemplate.Type == 4)
    //         plr.Equip(item, itemTemplate);

    //   } else {
    //     console.log('Item não encontrado');
    //   }
    // }).catch(error => {
    //   console.error('Erro ao buscar o item:', error);
    // });
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

}


