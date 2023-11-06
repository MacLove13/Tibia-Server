export interface Vector2D { x: number; y: number; }
export interface MoveData { Rot: Rotation; Pos: Vector2D }
export const enum Rotation { Down, Top, Right, Left };
