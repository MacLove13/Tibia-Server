import { config } from '@game/state';

type MobsConfig = {
  [key: string]: { AliveSprites: number[]; DeadSprites: number[]; Experience: number; HP?: number };
};

export class CharacterDataToSync {
    Position = { x: 60, y: 50 };
    Name: string;
    Race: string;
    UClass: string;
    ID: string;
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
    // Backpack: Backpack;
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
            InLayer: this.InLayer,
        };
    }

    constructor(race : string) {
        this.ID = CharacterDataToSync.lastID.toString();
        /*
        this.Race = race;
        this.UClass = "";
        this.MaxExp = config.Player.LvlExp[this.Level];
        this.Speed = config.Mobs[this.Race].Speed;
        this.ExpAtDead = config.Mobs[this.Race].Experience;
        CharacterDataToSync.lastID++;
        this.MaxHP = config.Mobs[this.Race].HP;
        this.HP = config.Mobs[this.Race].HP;
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

        */
    }

    private static lastID = 0;
}
