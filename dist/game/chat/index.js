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
exports.OnConnection = void 0;
const player_1 = require("@game/player");
const Time = __importStar(require("@utils/time"));
const _events_1 = require("@events");
const CommandRegistry_1 = require("./commandsSystem/CommandRegistry");
const Geometry = __importStar(require("@utils/geometry"));
_events_1.serverEvent.on('user:connect', OnConnection);
function OnConnection(plr, socket) {
    const playerLayer = plr.conversations;
    socket.on("chat:command:execute", function (data) {
        console.log("User as used command: " + data.cmd);
        console.log("Args: " + data.args);
        const command = CommandRegistry_1.CommandRegistry.getCommand(data.cmd);
        if (command) {
            if (command.async == false)
                command.execute(plr, data.args);
            else
                command.executeAsync(plr, data.args);
        }
        else {
            console.log("Command not found.");
        }
    });
    socket.on("chat:sendMessage", function (data) {
        player_1.allPlayers.map(x => {
            if (Geometry.GetDistance(plr.syncData.Position, x.syncData.Position) > 10)
                return;
            x.socket.emit("chat:sendMessage", { id: 0, messages: [
                    {
                        id: data.chatId,
                        sender: {
                            id: plr.syncData.SqlID,
                            name: plr.syncData.Name,
                        },
                        hour: Time.getHourAndMinute(),
                        message: data.message
                    }
                ] });
        });
    });
    plr.socket.emit("chat:sendMessage", { id: 0, name: 'General', messages: [
            {
                id: 0,
                sender: {
                    id: 0,
                    name: 'System'
                },
                hour: Time.getHourAndMinute(),
                message: `Olá ${plr.syncData.Name}, bem vindo!`
            }
        ] });
    plr.socket.emit("chat:sendMessage", { id: -1, name: 'System', messages: [
            {
                id: -1,
                sender: {
                    id: 0,
                    name: 'System'
                },
                hour: Time.getHourAndMinute(),
                message: 'Você entrou no jogo'
            }
        ] });
}
exports.OnConnection = OnConnection;
//# sourceMappingURL=index.js.map