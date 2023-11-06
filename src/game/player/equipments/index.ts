import { Player } from '@game/player';

Player.prototype.UpdateEquipments = function (): void {
  let data = this.syncData.equipments;

  // for (const slot in data) {
  //   if (data[slot]) {
  //     const itemTemplate = ItemTemplate.GetByID(data[slot].item_template_id);
  //     data[slot].image = itemTemplate.Image;
  //   }
  // }

  // this.socket.emit("Character:UpdateEquipments", { ID: this.syncData.ID, Data: data });
  this.RecalculeAttackPower();
}

Player.prototype.RecalculeAttackPower = function (): void {
  let recalculatedAttack = 0;

  // for (const slot in this.syncData.equipments) {
  //   if (this.syncData.equipments[slot]) {
  //     const itemTemplate = ItemTemplate.GetByID(this.syncData.equipments[slot].item_template_id);
  //     if (itemTemplate.Attack > 0)
  //       recalculatedAttack += itemTemplate.Attack;
  //   }
  // }

  this.syncData.Attack = recalculatedAttack;
}


