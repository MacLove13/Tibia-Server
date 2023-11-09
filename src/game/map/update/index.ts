import * as SocketIO from 'socket.io';
import { serverSocket } from '@socket/socket';
import { mapLayers } from '@game/map';
import { MapTile } from '@models/map_tile';
import { Tile } from '@game/map';
import { Player } from '@game/player';

export function OnConnection(plr: Player, socket: SocketIO.Socket) {
  const playerLayer = plr.syncData.InLayer;

  socket.emit("Game:UpdateMap", { Layer: 0, Map: mapLayers[0] });
  socket.emit("Game:UpdateMap", { Layer: 1, Map: mapLayers[1] });

  socket.on("tileEditor:updateTile", (data: any) => {
    UpdateTile(plr, socket, data.layer, data.x, data.y, data.walkable, data.newType, data.safeZone);
  });
}

async function UpdateTile(plr: Player, socket: SocketIO.Socket, layer: number, x: number, y: number, walkable: boolean, tileType: number, safeZone: boolean) {
  const tiles = mapLayers[layer].tiles;
  const tileIndex = tiles.findIndex(tile => tile.x === x && tile.y === y);

  if (tileType === -1) {
    if (tileIndex > -1) {
      tiles.splice(tileIndex, 1);

      try {
        await MapTile.destroy({
          where: { x: x, y: y, layer: layer }
        });
      } catch (error) {
        console.error('Erro ao deletar tile:', error);
      }
    }
  } else {
    if (tileIndex > -1) {
      tiles[tileIndex].walkable = walkable;
      tiles[tileIndex].tile_type = tileType;
      tiles[tileIndex].safe_zone = safeZone;
    } else {
      tiles.push({
        x: x,
        y: y,
        walkable: walkable,
        tile_type: tileType,
        safe_zone: safeZone,
        owner: 0,
        layer: layer
      });
    }

    const [mapTile, created] = await MapTile.findOrCreate({
      where: { x: x, y: y, layer: layer },
      defaults: {
        walkable: walkable,
        tile_type: tileType,
        safe_zone: safeZone,
        owner: 0,
        layer: layer
      }
    });

    if (!created) {
      mapTile.set({
        walkable: walkable,
        tile_type: tileType,
        safe_zone: safeZone,
        owner: 0,
        layer: layer
      });
      await mapTile.save();
    }
  }

  try {
    serverSocket.emit("Game:UpdateMap", { Layer: layer, Map: mapLayers[layer] });
  } catch (error) {
    console.error(error);
  }
}

