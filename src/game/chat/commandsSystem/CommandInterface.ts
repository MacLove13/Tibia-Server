export interface Command {
  name: string;
  alias?: string;
  async?: boolean;
  execute?(sender: any, args: any): void;
  executeAsync?(sender: any, args: any): Promise<void>;
}
