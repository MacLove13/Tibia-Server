export interface Command {
  name: string;
  alias?: string;
  execute(sender: any, args: any): void;
}
