export interface Tile {
  x: number;
  y: number;
  walkable: boolean;
  tileType: number;
  safeZone: boolean;
  owner: number;
  layer: number;
}

interface MapLayer {
  tiles: Tile[];
}

export const mapLayers: MapLayer[] = [];
