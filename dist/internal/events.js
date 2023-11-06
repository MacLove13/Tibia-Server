"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverEvent = void 0;
const events_1 = __importDefault(require("events"));
class EventBus extends events_1.default {
}
exports.serverEvent = new EventBus();
//# sourceMappingURL=events.js.map