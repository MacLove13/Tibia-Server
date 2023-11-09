import { DataTypes } from 'sequelize';
import * as Database from '@database/connection';

export const ItemTemplate = Database.db.define('item_templates', {
  uuid: DataTypes.STRING,
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  description: DataTypes.STRING,
  min_level: DataTypes.INTEGER,
  vocation: DataTypes.INTEGER,
  two_hands: DataTypes.BOOLEAN,
  attack: DataTypes.INTEGER,
  weight: DataTypes.FLOAT,
  mergeable: DataTypes.BOOLEAN,
  heal_hp: DataTypes.INTEGER,
  image: DataTypes.STRING,
  defense: DataTypes.INTEGER,
  slots: DataTypes.INTEGER,
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  }
});
