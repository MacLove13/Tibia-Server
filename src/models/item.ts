import { DataTypes } from 'sequelize';
import * as Database from '@database/connection';
import { ItemTemplate } from '@models/item_template';

export const Item = Database.db.define('items', {
  uuid: DataTypes.STRING,
  character_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  item_template_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'item_template',
      key: 'id',
    }
  },
  quantity: DataTypes.INTEGER,
  position: {
    type: DataTypes.JSON,
    allowNull: true
  },
  inside_item: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  }
});

Item.belongsTo(ItemTemplate, {
  foreignKey: 'item_template_id',
  as: 'itemTemplate' // Este é o alias que você usará na sua consulta
});
