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
const player_1 = require("@game/player");
const ItemFind = __importStar(require("@game/item/find"));
const ItemTemplate = __importStar(require("@game/item_template"));
const Backpack = __importStar(require("@game/item/backpack/removeItem"));
const BackpackInteract = __importStar(require("@game/item/backpack"));
const BackpackAdd = __importStar(require("@game/item/backpack/addItem"));
player_1.Player.prototype.UpdateEquipments = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let data = this.syncData.equipments;
        let items = {
            helmet: { uuid: null, image: null },
            amulet: { uuid: null, image: null },
            bag: { uuid: null, image: null },
            leftHand: { uuid: null, image: null },
            rightHand: { uuid: null, image: null },
            armor: { uuid: null, image: null },
            legs: { uuid: null, image: null },
            boot: { uuid: null, image: null },
            ring: { uuid: null, image: null },
            ammo: { uuid: null, image: null }
        };
        for (const slot in data) {
            // @ts-ignore - Ignore the following TypeScript error
            if (data[slot]) {
                // @ts-ignore - Ignore the following TypeScript error
                const itemImage = yield ItemFind.GetItemImageByItemUUID(data[slot]);
                // @ts-ignore - Ignore the following TypeScript error
                items[slot].uuid = data[slot];
                // @ts-ignore - Ignore the following TypeScript error
                items[slot].image = itemImage;
            }
        }
        this.socket.emit("Character:UpdateEquipments", { ID: this.syncData.ID, Data: items });
        this.RecalculeAttackPower();
    });
};
player_1.Player.prototype.RecalculeAttackPower = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let recalculatedAttack = 0;
        let data = this.syncData.equipments;
        for (const slot in data) {
            if (data[slot]) {
                const item = yield ItemFind.GetItemByUUID(data[slot]);
                if (!item) {
                    data[slot] = null;
                    continue;
                }
                const itemTemplate = ItemTemplate.GetByID(item.item_template_id);
                if (itemTemplate.attack > 0)
                    recalculatedAttack += itemTemplate.attack;
            }
        }
        this.syncData.Attack = recalculatedAttack;
    });
};
player_1.Player.prototype.Equip = function (slot, item, itemTemplate, backpackUuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const backpackUUID = item.inside_item;
        try {
            if (this.syncData.equipments[slot] != null && backpackUuid) {
                yield BackpackAdd.AddItem(this.syncData.equipments[slot], backpackUuid);
            }
            else if (this.syncData.equipments[slot] != null && !backpackUuid) {
                yield BackpackAdd.AddItem(this.syncData.equipments[slot], this.syncData.equipments['bag']);
            }
            yield Backpack.RemoveFromBag(item.uuid, 1);
            yield BackpackInteract.Update(this, backpackUUID);
            this.syncData.equipments[slot] = item.uuid;
            this.textNotification(`Você equipou um(a) ${itemTemplate.name}.`);
            this.UpdateEquipments();
            this.Save();
        }
        catch (error) {
            console.error("Error on Equip: ", error);
        }
    });
};
player_1.Player.prototype.Unequip = function (slot, itemUuid, backpackUuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const haveSlots = BackpackAdd.BackpackHaveFreeSlot(backpackUuid);
        if (!haveSlots) {
            this.textNotification(`Não há espaço o suficiente na mochila.`);
            return;
        }
        try {
            const item = yield ItemFind.GetItemByUUID(itemUuid);
            const itemTemplate = ItemTemplate.GetByID(item.item_template_id);
            yield BackpackAdd.AddItem(itemUuid, backpackUuid);
            yield BackpackInteract.Update(this, backpackUuid);
            this.syncData.equipments[slot] = null;
            this.textNotification(`Você desequipou um(a) ${itemTemplate.name}.`);
            this.UpdateEquipments();
            this.Save();
        }
        catch (error) {
            console.error("Error on Equip: ", error);
        }
    });
};
//# sourceMappingURL=index.js.map