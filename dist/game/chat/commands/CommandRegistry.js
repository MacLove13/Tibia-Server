"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRegistry = void 0;
class CommandRegistry {
    static register(command) {
        this.commands.set(command.name, command);
        if (command.alias) {
            this.commands.set(command.alias, command);
        }
    }
    static getCommand(name) {
        return this.commands.get(name);
    }
}
exports.CommandRegistry = CommandRegistry;
CommandRegistry.commands = new Map();
//# sourceMappingURL=CommandRegistry.js.map