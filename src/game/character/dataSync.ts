import * as GameState from '@game/state';
import { Vector2D } from '@utils/interface';

export class DataSync {
    Position: Vector2D;
    Name: string;
    Race: string;
    UClass: string;
    ID: string;
    SqlID:number;
    UUID: string;
    HP: number;
    MaxHP: number;
    Speed: number;
    MaxExp: number;
    Level = 5;
    CurrentExp = 0;
    ExpAtDead = 0;
    Attack = 0;
    equipments = {
        helmet: null,
        amulet: null,
        bag: null,
        leftHand: null,
        rightHand: null,
        armor: null,
        legs: null,
        boot: null,
        ring: null,
        ammo: null,
    };
    InLayer: 0;

    toJSON() {
        return {
            Position: this.Position,
            Speed: this.Speed,
            HP: this.HP,
            MaxHP: this.MaxHP,
            Race: this.Race,
            UClass: this.UClass,
            ID: this.ID,
            MaxExp: this.MaxExp,
            Level: this.Level,
            Attack: this.Attack,
            equipments: this.equipments,
            InLayer: this.InLayer
        };
    }

    constructor(race : string, uClass: string) {
        this.ID = DataSync.lastID.toString();
        this.Race = race;
        this.UClass = uClass;
        this.Attack = 0;
        this.equipments = {
            helmet: null,
            amulet: null,
            bag: null,
            leftHand: null,
            rightHand: null,
            armor: null,
            legs: null,
            boot: null,
            ring: null,
            ammo: null,
        };
        this.InLayer = 0;
        this.MaxExp = GameState.config.Player.LvlExp[this.Level];

        const mobConfig = GameState.config.Mobs[this.Race as keyof typeof GameState.config.Mobs];
        if (mobConfig) {
            this.Speed = mobConfig.Speed;
            this.ExpAtDead = mobConfig.Experience;
            this.MaxHP = mobConfig.HP;
            this.HP = mobConfig.HP;
        }
        DataSync.lastID++;
    }

    private static lastID = 0;
}

