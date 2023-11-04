import { Config } from '@game/state/interface';
import { CharacterList } from "@game/state/character";

import data from "./data.json";

export const config: Config = data;
export const characterList = new CharacterList();