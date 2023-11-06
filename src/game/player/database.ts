import { DataTypes } from 'sequelize';
import * as Database from '@database/connection';

export const PlayerDB = Database.db.define('character', {
  uuid: DataTypes.STRING,
  account_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  level: DataTypes.INTEGER,
  experience: DataTypes.INTEGER,
  skin_name: DataTypes.STRING,
  u_class: DataTypes.STRING,
  health: DataTypes.INTEGER,
  max_health: DataTypes.INTEGER,
  speed: DataTypes.INTEGER,
  equipments: DataTypes.JSON,
  position: DataTypes.JSON,
  backpacks_id: DataTypes.INTEGER,
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  }
});
