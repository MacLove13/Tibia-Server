import * as SocketIO from 'socket.io';
import { Character } from '@game/character/interface';
import { DataSync } from '@game/character/dataSync';
import { serverSocket } from '@socket/socket';
import * as GameState from '@game/state';
import * as Geometry from '@utils/geometry';

var startSprites = ["Hero"];
var playerClass = ["Warrior"];

// import '@game/player/movimentation';
// import '@game/player/attack';

export class Player implements Character {
  socket: SocketIO.Socket;
  syncData: DataSync;
  targetChar: Character | null;
  AttackDelay = 850;
  LastAttackTime = 0;
  intervalEnemies: NodeJS.Timer;
  activeEnemiesList = false; 
  inSafeZone = false;
  mainBackpackId = 0;

  constructor(socket: SocketIO.Socket) {
    this.syncData = new DataSync(startSprites[(Math.random() * startSprites.length) | 0], playerClass[(Math.random() * playerClass.length) | 0]);
    this.syncData.Position = { x: 60, y: 50 };
    this.syncData.ID = socket.id;
    this.socket = socket;
    this.intervalEnemies = setInterval(() => this.UpdateEnemyList(), 200);
  }

  GetID(): string {
    return this.syncData.ID;
  }

  IsDead(): boolean {
    return this.syncData.HP <= 0;
  }

  InSafeZone(): boolean {
    return this.inSafeZone;
  }

  GetJSON(): any {
    return this.syncData.toJSON();
  }

  GetHP(): number {
    return this.syncData.HP;
  }

  Revive() {
    this.syncData.HP = this.syncData.MaxHP;
    this.syncData.Position = { x: 73, y: 38 };

    serverSocket.sockets.emit("SelfHeal", { TargetID: this.syncData.ID, Health: this.syncData.HP });
    this.socket.emit("CharacterTeleport", { ID: this.syncData.ID, Data: { Rot: 0, Pos: this.syncData.Position } });
  }

  Heal(Points: number) {
    var newLife = this.syncData.HP + Points;
    if (newLife > this.syncData.MaxHP) newLife = this.syncData.MaxHP;

    this.syncData.HP = newLife;

    serverSocket.sockets.emit("SelfHeal", { TargetID: this.syncData.ID, Health: this.syncData.HP });
  }

  async UseItem(data: { item_uuid: number, backpack_uuid: string }) {
    /* try {
      const item = await getItem(data.item_uuid);
      if (item) {
        if (item.type == 0) { // Food
          // if (this.syncData.HP >= this.syncData.MaxHP) return;

          this.Heal(item.item_template.HealHP);
          this.ConsumeItem(data.item_uuid, data.backpack_uuid, item);
        }
        else if (item.type == 4) { // Sword
          this.Equip(data.item_uuid, data.backpack_uuid, item);
        }
      } else {
        console.log('No item found with that UUID.');
      }
    } catch (error) {
      console.error('Error getting item:', error);
    } */
  }

  AddExp(exp: number) {
    this.syncData.CurrentExp += exp;
    if (this.syncData.CurrentExp >= GameState.config.Player.LvlExp[this.syncData.Level]) {
      this.syncData.Level++;
      this.syncData.CurrentExp = 0;
      serverSocket.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: exp, NextLvl: this.syncData.Level });
      this.syncData.MaxHP += 35;
      this.syncData.HP = this.syncData.MaxHP;
      this.syncData.Speed += 20;
      this.Sync();
    }
    else {
      serverSocket.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: this.syncData.CurrentExp });
    }
	}

  // @ts-ignore - Ignore the following TypeScript error
  Move(data: MoveData): void;

  // @ts-ignore - Ignore the following TypeScript error
  CheckSafeZone(): void;

  // @ts-ignore
  MoveDir(rot: Rotation): void;

  // @ts-ignore - Ignore the following TypeScript error
  CanMove(): boolean;

  // @ts-ignore - Ignore the following TypeScript error
  Target(char: Character): void;

  // @ts-ignore - Ignore the following TypeScript error
  Untarget(): void;

  // @ts-ignore - Ignore the following TypeScript error
  AttackTarget(): void;

  // @ts-ignore - Ignore the following TypeScript error
  Hit(dmg: number): { Exp: number } | undefined;

  // @ts-ignore - Ignore the following TypeScript error
  Kill(): void;

  // @ts-ignore - Ignore the following TypeScript error
  CanAttack(): boolean;

  // @ts-ignore - Ignore the following TypeScript error
  Dispose(): void;

  // @ts-ignore - Ignore the following TypeScript error
  SelfAnnouce(): void;

  // @ts-ignore - Ignore the following TypeScript error
  Save(): void;

  // @ts-ignore - Ignore the following TypeScript error
  Disconnect(): void;

  // @ts-ignore - Ignore the following TypeScript error
  sendNotification(data: { Title: string; Content: string; }): void;

  // @ts-ignore - Ignore the following TypeScript error
  textNotification(message: string): void;

  // @ts-ignore - Ignore the following TypeScript error
  Sync(): void;

  // @ts-ignore - Ignore the following TypeScript error
  RecalculeAttackPower(): void;

  // @ts-ignore - Ignore the following TypeScript error
  UpdateEquipments(): void;

  // @ts-ignore - Ignore the following TypeScript error
  // UpdateEnemyList(): void;

  UpdateExperience() {
    serverSocket.sockets.emit("ApplyExperience", { ID: this.socket.id, Exp: this.syncData.CurrentExp });
  }

  UpdateEnemyList() {
    let count = 0;
    let battleList: any[] = [];
    let target = null;

    if (this.targetChar != null) {
      if (this.targetChar instanceof Player)
        target = this.targetChar.syncData.ID;
    }

    GameState.characterList.ForEach((char: any) => {
      if (char == this) return;
      var dist = Geometry.GetDistance(this.syncData.Position, char.GetJSON().Position);
      if (dist > 10) return;

      battleList.push({
        id: char.syncData.ID,
        name: char.syncData.Race,
        level: char.syncData.level,
        hp: char.syncData.HP,
        max_hp: char.syncData.MaxHP,
        distance: dist,
      })
    });

    if (battleList.length > 0 || this.targetChar != null) {
      battleList.sort((a, b) => a.distance - b.distance);

      this.socket.emit("BattleMenu", { ID: this.syncData.ID, Data: {
          battleList: battleList,
          TargetID: target,
        }
      });

      this.activeEnemiesList = true;
    }
    else {
      if (this.activeEnemiesList) {
        this.socket.emit("BattleMenu", { ID: this.syncData.ID, Data: {
            battleList: [],
            TargetID: null,
          }
        });
      }

      this.activeEnemiesList = false;
    }
  }
}

import '@game/player/attack';
import '@game/player/equipments';
import '@game/player/load';
import '@game/player/movement';
import '@game/player/notification';
import '@game/player/save';
import '@game/player/stream';

