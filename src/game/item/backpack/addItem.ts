import * as Model from '@models/item';
import * as ModelIT from '@models/item_template';
import * as ItemFind from '@game/item/find';
import * as ItemTemplate from '@game/item_template';

export const AddItem = async (itemUuid: string, backpackUuid: number, item_template_id: any = null, quantity: number = 0) => {
  if (itemUuid == null) {
    AddOrSumNewItem(itemUuid, backpackUuid, item_template_id, quantity);
    return;
  }

  try {
    const item: any = await Model.Item.findOne({ where: { uuid: itemUuid } });
    const itemTemplate: any = await ModelIT.ItemTemplate.findOne({ where:
      {
        id: item.item_template_id
      }
    });

    if (item && itemTemplate) {
      if (itemTemplate.mergeable) {
        if (item.quantity + 1 <= 100) {
          await item.update({
            inside_item: backpackUuid,
            quantity: item.quantity + quantity
          });

          return true;
        }
      }
      else {
        await item.update({
          inside_item: backpackUuid,
          quantity: item.quantity
        });
      }

      
      console.log(`Item UUID ${itemUuid}: added to bag ${backpackUuid}.`);
      return true;
    } else {
      console.log(`Item with UUID ${itemUuid} not found.`);
    }
  } catch (error) {
    console.error('Error in removeItemQuantity function:', error);
  }

  return false;
};

const AddOrSumNewItem = async (itemUuid: string, backpackUuid: number, item_template_id: any = null, quantity: number = 0) => {
  try {
      const item: any = await Model.Item.findOne({ where:
        {
          item_template_id: item_template_id,
          inside_item: backpackUuid
        }
      });

      if (!item) {
        await CreateItem(item_template_id, quantity, backpackUuid);
        return true;
      }

      const itemTemplate: any = await ModelIT.ItemTemplate.findOne({ where:
        {
          id: item.item_template_id
        }
      });

      if (item && itemTemplate) {
        if (item.quantity + 1 <= 100 &&  itemTemplate.mergeable) {
          await item.update({
            quantity: item.quantity + quantity
          });

          return true;
        }
      }

      await CreateItem(item_template_id, quantity, backpackUuid);
      return true;
    }
    catch (error) {
      console.log(error)
      return false
    }

    return false;
}

const CreateItem = async (item_template_id: any, quantity: any, inside_item: any) => {
  await Model.Item.create({
    item_template_id: item_template_id,
    quantity: quantity,
    inside_item: inside_item
  }).then((item: any) => {
    return true;
  }).catch(error => {
    console.log(error)
    return false;
  });
}

export const BackpackHaveFreeSlot = async (backpackUuid) => {
  const item = await ItemFind.GetItemByUUID(backpackUuid);
  const itemTemplate: any = ItemTemplate.GetByID(item.item_template_id);

  const itemsInBackpack = await Model.Item.findAll({
    where: { inside_item: backpackUuid }
  });

  if ((itemsInBackpack.length + 1) <= itemTemplate.slots + 1) return true;
  return false;
};
