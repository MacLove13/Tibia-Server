import { Command } from './CommandInterface';

export class CommandRegistry {
  private static commands: Map<string, Command> = new Map();

  public static register(command: Command): void {
    this.commands.set(command.name, command);
    if (command.alias) {
      this.commands.set(command.alias, command);
    }
  }

  public static getCommand(name: string): Command | undefined {
    return this.commands.get(name);
  }
}
