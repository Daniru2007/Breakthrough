import { useState, useCallback } from 'react';
import { Enemy, Position } from '../types/game';
import { createEnemy } from '../utils/gameUtils';
import { BOARD_SIZE, ENEMY_COUNT } from '../constants/gameConstants';

export const useEnemies = () => {
  const [enemies, setEnemies] = useState<Enemy[]>([]);

  const initializeEnemies = useCallback(() => {
    const newEnemies: Enemy[] = [];
    for (let i = 0; i < ENEMY_COUNT; i++) {
      newEnemies.push(createEnemy(i, BOARD_SIZE));
    }
    return newEnemies;
  }, []);

  const resetEnemy = (enemyId: number) => {
    setEnemies(prevEnemies =>
      prevEnemies.map(e =>
        e.id === enemyId
          ? { ...e, position: createEnemy(e.id, BOARD_SIZE).position }
          : e
      )
    );
  };

  return {
    enemies,
    setEnemies,
    initializeEnemies,
    resetEnemy,
  };
};