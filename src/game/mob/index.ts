import { Character } from '@game/character/interface';
import { CharacterDataToSync } from '@game/character';
import { Vector2D, MoveData } from '@utils/interface';

import '@game/mob/movimentation';
import '@game/mob/attack';

export class Mob implements Character {
  syncData: CharacterDataToSync;
  lastMoveTime = 0;
  moveDelay = 35000;
  LastAttackTime = 0;
  AttackDelay = 850;
  targetChar: Character | null;

  constructor(mobType: string, pos: Vector2D) {
    this.syncData = new CharacterDataToSync(mobType);
    this.syncData.Position = pos;
    this.moveDelay = 35000 / this.syncData.Speed;
  }

  GetID(): string {
    return this.syncData.ID;
  }

  IsDead(): boolean {
    return this.syncData.HP <= 0;
  }

  InSafeZone(): boolean {
    return false;
  }

  GetJSON(): any {
    return this.syncData.toJSON();
  }

  GetHP(): number {
    return this.syncData.HP;
  }

  // @ts-ignore - Ignore the following TypeScript error
  Move(data: MoveData): void;

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
  IdleMoving(): void;

  // @ts-ignore - Ignore the following TypeScript error
  MoveByVector(desiredMoveV: Vector2D): void;

  // @ts-ignore - Ignore the following TypeScript error
  TileCanMove(layer: number, x: number, y: number): boolean;
}

