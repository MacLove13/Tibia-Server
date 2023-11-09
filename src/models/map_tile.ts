import { DataTypes } from 'sequelize';
import * as Database from '@database/connection';

export const MapTile = Database.db.define('map_tiles', {
  x: DataTypes.INTEGER,
  y: DataTypes.INTEGER,
  walkable: DataTypes.BOOLEAN,
  tile_type: DataTypes.STRING,
  safe_zone: DataTypes.BOOLEAN,
  owner: DataTypes.INTEGER,
  layer: DataTypes.INTEGER,
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  }
});
