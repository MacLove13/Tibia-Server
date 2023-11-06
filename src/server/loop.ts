import * as GameState from "@game/state";
import { Spawn } from "@game/mob/spawn";

// @ts-ignore - Ignore the following TypeScript error
var intervalHandle: NodeJS.Timer;
var spawnList = new Array<Spawn>();

export function Init() {
    console.log("Server Loop Started");
    intervalHandle = setInterval(ServerInterval, 50);

    // Load Mobs from Data
    for (var i = 0; i < GameState.config.MobSpawns.length; i++) {
        var mobSpawn = GameState.config.MobSpawns[i];
        var spawn = new Spawn(mobSpawn.Position.x, mobSpawn.Position.y);
        spawnList.push(spawn);
        spawnList[i].MaintainMobCount(mobSpawn.Count);
        spawnList[i].DefineMobsInSpawn(mobSpawn.Mobs);
    }
}

export function Stop() {
    if (intervalHandle) clearInterval(intervalHandle as unknown as number);
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
