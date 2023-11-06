"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("@game/player");
player_1.Player.prototype.sendNotification = function (data) {
    this.socket.emit("character:showNotification", data);
};
player_1.Player.prototype.textNotification = function (message) {
    this.socket.emit("character:textNotification", { Message: message });
};
//# sourceMappingURL=index.js.map