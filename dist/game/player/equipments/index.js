"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("@game/player");
player_1.Player.prototype.UpdateEquipments = function () {
    let data = this.syncData.equipments;
    // for (const slot in data) {
    //   if (data[slot]) {
    //     const itemTemplate = ItemTemplate.GetByID(data[slot].item_template_id);
    //     data[slot].image = itemTemplate.Image;
    //   }
    // }
    // this.socket.emit("Character:UpdateEquipments", { ID: this.syncData.ID, Data: data });
    this.RecalculeAttackPower();
};
player_1.Player.prototype.RecalculeAttackPower = function () {
    let recalculatedAttack = 0;
    // for (const slot in this.syncData.equipments) {
    //   if (this.syncData.equipments[slot]) {
    //     const itemTemplate = ItemTemplate.GetByID(this.syncData.equipments[slot].item_template_id);
    //     if (itemTemplate.Attack > 0)
    //       recalculatedAttack += itemTemplate.Attack;
    //   }
    // }
    this.syncData.Attack = recalculatedAttack;
};
//# sourceMappingURL=index.js.map