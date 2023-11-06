"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ground = exports.characterList = exports.config = void 0;
const character_1 = require("@game/state/character");
const ground_1 = require("@game/map/ground");
const data_json_1 = __importDefault(require("./data.json"));
exports.config = data_json_1.default;
exports.characterList = new character_1.CharacterList();
exports.ground = new ground_1.Ground();
//# sourceMappingURL=index.js.map