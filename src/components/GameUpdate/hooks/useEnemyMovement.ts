import { useEffect, useRef } from 'react';
import { Enemy, Position } from '../types/game';
import { calculateNextEnemyMove } from '../utils/enemyAI';
import { BOARD_SIZE, ENEMY_MOVE_INTERVAL } from '../constants/gameConstants';

interface UseEnemyMovementProps {
  enemies: Enemy[];
  setEnemies: (enemies: Enemy[]) => void;
  playerPos: Position;
  board: any[][];
  isPaused: boolean;
}

export const useEnemyMovement = ({
  enemies,
  setEnemies,
  playerPos,
  board,
  isPaused,
}: UseEnemyMovementProps) => {
  const lastUpdateRef = useRef(Date.now());
  const accumulatedTimeRef = useRef(0);

  useEffect(() => {
    let frameId: number;

    const updateEnemies = () => {
      if (!isPaused) {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastUpdateRef.current;
        accumulatedTimeRef.current += deltaTime;

        // Update enemies if enough time has passed
        while (accumulatedTimeRef.current >= ENEMY_MOVE_INTERVAL) {
          setEnemies(prevEnemies =>
            prevEnemies.map(enemy => calculateNextEnemyMove(enemy, playerPos, board, BOARD_SIZE))
          );
          accumulatedTimeRef.current -= ENEMY_MOVE_INTERVAL;
        }

        lastUpdateRef.current = currentTime;
      }

      frameId = requestAnimationFrame(updateEnemies);
    };

    frameId = requestAnimationFrame(updateEnemies);
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [board, isPaused, playerPos, setEnemies]);
};