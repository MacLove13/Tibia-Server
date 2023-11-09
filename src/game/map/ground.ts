import { mapLayers } from '@game/map';

export class Ground {
    GetCollision(layer: number, x: number, y: number) {
        if (mapLayers[layer] == undefined) return true;
        // return true if have colision

        const detailsLayer = layer + 1;

        const tile = mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);
        const detailTile = mapLayers[detailsLayer].tiles.find(tile => tile.x === x && tile.y === y);

        if (!tile)
            return true;

        if (detailTile)
            return !detailTile.walkable;

        return !tile.walkable;
    }
    
    SetCollision(layer: number, x: number, y: number) {
        if (mapLayers[layer] == undefined) return;
        const tile = mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);

        if (!tile) return;
        tile.walkable = false;
    }

    FreeCollision(layer: number, x: number, y: number) {
        if (mapLayers[layer] == undefined) return;
        const tile = mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);

        if (!tile) return;
        tile.walkable = true;
    }

    SafeZone(layer: number, x: number, y: number) {
        if (mapLayers[layer] == undefined) return false;
        const tile = mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);

        if (!tile) return;
        return tile.safe_zone;
    }

    HaveAnyTileToHover(layer: number, x: number, y: number) {
        if (mapLayers[layer] == undefined) return false;
        y = y - 1;
        layer = layer + 1;

        const tileUp = mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);
        const tileLeft = mapLayers[layer].tiles.find(tile => tile.x === (x - 1) && tile.y === (y + 1));
        const tile2 = mapLayers[layer].tiles.find(tile => tile.x === (x - 1) && tile.y === y);
        const tile3 = mapLayers[layer].tiles.find(tile => tile.x === (x + 1) && tile.y === y);

        let result = false;

        if (tileUp)
            if (!tileUp.walkable) result = true;

        if (tileLeft)
            if (!tileLeft.walkable) result = true;

        if (tile2)
            if (!tile2.walkable) result = true;

        if (tile3)
            if (!tile3.walkable) result = true;

        return result;
    }
}

