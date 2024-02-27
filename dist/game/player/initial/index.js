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
const Model = __importStar(require("@models/item"));
const _events_1 = require("@events");
const ItemTemplate = __importStar(require("@game/item_template"));
const BACKPACK_ITEMTEMPLATE_ID = 2;
function createInitialItems(player, socket) {
    if (player.syncData.equipments != null)
        return;
    const backpack = ItemTemplate.GetByID(BACKPACK_ITEMTEMPLATE_ID);
    if (!backpack || !backpack.id) {
        throw new Error('Backpack não encontrado ou ID não está definido.');
    }
    Model.Item.create({
        character_id: player.syncData.SqlID,
        item_template_id: backpack.id,
        quantity: 1
    }).then((item) => {
        player.syncData.equipments = {
            helmet: null,
            amulet: null,
            bag: item.uuid,
            leftHand: null,
            rightHand: null,
            armor: null,
            legs: null,
            boot: null,
            ring: null,
            ammo: null,
        };
        player.Save();
    }).catch(error => {
        console.log(error);
        player.syncData.equipments = {
            helmet: null,
            amulet: null,
            bag: null,
            leftHand: null,
            rightHand: null,
            armor: null,
            legs: null,
            boot: null,
            ring: null,
            ammo: null,
        };
    });
}
_events_1.serverEvent.on('user:connect', createInitialItems);
//# sourceMappingURL=index.js.map