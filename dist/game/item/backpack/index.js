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
exports.Update = exports.JoinItem = exports.Open = void 0;
const _events_1 = require("@events");
const item_1 = require("@models/item");
const state_1 = require("@game/state");
const ItemTemplate = __importStar(require("@game/item_template"));
const find_1 = require("@game/item/find");
const BackpackInteract = __importStar(require("@game/item/backpack"));
function Open(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var plr = state_1.characterList.GetByID(data.socket.id);
        if (!plr)
            return;
        let item = yield (0, find_1.GetItemByUUID)(data.BackpackUUID);
        let backpackTemplate = ItemTemplate.GetByID(item.item_template_id);
        console.log("Load Item from Backpack:");
        console.log(data.BackpackUUID);
        const rows = yield item_1.Item.findAll({
            where: { inside_item: data.BackpackUUID }
        });
        let itemList = [];
        rows.map(item => {
            // @ts-ignore - Ignore the following TypeScript error
            const itemTemplate = ItemTemplate.GetByID(item.item_template_id);
            // @ts-ignore - Ignore the following TypeScript error
            itemList.push({
                type: 'ITEM',
                item: {
                    // @ts-ignore - Ignore the following TypeScript error
                    uuid: item.uuid,
                    // @ts-ignore - Ignore the following TypeScript error
                    type: item.type,
                    // @ts-ignore - Ignore the following TypeScript error
                    name: item.name,
                    // @ts-ignore - Ignore the following TypeScript error
                    quantity: item.quantity,
                    // @ts-ignore - Ignore the following TypeScript error
                    image: item.image,
                    // @ts-ignore - Ignore the following TypeScript error
                    item_template_id: item.item_template_id,
                    item_template: itemTemplate.toJSON()
                }
            });
        });
        // @ts-ignore - Ignore the following TypeScript error
        plr.socket.emit('Character:ShowBag', { uuid: data.BackpackUUID, slots: backpackTemplate.slots, Data: itemList });
    });
}
exports.Open = Open;
function JoinItem(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Juntando Item");
        var plr = state_1.characterList.GetByID(data.socket.id);
        if (!plr)
            return;
        let itemMoved = yield (0, find_1.GetItemByUUID)(data.moved_item);
        let itemToJoin = yield (0, find_1.GetItemByUUID)(data.join_in_item);
        let itemCount = itemToJoin.quantity + itemMoved.quantity;
        if (itemCount >= 100) {
            let reduceMovedQuantity = itemCount - 100;
            yield itemMoved.update({ quantity: reduceMovedQuantity });
            yield itemToJoin.update({ quantity: 100 });
        }
        else {
            yield itemToJoin.update({ quantity: itemCount });
            yield itemMoved.destroy();
        }
        yield BackpackInteract.Update(plr, data.backpack_uuid);
    });
}
exports.JoinItem = JoinItem;
function Update(player, backpackId) {
    return __awaiter(this, void 0, void 0, function* () {
        let item = yield (0, find_1.GetItemByUUID)(backpackId);
        let backpackTemplate = ItemTemplate.GetByID(item.item_template_id);
        const rows = yield item_1.Item.findAll({
            where: { inside_item: backpackId }
        });
        let itemList = [];
        rows.map(item => {
            // @ts-ignore - Ignore the following TypeScript error
            const itemTemplate = ItemTemplate.GetByID(item.item_template_id);
            itemList.push({
                type: 'ITEM',
                item: {
                    // @ts-ignore - Ignore the following TypeScript error
                    uuid: item.uuid,
                    // @ts-ignore - Ignore the following TypeScript error
                    type: item.type,
                    // @ts-ignore - Ignore the following TypeScript error
                    name: item.name,
                    // @ts-ignore - Ignore the following TypeScript error
                    quantity: item.quantity,
                    // @ts-ignore - Ignore the following TypeScript error
                    image: item.image,
                    // @ts-ignore - Ignore the following TypeScript error
                    item_template_id: item.item_template_id,
                    // @ts-ignore - Ignore the following TypeScript error
                    item_template: itemTemplate.toJSON()
                }
            });
        });
        player.socket.emit('Character:ShowBag', { uuid: backpackId, slots: backpackTemplate.slots, Data: itemList });
    });
}
exports.Update = Update;
_events_1.serverEvent.on('Backpack:Open', Open);
_events_1.serverEvent.on('Backpack:JoinItem', JoinItem);
//# sourceMappingURL=index.js.map