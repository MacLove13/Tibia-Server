import * as Model from '@models/item';
import * as ItemFind from '@game/item/find';
import * as ItemTemplate from '@game/item_template';

export const AddItem = async (itemUuid: string, backpackUuid: number, quantity: number = 0) => {
  let result = false;

  try {
    const item: any = await Model.Item.findOne({ where: { uuid: itemUuid } });

    if (item) {
      await item.update({
        inside_item: backpackUuid,
        quantity: item.quantity + quantity
      });

      console.log(`Item UUID ${itemUuid}: added to bag ${backpackUuid}.`);
      result = true;
    } else {
      console.log(`Item with UUID ${itemUuid} not found.`);
    }
  } catch (error) {
    console.error('Error in removeItemQuantity function:', error);
  }

  return false;
};

export const BackpackHaveFreeSlot = async (backpackUuid) => {
  const item = await ItemFind.GetItemByUUID(backpackUuid);
  const itemTemplate: any = ItemTemplate.GetByID(item.item_template_id);

  const itemsInBackpack = await Model.Item.findAll({
    where: { inside_item: backpackUuid }
  });

  if ((itemsInBackpack.length + 1) <= itemTemplate.slots + 1) return true;
  return false;
};
