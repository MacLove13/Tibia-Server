import { DataTypes } from 'sequelize';
import * as Database from '@database/connection';

export const CharacterAuthentication = Database.db.define('character_authentications', {
  account_id: DataTypes.INTEGER,
  character_id: DataTypes.INTEGER,
  code: DataTypes.STRING,
  connected_ip: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  }
});
