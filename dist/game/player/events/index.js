"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnConnection = void 0;
const state_1 = require("@game/state");
const socket_1 = require("@socket/socket");
// import * as ItemTemplate from '../../Features/ItemTemplate/ItemTemplate';
function OnConnection(plr, socket) {
    socket.on("PlayerMove", function (data) {
        plr.Move(data);
    });
    socket.on("PlayerHeal", function (data) {
        plr.Heal(data.Points);
    });
    socket.on("UseItem", function (data) {
        // plr.UseItem(data);
    });
    socket.on("EquipItem", function (data) {
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
    socket.on("PlayerMessage", function (data) {
        socket_1.serverSocket.sockets.emit("CharacterMessage", { Msg: data.Msg, ID: socket.id });
    });
    socket.on("PlayerTarget", function (data) {
        var plr = state_1.characterList.GetByID(socket.id);
        if (plr) {
            if (data.IsTargeting) {
                var targetChar = state_1.characterList.GetByID(data.ID);
                if (!targetChar)
                    return;
                plr.Target(targetChar);
            }
            else {
                plr.Untarget();
            }
        }
    });
}
exports.OnConnection = OnConnection;
//# sourceMappingURL=index.js.map