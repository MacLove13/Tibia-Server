"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationOnlineCommand = void 0;
const CommandRegistry_1 = require("./CommandRegistry");
class OrganizationOnlineCommand {
    constructor() {
        this.name = "sendalert";
        this.alias = "sa";
    }
    execute(sender, args) {
        console.log(`${sender.syncData.Name} enviou um alerta. Args: ${args}`);
        // Implemente a lógica específica do comando aqui
        sender.sendNotification({
            Title: 'Alerta Admin',
            Content: args[0]
        });
    }
}
exports.OrganizationOnlineCommand = OrganizationOnlineCommand;
// Registrar o comando
CommandRegistry_1.CommandRegistry.register(new OrganizationOnlineCommand());
//# sourceMappingURL=admin.js.map