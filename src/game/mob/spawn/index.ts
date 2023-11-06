import { Mob } from "@game/mob";
import { characterList, config, ground } from "@game/state";
import { Player } from "@game/player";
import { Vector2D } from "@utils/interface";
import * as Geometry from "@utils/geometry";

export class Spawn {
  private mobList = new Array<Mob>();
  private pos: Vector2D;
  private desiredMobCount = 0;
  private newList = new Array<number>();
  private spawnableMobs = new Array<string>();

  constructor(posX: number, posY: number) {
    this.pos = {x: posX, y: posY};
  }

  MaintainMobCount(count: number) {
    this.desiredMobCount = count;
  }

  DefineMobsInSpawn(mobs: Array<string>) {
    this.spawnableMobs = mobs;
  }

  Process() {
    if (this.mobList.length + this.newList.length < this.desiredMobCount) {
      this.newList.push(Date.now());
    }

    if (this.newList.length > 0) {
      if ((this.newList[0] + config.MobSpawnDelay) < Date.now()) {
        this.addNew();
        this.newList.splice(0, 1);
      }
    }

    for (var i = 0; i < this.mobList.length; i++) {
      if (this.mobList[i].IsDead()) {
        characterList.RemoveByID(this.mobList[i].GetID());
        this.mobList.splice(i, 1);
        i--;
        continue;
      }

      if (this.mobList[i].targetChar) {
        const targetChar = this.mobList[i].targetChar;

        if (targetChar?.InSafeZone()) {
          targetChar.Untarget();
        }
      }

      var nearestPlr = this.getNearestPlayer(this.mobList[i]);
      if (!nearestPlr) return;

      var plrPos = nearestPlr.GetJSON().Position;
      var mobPos = this.mobList[i].GetJSON().Position;
      var dist = Geometry.GetDistance(mobPos, plrPos);

      if (!nearestPlr.inSafeZone) {
        this.mobList[i].Target(nearestPlr);
        this.mobList[i].AttackTarget();
      }

      if (dist < 7 && dist > 1.5 && !nearestPlr.inSafeZone) {
        this.mobList[i].MoveByVector({x: mobPos.x - plrPos.x, y: mobPos.y - plrPos.y});
      }
   
      if (dist >= 7 || nearestPlr.inSafeZone) {
        this.mobList[i].IdleMoving();
      }
    }
  }

  private addNew() {
      var char = new Mob(
        this.spawnableMobs[(Math.random() * this.spawnableMobs.length) | 0],
        {
          x: ((Math.random() - 0.5) * 4 + this.pos.x) | 0,
          y: ((Math.random() - 0.5) * 4 + this.pos.y) | 0
        }
      );

      if (ground.GetCollision(0, char.syncData.Position.x, char.syncData.Position.y))
        return;
      
      char.SelfAnnouce();
      characterList.AddNewMob(char);
      this.mobList.push(char);
  }

  private getNearestPlayer(mob: Mob): Player | undefined {
    var lastDist = 1000000;
    var selectedPlayer: Player | undefined;

    characterList.ForEachPlayer((plr) => {
      var tmpDist = Geometry.GetDistance(plr.GetJSON().Position, mob.GetJSON().Position)
      if (tmpDist < lastDist) {
        lastDist = tmpDist;
        selectedPlayer = plr;
      }
    });

    return selectedPlayer;
  }
}
