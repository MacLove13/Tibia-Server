import { MoveData, Rotation } from '@utils/interface';

export interface Character {
  Move(data: MoveData): void;
  MoveDir(rot: Rotation): void;
  GetJSON(): any;
  // GetID(): string;
  Dispose(): void;
  SelfAnnouce(): void;
  Target(char: Character): void;
  Untarget(): void;
  GetHP(): number;
  Hit(dmg: number): { Exp: number } | undefined;
  Kill(): void;
  IsDead(): boolean;
  CanMove(): boolean;
  CanAttack(): boolean;
  AttackTarget(): void;
  InSafeZone(): boolean;
}
