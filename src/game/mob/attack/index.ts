import { Mob } from '@game/mob';
import { Character } from '@game/character/interface';
import * as GameState from '@game/state';
import { serverSocket } from '@socket/socket';
import * as Geometry from '@utils/geometry';

Mob.prototype.Target = function (char: Character): void {
  if (char.InSafeZone()) return;
  this.targetChar = char;
}

Mob.prototype.Untarget = function (): void {
  this.targetChar = null;
}

Mob.prototype.AttackTarget = function (): void {
  if (!this.targetChar) return;
  if (this.targetChar.GetHP() < 0) {
    this.Untarget();
    return;
  }

  if (this.targetChar.InSafeZone()) {
    this.Untarget();
    return;
  }

  if (!this.CanAttack()) return;
  var dist = Geometry.GetDistance(this.syncData.Position, this.targetChar.GetJSON().Position);
  if (dist > 1.5) return;
  var dmg = Math.random() * 5 | 0 + 1;
  this.targetChar.Hit(dmg);

  this.LastAttackTime = Date.now();
}

Mob.prototype.Hit = function (dmg: number): { Exp: number } | undefined {
  serverSocket.sockets.emit("ApplyDommage", { AttackType: 0, TargetID: this.syncData.ID, HitPoints: dmg });
  this.syncData.HP -= dmg;
  if (this.syncData.HP <= 0) {
    this.Kill();
    return { Exp: this.syncData.ExpAtDead };
  }
}

Mob.prototype.Kill = function (): void {
  this.syncData.HP = -1;
  this.Dispose();

  const race = this.GetJSON().Race as keyof typeof GameState.config.Mobs;

  serverSocket.sockets.emit("Animation", {
    Sprites: GameState.config.Mobs[race].DeadSprites,
    Pos: this.syncData.Position,
    TicksPerFrame: 2000
  });
}

Mob.prototype.CanAttack = function (): boolean {
  return ((Date.now() - this.LastAttackTime) > this.AttackDelay) && !this.IsDead();
}
