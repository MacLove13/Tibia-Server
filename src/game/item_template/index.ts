import * as Str from '@utils/string';

export let serverItemTemplates = Array<any>();

export class ItemTemplate {
    id: number;
    uuid: string;
    name: string;
    type: string;
    description: string;
    minLevel: number;
    vocation: number;
    twoHands: boolean;
    attack: number;
    weight: number;
    mergeable: boolean;
    healHP: number;
    image: string;
    defense: number;
    slots: number;

    toJSON() {
        return {
          uuid: this.uuid,
          name: this.name,
          type: this.type,
          image: this.image
        };
    }

    constructor(data: any) {
      this.id = data.id;
      this.uuid = data.uuid;
      this.name = data.name;
      this.type = data.type;
      this.description = data.description;
      this.minLevel = data.min_level;
      this.vocation = data.vocation;
      this.twoHands = data.two_hands;
      this.attack = data.attack;
      this.weight = data.weight;
      this.mergeable = data.mergeable;
      this.healHP = data.heal_hp;
      this.image = data.image;
      this.defense = data.defense;
      this.slots = data.slots;

      serverItemTemplates.push(this);
    }
}

export function RemoveAllItemTemplates() {
  serverItemTemplates = Array<any>();
}

export function GetByID(id: number) {
  return serverItemTemplates.find(item => item.id == id);
}

export function GetByUUID(uuid: string) {
  return serverItemTemplates.find(item => item.uuid == uuid);
}

export function GetByName(name) {
  let closestMatch = null;
  let smallestDistance = Infinity;
  
  serverItemTemplates.forEach(item => {
    if (item.name.includes(name)) {
      const distance = Str.levenshteinDistance(name, item.name);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestMatch = item;
      }
    }
  });
  
  return closestMatch;
}

