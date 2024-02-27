"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.CommandRegistry = void 0;
exports.CommandRegistry = {};
function Command(options) {
    return function (target, propertyKey, descriptor) {
        exports.CommandRegistry[options.name] = descriptor.value;
        if (options.alias) {
            exports.CommandRegistry[options.alias] = descriptor.value;
        }
    };
}
exports.Command = Command;
//# sourceMappingURL=index.js.map