import { Command } from '@commands/CommandInterface';
import { CommandRegistry } from '@commands/CommandRegistry';
import { Player, allPlayers } from "@game/player";
import * as ItemTemplate from '@game/item_template/load';

export class OrganizationOnlineCommand implements Command {
  name = "sendalert";
  alias = "sa";
  
  execute(sender: Player, args: any): void {
    console.log(`${sender.syncData.Name} enviou um alerta. Args: ${args}`);

    allPlayers.map(x => {
      x.sendNotification({
        Title: 'Alerta Admin',
        Content: args.join(" ")
      });
    })
  }
}
CommandRegistry.register(new OrganizationOnlineCommand());

export class ReloadItems implements Command {
  name = "reloaditems";
  alias = "ritems";
  
  execute(sender: Player, args: any): void {
    ItemTemplate.Init(true);
    
    sender.sendNotification({
      Title: 'Alerta Admin',
      Content: "Item Templates atualizados"
    });
  }
}
CommandRegistry.register(new ReloadItems());
