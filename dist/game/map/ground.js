"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ground = void 0;
const map_1 = require("@game/map");
class Ground {
    GetCollision(layer, x, y) {
        if (map_1.mapLayers[layer] == undefined)
            return true;
        // return true if have colision
        const detailsLayer = layer + 1;
        const tile = map_1.mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);
        const detailTile = map_1.mapLayers[detailsLayer].tiles.find(tile => tile.x === x && tile.y === y);
        if (!tile)
            return true;
        if (detailTile)
            return !detailTile.walkable;
        return !tile.walkable;
    }
    SetCollision(layer, x, y) {
        if (map_1.mapLayers[layer] == undefined)
            return;
        const tile = map_1.mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);
        if (!tile)
            return;
        tile.walkable = false;
    }
    FreeCollision(layer, x, y) {
        if (map_1.mapLayers[layer] == undefined)
            return;
        const tile = map_1.mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);
        if (!tile)
            return;
        tile.walkable = true;
    }
    SafeZone(layer, x, y) {
        if (map_1.mapLayers[layer] == undefined)
            return false;
        const tile = map_1.mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);
        if (!tile)
            return;
        return tile.safe_zone;
    }
    HaveAnyTileToHover(layer, x, y) {
        if (map_1.mapLayers[layer] == undefined)
            return false;
        y = y - 1;
        layer = layer + 1;
        const tileUp = map_1.mapLayers[layer].tiles.find(tile => tile.x === x && tile.y === y);
        const tileLeft = map_1.mapLayers[layer].tiles.find(tile => tile.x === (x - 1) && tile.y === (y + 1));
        const tile2 = map_1.mapLayers[layer].tiles.find(tile => tile.x === (x - 1) && tile.y === y);
        const tile3 = map_1.mapLayers[layer].tiles.find(tile => tile.x === (x + 1) && tile.y === y);
        let result = false;
        if (tileUp)
            if (!tileUp.walkable)
                result = true;
        if (tileLeft)
            if (!tileLeft.walkable)
                result = true;
        if (tile2)
            if (!tile2.walkable)
                result = true;
        if (tile3)
            if (!tile3.walkable)
                result = true;
        return result;
    }
}
exports.Ground = Ground;
//# sourceMappingURL=ground.js.map