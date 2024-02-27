type CommandOptions = {
  name: string;
  alias?: string;
  greedyArg?: boolean;
  group?: string;
};

export const CommandRegistry: { [key: string]: Function } = {};

export function Command(options: CommandOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    CommandRegistry[options.name] = descriptor.value;
    if (options.alias) {
      CommandRegistry[options.alias] = descriptor.value;
    }
  };
}
