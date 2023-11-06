import * as GameState from "@game/state";
import { Spawn } from "@game/mob/spawn";

var intervalHandle: ReturnType<typeof setInterval>;
var spawnList = new Array<Spawn>();

export function Start() {
    intervalHandle = setInterval(ServerInterval, 50);

    // Load Mobs from Data
    for (var i = 0; i < GameState.config.MobSpawns.length; i++) {
        spawnList.push(new Spawn(GameState.config.MobSpawns[i].Position.x, GameState.config.MobSpawns[i].Position.y));
        spawnList[i].MaintainMobCount(GameState.config.MobSpawns[i].Count);
        spawnList[i].DefineMobsInSpawn(GameState.config.MobSpawns[i].Mobs);
    }
}

export function Stop() {
    if (intervalHandle) clearInterval(intervalHandle);
}

function ServerInterval() {
    GameState.characterList.ForEachPlayer((plr) => {
        plr.AttackTarget();
        if (plr.IsDead()) {
            GameState.characterList.RemoveByID(plr.GetID());
        }
    });

    for (var i = 0; i < spawnList.length; i++) {
        spawnList[i].Process();
    }
}
