export interface Position {
  x: number;
  y: number;
}

export interface Enemy {
  id: number;
  position: Position;
  direction: Position;
}