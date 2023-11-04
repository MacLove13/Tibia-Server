import { Character } from '@game/character/interface';
import { CharacterDataToSync } from '@game/character';

export class Mob implements Character {
  // private syncData;
  private lastMoveTime = 0;
  private moveDelay = 35000;
  private LastAttackTime = 0;
  private AttackDelay = 850;
  private targetChar: Character;

  constructor(mobType: string, pos: Vector2D) {
    this.syncData = new CharacterDataToSync(mobType);
    this.syncData.Position = pos;
    this.moveDelay = 35000 / this.syncData.Speed;
  }
}
