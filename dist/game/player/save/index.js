"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("@game/player");
const Model = __importStar(require("@models/character"));
player_1.Player.prototype.Save = function () {
    console.log('Saving character');
    Model.Character.update({
        level: this.syncData.Level,
        experience: this.syncData.CurrentExp,
        health: this.syncData.HP,
        max_health: this.syncData.MaxHP,
        position: this.syncData.Position,
        equipments: this.syncData.equipments
    }, {
        where: {
            uuid: this.syncData.UUID
        }
    }).then(result => {
        console.log("Character saved");
    }).catch(err => {
        console.error('Erro ao atualizar:', err);
    });
};
//# sourceMappingURL=index.js.map