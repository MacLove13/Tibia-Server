import { Vector2D } from '@utils/interface';

export interface SpawnData {
    Position: Vector2D;
    Count: number;
    Mobs: Array<string>;
}
