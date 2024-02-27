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
exports.ReloadItems = exports.OrganizationOnlineCommand = void 0;
const CommandRegistry_1 = require("@commands/CommandRegistry");
const player_1 = require("@game/player");
const ItemTemplate = __importStar(require("@game/item_template/load"));
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
        ItemTemplate.Init(true);
        sender.sendNotification({
            Title: 'Alerta Admin',
            Content: "Item Templates atualizados"
        });
    }
}
exports.ReloadItems = ReloadItems;
CommandRegistry_1.CommandRegistry.register(new ReloadItems());
//# sourceMappingURL=commands.js.map