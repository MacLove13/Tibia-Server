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
exports.init = void 0;
const map_tile_1 = require("@models/map_tile");
const index_1 = require("@game/map/index");
function loadMap(layer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tiles = yield map_tile_1.MapTile.findAll({
                where: { layer: layer }
            });
            index_1.mapLayers.push({
                tiles: tiles
            });
            console.log('[LOAD] Loaded map Layer ' + layer + ", Tiles: " + tiles.length);
        }
        catch (error) {
            console.error('Erro ao buscar tiles:', error);
        }
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield loadMap(0);
        yield loadMap(1);
    });
}
exports.init = init;
//# sourceMappingURL=load.js.map