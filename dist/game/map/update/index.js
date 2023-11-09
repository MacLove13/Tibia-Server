"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnConnection = void 0;
const socket_1 = require("@socket/socket");
const map_1 = require("@game/map");
const map_tile_1 = require("@models/map_tile");
function OnConnection(plr, socket) {
    const playerLayer = plr.syncData.InLayer;
    socket.emit("Game:UpdateMap", { Layer: 0, Map: map_1.mapLayers[0] });
    socket.emit("Game:UpdateMap", { Layer: 1, Map: map_1.mapLayers[1] });
    socket.on("tileEditor:updateTile", (data) => {
        UpdateTile(plr, socket, data.layer, data.x, data.y, data.walkable, data.newType, data.safeZone);
    });
}
exports.OnConnection = OnConnection;
function UpdateTile(plr, socket, layer, x, y, walkable, tileType, safeZone) {
    return __awaiter(this, void 0, void 0, function* () {
        const tiles = map_1.mapLayers[layer].tiles;
        const tileIndex = tiles.findIndex(tile => tile.x === x && tile.y === y);
        if (tileType === -1) {
            if (tileIndex > -1) {
                tiles.splice(tileIndex, 1);
                try {
                    yield map_tile_1.MapTile.destroy({
                        where: { x: x, y: y, layer: layer }
                    });
                }
                catch (error) {
                    console.error('Erro ao deletar tile:', error);
                }
            }
        }
        else {
            if (tileIndex > -1) {
                tiles[tileIndex].walkable = walkable;
                tiles[tileIndex].tile_type = tileType;
                tiles[tileIndex].safe_zone = safeZone;
            }
            else {
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
            const [mapTile, created] = yield map_tile_1.MapTile.findOrCreate({
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
                yield mapTile.save();
            }
        }
        try {
            socket_1.serverSocket.emit("Game:UpdateMap", { Layer: layer, Map: map_1.mapLayers[layer] });
        }
        catch (error) {
            console.error(error);
        }
    });
}
//# sourceMappingURL=index.js.map