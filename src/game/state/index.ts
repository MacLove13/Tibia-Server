import { Config } from '@game/state/interface';
import { CharacterList } from "@game/state/character";
import { Ground } from "@game/map/ground";

import data from "./data.json";

export const config: Config = data;
export const characterList = new CharacterList();
export const ground = new Ground();
