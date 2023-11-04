import { SpawnData } from '@game/mob/spawn/interface';

export interface Config {
    TileSize: number;
    MapWidth: number;
    MapHeight: number;
    MobSpawnDelay: number;
    Player: {
        LvlExp: number[]
    }
    MobSpawns: SpawnData[],
    Mobs: {
        Dwarf: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
        Orc: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
        Minotaur: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
        Troll: { AliveSprites: number[]; DeadSprites: number[], Experience: number };
    };
    Animations: {
        Beam: {
            Sprites: number[];
        };
    };
    Data: number[];
    Collision: number[];
};
