export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface GameState {
  position: { x: number; y: number };
  isJumping: boolean;
  isFalling: boolean;
  score: number;
  health: number;
  currentQuestion: Question | null;
  gameOver: boolean;
  level: number;
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  hasQuestion: boolean;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  questionId: number;
}