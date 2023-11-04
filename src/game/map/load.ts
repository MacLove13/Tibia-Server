import { MapTile } from '@game/map/map_tile';
import { mapLayers, Tile } from '@game/map/index';

async function loadMap(layer: number) {
  try {
    const tiles = await MapTile.findAll({
      where: { layer: layer }
    }) as unknown as Tile[];

    mapLayers.push({
      tiles: tiles
    })

    console.log('Loaded map Layer ' + layer + ", Tiles: " + tiles.length);
  } catch (error) {
    console.error('Erro ao buscar tiles:', error);
  }
}

export async function init() {
  await loadMap(0);
  await loadMap(1);
}


