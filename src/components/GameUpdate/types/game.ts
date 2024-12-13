export interface Position {
  x: number;
  y: number;
}

export interface Enemy {
  id: number;
  position: Position;
  direction: Position;
}

export interface Cell {
  isWall: boolean;
  hasQuestion: boolean;
  question?: Question;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  level: number;
  category: string;
}