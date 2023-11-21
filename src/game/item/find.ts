import * as Model from '@models/item';
import { ItemTemplate } from '@models/item_template';

export async function GetItemByUUID(uuid: string) {
  let result = null;

  if (uuid == null) return null;

  await Model.Item.findOne({ where: { uuid: uuid } })
  .then((item: any) => {
    result = item;
  })
  .catch(err => {
    console.error('Erro ao encontrar item:', err);
  });

  return result;
}

export async function GetItemByID(id: number) {
  let result = null;

  await Model.Item.findOne({ where: { id: id } })
  .then((item: any) => {
    result = item;
  })
  .catch(err => {
    console.error('Erro ao encontrar item:', err);
  });

  return result;
}

export async function GetItemImageByItemUUID(uuid: string) {
  let result = null;

  await Model.Item.findOne({
    where: { uuid: uuid },
    include: [{
      model: ItemTemplate,
      as: 'itemTemplate',
      attributes: ['image']
    }],
    attributes: [],
  }).then(item => {
    // @ts-ignore - Ignore the following TypeScript error
    if (item && item.itemTemplate) {
      // @ts-ignore - Ignore the following TypeScript error
      result = item.itemTemplate.image;
    } else {
      console.log('Item não encontrado ou ItemTemplate não associado');
    }
  }).catch(error => {
    console.error('Ocorreu um erro ao buscar a imagem do:', error);
  });

  return result;
}
