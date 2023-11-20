import { Player } from '@game/player';
import { Character } from '@game/character/interface';
import { serverSocket } from '@socket/socket';
import * as GameState from '@game/state';
import * as Geometry from '@utils/geometry';

Player.prototype.Target = function (char: Character): void {
  if (this.InSafeZone()) {
    this.socket.emit("character:textNotification", { Message: "Você não pode atacar dentro de uma safezone."});
    this.targetChar = null;
    return;
  }

  if (char.InSafeZone()) {
    this.socket.emit("character:textNotification", { Message: "Você não pode atacar um alvo que está em uma safezone."});
    this.targetChar = null;
    return;
  }

  this.targetChar = char;
}

Player.prototype.Untarget = function (): void {
  this.targetChar = null;
}

Player.prototype.AttackTarget = function (): void {
  if (!this.targetChar) return;
  if (this.targetChar.GetHP() < 0) {
    this.targetChar = null;
    return;
  }

  if (this.InSafeZone()) {
    this.socket.emit("character:textNotification", { Message: "Você não pode atacar dentro de uma safezone."});
    this.targetChar = null;
    return;
  }

  let attackDistance = this.syncData.UClass == 'Warrior' ? 1.5 : 6;

  if (!(Date.now() - this.LastAttackTime > this.AttackDelay)) return;
  var dist = Geometry.GetDistance(this.syncData.Position, this.targetChar.GetJSON().Position);
  if (dist > attackDistance) return;

  // serverSocket.sockets.emit("SpawnProjectile", { Type: 0, StartPos: this.GetJSON().Position, TargetPos: this.targetChar.GetJSON().Position });

  let randomNum = Math.floor(Math.random() * 3) + 1; // 1 ~ 3
  let criticalChance = Math.floor(Math.random() * 99) + 1; // 1 ~ 100
  let criticalRange = Math.floor(Math.random() * 99) + 1; // 1 ~100

  var dmg = this.syncData.Attack + randomNum; // Math.random() * this.syncData.Level * 6 | 0 + this.syncData.Level * 2;
  
  if (criticalChance < 2)
    dmg = 1;
  else if (criticalChance >= (criticalRange - 5) && criticalChance <= (criticalRange + 4)) {
    let criticalExtraDamage = Math.floor(Math.random() * 6) + 1; // 1 ~ 6
    dmg = dmg + criticalExtraDamage;
  }
  
  var deadInfo = this.targetChar.Hit(dmg);
  if (deadInfo) {
    this.AddExp(deadInfo.Exp);
  }

  this.LastAttackTime = Date.now();
}

Player.prototype.Hit = function (this: Player, dmg: number): { Exp: number } | undefined {
  serverSocket.sockets.emit("ApplyDamage", { AttackType: 0, TargetID: this.syncData.ID, HitPoints: dmg });
  this.syncData.HP -= dmg;
  if (this.syncData.HP <= 0) {
    this.Kill();
    return { Exp: this.syncData.ExpAtDead * this.syncData.Level };
  }
}

Player.prototype.Kill = function (): void {
  this.syncData.HP = -1;
  
  const race = this.GetJSON().Race as keyof typeof GameState.config.Mobs;

  serverSocket.sockets.emit("Animation", {
    Sprites: GameState.config.Mobs[race].DeadSprites,
    Pos: this.syncData.Position,
    TicksPerFrame: 2000
  }); // TicksPerFrame 500
  
  this.sendNotification({
    Title: "Morte",
    Content: "Você morreu."
  });

  this.Dispose();
}

Player.prototype.CanAttack = function (): boolean {
  return (Date.now() - this.LastAttackTime) > this.AttackDelay;
}
