import { Position, Enemy } from '../types/game';

export const DIRECTIONS = [
  { x: 1, y: 0 },   // right
  { x: -1, y: 0 },  // left
  { x: 0, y: 1 },   // down
  { x: 0, y: -1 },  // up
];

export const createEnemy = (id: number, boardSize: number): Enemy => {
  // Keep trying until we find a valid position that's not at (0,0)
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * (boardSize - 2)) + 1,
      y: Math.floor(Math.random() * (boardSize - 2)) + 1,
    };
  } while (position.x === 0 && position.y === 0);
  
  const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  
  return { id, position, direction };
};

export const moveEnemy = (enemy: Enemy, board: any[][], boardSize: number): Enemy => {
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

  const newDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  return { ...enemy, direction: newDirection };
};

export const checkCollision = (playerPos: Position, enemyPos: Position): boolean => {
  return playerPos.x === enemyPos.x && playerPos.y === enemyPos.y;
};

export const hasValidPath = (board: any[][], start: Position, end: Position): boolean => {
  const visited = Array(board.length).fill(null).map(() => 
    Array(board[0].length).fill(false)
  );
  
  const queue: Position[] = [start];
  visited[start.y][start.x] = true;
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (current.x === end.x && current.y === end.y) {
      return true;
    }
    
    for (const dir of DIRECTIONS) {
      const newX = current.x + dir.x;
      const newY = current.y + dir.y;
      
      if (
        newX >= 0 && 
        newX < board[0].length && 
        newY >= 0 && 
        newY < board.length && 
        !board[newY][newX].isWall && 
        !visited[newY][newX]
      ) {
        queue.push({ x: newX, y: newY });
        visited[newY][newX] = true;
      }
    }
  }
  
  return false;
}