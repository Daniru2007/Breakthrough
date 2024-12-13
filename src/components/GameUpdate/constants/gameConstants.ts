export const BOARD_SIZE = 10;
export const OBSTACLE_CHANCE = 0.2;
export const XP_PER_QUESTION = 10;
export const XP_PENALTY = 5;
export const ENEMY_COUNT = 3;
export const ENEMY_MOVE_INTERVAL = 500; // Increased from 300ms to 500ms for slower movement
export const MIN_QUESTIONS_PER_LEVEL = 3;
export const QUESTION_PLACEMENT_CHANCE = 0.3;

export const INITIAL_PLAYER_POSITION = { x: 0, y: 0 };

// Calculate cell size based on viewport
export const calculateCellSize = () => {
  const vh = Math.min(window.innerHeight * 0.8, window.innerWidth * 0.8);
  return Math.floor(vh / BOARD_SIZE);
};