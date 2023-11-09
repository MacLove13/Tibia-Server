export interface Tile {
  x: number;
  y: number;
  walkable: boolean;
  tile_type: number;
  safe_zone: boolean;
  owner: number;
  layer: number;
}

interface MapLayer {
  tiles: Tile[];
}

export const mapLayers: MapLayer[] = [];
