import { Command } from '@commands/CommandInterface';
import { CommandRegistry } from '@commands/CommandRegistry';
import { Player, allPlayers } from "@game/player";
import * as ItemTemplateLoad from '@game/item_template/load';
import * as ItemTemplate from '@game/item_template/index';
import * as BackpackAdd from '@game/item/backpack/addItem';
import * as BackpackInteract from '@game/item/backpack';

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
    ItemTemplateLoad.Init(true);
    
    sender.sendNotification({
      Title: 'Alerta Admin',
      Content: "Item Templates atualizados"
    });
  }
}
CommandRegistry.register(new ReloadItems());

export class GiveItem implements Command {
  name = "giveitem";
  alias = "gitem";
  async = true;

  async executeAsync(sender: Player, args: any): Promise<void> {
    let itemName = args.join(" ")

    let itemTemplate = ItemTemplate.GetByName(itemName)
    if (itemTemplate == null) {
      sender.sendNotification({
        Title: 'Alerta Admin',
        Content: "O item " + itemName + " não foi encontrado."
      });
      return;
    }

    if (sender.syncData.equipments.bag == null) {
      sender.sendNotification({
        Title: 'Alerta Admin',
        Content: "Você não tem uma mochila equipada."
      });
      return;
    }

    await BackpackAdd.AddItem(null, sender.syncData.equipments.bag, itemTemplate.id, 1);
    await BackpackInteract.Update(sender, sender.syncData.equipments.bag);

    sender.sendNotification({
      Title: 'Alerta Admin',
      Content: "Você recebeu um(a) " + itemName + "."
    });
  }
}
CommandRegistry.register(new GiveItem());
