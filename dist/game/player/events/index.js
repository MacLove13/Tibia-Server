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
exports.OnConnection = void 0;
const _events_1 = require("@events");
const state_1 = require("@game/state");
const socket_1 = require("@socket/socket");
const ItemTemplate = __importStar(require("@game/item_template"));
const Item = __importStar(require("@game/item/find"));
const Backpack = __importStar(require("@game/item/backpack/removeItem"));
const BackpackInteract = __importStar(require("@game/item/backpack"));
function OnConnection(plr, socket) {
    socket.on("PlayerMove", function (data) {
        plr.Move(data);
    });
    socket.on("PlayerHeal", function (data) {
        plr.Heal(data.Points);
    });
    socket.on("UseItem", function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield Item.GetItemByUUID(data.item_uuid);
            const itemTemplate = ItemTemplate.GetByID(item.item_template_id);
            if (itemTemplate.type == 3) {
                var result = yield Backpack.RemoveItem(item.uuid, 1);
                if (result) {
                    yield BackpackInteract.Update(plr, data.backpack_uuid);
                    plr.textNotification(`Você usou um(a) ${itemTemplate.name}.`);
                    plr.Heal(itemTemplate.healHP);
                    plr.Save();
                }
                else
                    plr.textNotification(`Não foi possível utilizar um(a) ${itemTemplate.name} agora.`);
            }
            if (itemTemplate.type == 4)
                plr.Equip('leftHand', item, itemTemplate, data.backpack_uuid);
        });
    });
    socket.on("EquipItem", function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield Item.GetItemByUUID(data.item_uuid);
            const itemTemplate = ItemTemplate.GetByID(item.item_template_id);
            if (itemTemplate.type == 4 && data.slot == 'leftHand')
                plr.Equip('leftHand', item, itemTemplate);
        });
    });
    socket.on("UnequipItem", function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            plr.Unequip(data.slot, data.item_uuid, data.backpack_uuid);
        });
    });
    socket.on("PlayerMessage", function (data) {
        socket_1.serverSocket.sockets.emit("CharacterMessage", { Msg: data.Msg, ID: socket.id });
    });
    socket.on("PlayerTarget", function (data) {
        var plr = state_1.characterList.GetByID(socket.id);
        if (plr) {
            if (data.IsTargeting) {
                var targetChar = state_1.characterList.GetByID(data.ID);
                if (!targetChar)
                    return;
                plr.Target(targetChar);
            }
            else {
                plr.Untarget();
            }
        }
    });
    socket.on("Character:OpenEquippedBag", function () {
        var plr = state_1.characterList.GetByID(socket.id);
        if (!plr)
            return;
        // @ts-ignore - Ignore the following TypeScript error
        _events_1.serverEvent.emit("Backpack:Open", {
            socket: socket,
            BackpackUUID: plr.syncData.equipments.bag
        });
    });
}
exports.OnConnection = OnConnection;
//# sourceMappingURL=index.js.map