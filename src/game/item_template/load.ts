import * as Model from '@models/item_template';
import { ItemTemplate } from '@game/item_template';

export async function Init() {
  try {
    const itemTemplates = await Model.ItemTemplate.findAll({
      where: { }
    });

    itemTemplates.map((item) => {
      new ItemTemplate(item);
    });

    console.log('[LOAD] Item Templates. ' + itemTemplates.length + ' items loaded.');
  } catch (error) {
    console.error('Erro ao buscar tiles:', error);
  }
}

