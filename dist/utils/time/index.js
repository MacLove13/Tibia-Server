"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHourAndMinute = void 0;
function getHourAndMinute() {
    const now = new Date();
    const hours = now.getHours();
    const formattedHours = hours.toString().padStart(2, '0');
    const minutes = now.getMinutes();
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}
exports.getHourAndMinute = getHourAndMinute;
//# sourceMappingURL=index.js.map