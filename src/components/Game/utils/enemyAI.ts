import { Position, Enemy } from '../types/game';
import { DIRECTIONS } from './gameUtils';

const DETECTION_RANGE = 3; // Increased from 2 to 3 for better detection
const CHASE_PROBABILITY = 0.85; // Increased from 0.7 to 0.85 for more aggressive chasing

export const calculateDistance = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};

export const getDirectionTowardsPlayer = (enemyPos: Position, playerPos: Position): Position => {
  const dx = Math.sign(playerPos.x - enemyPos.x);
  const dy = Math.sign(playerPos.y - enemyPos.y);
  
  // Increased probability of choosing the optimal direction
  return Math.random() < 0.7 ? // Increased from 0.5 to 0.7
    (Math.abs(dx) > Math.abs(dy) ? { x: dx, y: 0 } : { x: 0, y: dy })
    : (Math.random() < 0.5 ? { x: dx, y: 0 } : { x: 0, y: dy });
};

export const calculateNextEnemyMove = (
  enemy: Enemy,
  playerPos: Position,
  board: any[][],
  boardSize: number
): Enemy => {
  const distance = calculateDistance(enemy.position, playerPos);
  
  // If within detection range and passes chase probability check
  if (distance <= DETECTION_RANGE && Math.random() < CHASE_PROBABILITY) {
    const chaseDirection = getDirectionTowardsPlayer(enemy.position, playerPos);
    const newPosition = {
      x: enemy.position.x + chaseDirection.x,
      y: enemy.position.y + chaseDirection.y,
    };

    // Check if the new position is valid
    if (
      newPosition.x >= 0 &&
      newPosition.x < boardSize &&
      newPosition.y >= 0 &&
      newPosition.y < boardSize &&
      !board[newPosition.y][newPosition.x].isWall
    ) {
      return {
        ...enemy,
        position: newPosition,
        direction: chaseDirection,
      };
    }
  }

  // Fall back to random movement if chase fails or not in range
  const newPosition = {
    x: enemy.position.x + enemy.direction.x,
    y: enemy.position.y + enemy.direction.y,
  };

  if (
    newPosition.x >= 0 &&
    newPosition.x < boardSize &&
    newPosition.y >= 0 &&
    newPosition.y < boardSize &&
    !board[newPosition.y][newPosition.x].isWall
  ) {
    return { ...enemy, position: newPosition };
  }

  // If can't move in current direction, choose a new random direction
  const newDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  return { ...enemy, direction: newDirection };
};