import * as Model from '@models/item';

export const RemoveItem = async (itemUuid: string, quantity: number) => {
  let result = false;

  try {
    const item: any = await Model.Item.findOne({ where: { uuid: itemUuid } });

    if (item) {
      if ((item.quantity - quantity) > 0) {
        await item.update({ quantity: item.quantity - quantity });
        console.log(`Updated item with UUID ${itemUuid}: quantity decreased by ${quantity}.`);
        result = true;
      } else {
        await item.destroy();
        console.log(`Deleted item with UUID ${itemUuid} from the database.`);
        result = true;
      }
    } else {
      console.log(`Item with UUID ${itemUuid} not found.`);
    }
  } catch (error) {
    console.error('Error in removeItemQuantity function:', error);
  }

  return false;
};

export const RemoveFromBag = async (itemUuid: string, quantity: number) => {
  let result = false;

  try {
    const item: any = await Model.Item.findOne({ where: { uuid: itemUuid } });

    if (item) {
      if ((item.quantity - quantity) >= 0 || 1 == 1) {
        await item.update({ inside_item: null });
        console.log(`Item UUID ${itemUuid}: removed from bag.`);
        result = true;
      }
    } else {
      console.log(`Item with UUID ${itemUuid} not found.`);
    }
  } catch (error) {
    console.error('Error in removeItemQuantity function:', error);
  }

  return false;
};
