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
exports.BackpackHaveFreeSlot = exports.AddItem = void 0;
const Model = __importStar(require("@models/item"));
const ItemFind = __importStar(require("@game/item/find"));
const ItemTemplate = __importStar(require("@game/item_template"));
const AddItem = (itemUuid, backpackUuid, quantity = 0) => __awaiter(void 0, void 0, void 0, function* () {
    let result = false;
    try {
        const item = yield Model.Item.findOne({ where: { uuid: itemUuid } });
        if (item) {
            yield item.update({
                inside_item: backpackUuid,
                quantity: item.quantity + quantity
            });
            console.log(`Item UUID ${itemUuid}: added to bag ${backpackUuid}.`);
            result = true;
        }
        else {
            console.log(`Item with UUID ${itemUuid} not found.`);
        }
    }
    catch (error) {
        console.error('Error in removeItemQuantity function:', error);
    }
    return false;
});
exports.AddItem = AddItem;
const BackpackHaveFreeSlot = (backpackUuid) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield ItemFind.GetItemByUUID(backpackUuid);
    const itemTemplate = ItemTemplate.GetByID(item.item_template_id);
    const itemsInBackpack = yield Model.Item.findAll({
        where: { inside_item: backpackUuid }
    });
    if ((itemsInBackpack.length + 1) <= itemTemplate.slots + 1)
        return true;
    return false;
});
exports.BackpackHaveFreeSlot = BackpackHaveFreeSlot;
//# sourceMappingURL=addItem.js.map