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
exports.GiveItem = exports.ReloadItems = exports.OrganizationOnlineCommand = void 0;
const CommandRegistry_1 = require("@commands/CommandRegistry");
const player_1 = require("@game/player");
const ItemTemplateLoad = __importStar(require("@game/item_template/load"));
const ItemTemplate = __importStar(require("@game/item_template/index"));
const BackpackAdd = __importStar(require("@game/item/backpack/addItem"));
const BackpackInteract = __importStar(require("@game/item/backpack"));
class OrganizationOnlineCommand {
    constructor() {
        this.name = "sendalert";
        this.alias = "sa";
    }
    execute(sender, args) {
        console.log(`${sender.syncData.Name} enviou um alerta. Args: ${args}`);
        player_1.allPlayers.map(x => {
            x.sendNotification({
                Title: 'Alerta Admin',
                Content: args.join(" ")
            });
        });
    }
}
exports.OrganizationOnlineCommand = OrganizationOnlineCommand;
CommandRegistry_1.CommandRegistry.register(new OrganizationOnlineCommand());
class ReloadItems {
    constructor() {
        this.name = "reloaditems";
        this.alias = "ritems";
    }
    execute(sender, args) {
        ItemTemplateLoad.Init(true);
        sender.sendNotification({
            Title: 'Alerta Admin',
            Content: "Item Templates atualizados"
        });
    }
}
exports.ReloadItems = ReloadItems;
CommandRegistry_1.CommandRegistry.register(new ReloadItems());
class GiveItem {
    constructor() {
        this.name = "giveitem";
        this.alias = "gitem";
        this.async = true;
    }
    executeAsync(sender, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let itemName = args.join(" ");
            let itemTemplate = ItemTemplate.GetByName(itemName);
            if (itemTemplate == null) {
                sender.sendNotification({
                    Title: 'Alerta Admin',
                    Content: "O item " + itemName + " não foi encontrado."
                });
                return;
            }
            if (sender.syncData.equipments.bag == null) {
                sender.sendNotification({
                    Title: 'Alerta Admin',
                    Content: "Você não tem uma mochila equipada."
                });
                return;
            }
            yield BackpackAdd.AddItem(null, sender.syncData.equipments.bag, itemTemplate.id, 1);
            yield BackpackInteract.Update(sender, sender.syncData.equipments.bag);
            sender.sendNotification({
                Title: 'Alerta Admin',
                Content: "Você recebeu um(a) " + itemName + "."
            });
        });
    }
}
exports.GiveItem = GiveItem;
CommandRegistry_1.CommandRegistry.register(new GiveItem());
//# sourceMappingURL=commands.js.map