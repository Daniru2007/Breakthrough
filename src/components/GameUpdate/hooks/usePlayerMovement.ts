import { useCallback, useEffect, useRef } from 'react';
import { Position } from '../types/game';
import { BOARD_SIZE } from '../constants/gameConstants';

interface UsePlayerMovementProps {
  playerPos: Position;
  setPlayerPos: (pos: Position) => void;
  board: any[][];
  isMovementDisabled: boolean;
  onCellEnter: (pos: Position) => void;
}

export const usePlayerMovement = ({
  playerPos,
  setPlayerPos,
  board,
  isMovementDisabled,
  onCellEnter,
}: UsePlayerMovementProps) => {
  const lastMoveRef = useRef(Date.now());
  const moveDelayMs = 100; // Minimum delay between moves

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (isMovementDisabled) return;

    const currentTime = Date.now();
    if (currentTime - lastMoveRef.current < moveDelayMs) return;

    const newPos = { ...playerPos };
    switch (e.key) {
      case 'ArrowUp':
        if (playerPos.y > 0) newPos.y--;
        break;
      case 'ArrowDown':
        if (playerPos.y < BOARD_SIZE - 1) newPos.y++;
        break;
      case 'ArrowLeft':
        if (playerPos.x > 0) newPos.x--;
        break;
      case 'ArrowRight':
        if (playerPos.x < BOARD_SIZE - 1) newPos.x++;
        break;
      default:
        return;
    }

    const targetCell = board[newPos.y]?.[newPos.x];
    if (targetCell && !targetCell.isWall) {
      lastMoveRef.current = currentTime;
      setPlayerPos(newPos);
      onCellEnter(newPos);
    }
  }, [playerPos, board, isMovementDisabled, setPlayerPos, onCellEnter]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};