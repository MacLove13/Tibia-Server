import * as GameState from '@game/state';
import { Vector2D } from '@utils/interface';

export class mobDataSync {
    Position: Vector2D;
    Name: string;
    Race: string;
    ID: string;
    UUID: string;
    HP: number;
    MaxHP: number;
    Speed: number;
    Level: number;
    CurrentExp: number;
    ExpAtDead: number;
    Attack: number;
    InLayer: number;
    Freezed: boolean;
    Rotation: number;
    Hostile: boolean;

    toJSON() {
        return {
            Position: this.Position,
            Speed: this.Speed,
            HP: this.HP,
            MaxHP: this.MaxHP,
            Race: this.Race,
            ID: this.ID,
            Level: this.Level,
            Attack: this.Attack,
            InLayer: this.InLayer,
            Freezed: this.Freezed,
            Rotation: this.Rotation,
            Hostile: this.Hostile,
        };
    }

    constructor(race : string) {
        this.ID = mobDataSync.lastID.toString();
        this.Race = race;

        const mobConfig = GameState.config.Mobs[this.Race as keyof typeof GameState.config.Mobs];
        if (mobConfig) {
            this.Speed = mobConfig.Speed;
            this.ExpAtDead = mobConfig.Experience;
            this.MaxHP = mobConfig.HP;
            this.HP = mobConfig.HP;
        }
        this.Attack = 0;
        this.InLayer = 0;

        this.Freezed = false;
        this.Hostile = true;
        this.Rotation = 0;

        mobDataSync.lastID++;
    }

    private static lastID = 0;
}
