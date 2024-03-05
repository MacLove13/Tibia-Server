import { Player } from '@game/player';
import * as ItemFind from '@game/item/find';
import * as ItemTemplate from '@game/item_template';
import * as Backpack from '@game/item/backpack/removeItem';
import * as BackpackInteract from '@game/item/backpack';
import * as BackpackAdd from '@game/item/backpack/addItem';

Player.prototype.UpdateEquipments = async function (): Promise<void> {
  let data = this.syncData.equipments;
  let items = {
    helmet: { uuid: null, image: null },
    amulet: { uuid: null, image: null },
    bag: { uuid: null, image: null },
    leftHand: { uuid: null, image: null },
    rightHand: { uuid: null, image: null },
    armor: { uuid: null, image: null },
    legs: { uuid: null, image: null },
    boot: { uuid: null, image: null },
    ring: { uuid: null, image: null },
    ammo: { uuid: null, image: null }
  };

  for (const slot in data) {
    // @ts-ignore - Ignore the following TypeScript error
    if (data[slot]) {
      // @ts-ignore - Ignore the following TypeScript error
      const itemImage = await ItemFind.GetItemImageByItemUUID(data[slot]);

      // @ts-ignore - Ignore the following TypeScript error
      items[slot].uuid = data[slot]

      // @ts-ignore - Ignore the following TypeScript error
      items[slot].image = itemImage;
    }
  }

  this.socket.emit("Character:UpdateEquipments", { ID: this.syncData.ID, Data: items });
  this.RecalculeAttackPower();
}

Player.prototype.RecalculeAttackPower = async function (): Promise<void> {
  let recalculatedAttack = 0;
  let data = this.syncData.equipments;

  for (const slot in data) {
    if (data[slot]) {
      const item = await ItemFind.GetItemByUUID(data[slot]);
      if (!item) {
        data[slot] = null;
        continue;
      }

      const itemTemplate = ItemTemplate.GetByID(item.item_template_id);

      if (itemTemplate.attack > 0)
        recalculatedAttack += itemTemplate.attack;
    }
  }

  this.syncData.Attack = recalculatedAttack;
}

Player.prototype.Equip = async function (slot, item, itemTemplate, backpackUuid?): Promise<void> {
  const backpackUUID = item.inside_item;
  console.log("============= Equip")

  try {
    let result = false;
    if (this.syncData.equipments[slot] != null && backpackUuid) {
      result = await BackpackAdd.AddItem(this.syncData.equipments[slot], backpackUuid);
    }
    else if (this.syncData.equipments[slot] != null && !backpackUuid) {
      result = await BackpackAdd.AddItem(this.syncData.equipments[slot], this.syncData.equipments['bag']);
    }

    if (!result) {
      console.log("Erro on unequip item")
      return;
    }

    console.log('Removing item from bag')
    await Backpack.RemoveFromBag(item.uuid, 1);

    console.log('Updating Item')
    await BackpackInteract.Update(this, backpackUUID);

    this.syncData.equipments[slot] = item.uuid;

    this.textNotification(`Você equipou um(a) ${itemTemplate.name}.`);
    this.UpdateEquipments();
    this.Save();
  }
  catch(error) {
    console.error("Error on Equip: ", error);
  }
}

Player.prototype.Unequip = async function (slot, itemUuid, backpackUuid): Promise<void> {
  const haveSlots = BackpackAdd.BackpackHaveFreeSlot(backpackUuid);

  if (!haveSlots) {
    this.textNotification(`Não há espaço o suficiente na mochila.`);
    return;
  }

  try {
    const item = await ItemFind.GetItemByUUID(itemUuid);
    const itemTemplate = ItemTemplate.GetByID(item.item_template_id);

    await BackpackAdd.AddItem(itemUuid, backpackUuid);
    await BackpackInteract.Update(this, backpackUuid);

    this.syncData.equipments[slot] = null;

    this.textNotification(`Você desequipou um(a) ${itemTemplate.name}.`);
    this.UpdateEquipments();
  this.Save();
  }
  catch(error) {
    console.error("Error on Equip: ", error);
  }
};


