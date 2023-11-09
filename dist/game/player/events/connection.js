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
const socket_1 = require("@socket/socket");
const player_1 = require("@game/player");
const PlayerEvents = __importStar(require("@game/player/events"));
const load_1 = require("@game/player/load");
const Map = __importStar(require("@game/map/update"));
const GameState = __importStar(require("@game/state"));
socket_1.serverSocket.on('connection', (socket) => {
    console.log('A user connected');
    var plr = new player_1.Player(socket);
    PlayerEvents.OnConnection(plr, socket);
    Map.OnConnection(plr, socket);
    // CharacterEvents.OnConnection(plr, socket);
    socket.on("onPlayerConnect", function (data) {
        (0, load_1.LoadCharacter)(plr, socket, data.Auth);
    });
    socket.on('disconnect', () => {
        var char = GameState.characterList.RemoveByID(socket.id);
        if (char instanceof player_1.Player) {
            char.Disconnect();
            console.log("Character Disconnected", socket.id);
        }
    });
});
//# sourceMappingURL=connection.js.map