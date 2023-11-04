import { Vector2D } from '@utils/interface/vector2d';

export interface MoveData { Rot: Rotation; Pos: Vector2D }
export const enum Rotation { Down, Top, Right, Left };
