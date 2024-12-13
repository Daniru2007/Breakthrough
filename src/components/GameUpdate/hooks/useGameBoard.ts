import { useState, useCallback } from 'react';
import { Cell, Position } from '../types/game';
import { questions } from '../data/questions';
import { hasValidPath } from '../utils/gameUtils';
import {
  BOARD_SIZE,
  OBSTACLE_CHANCE,
  MIN_QUESTIONS_PER_LEVEL,
  QUESTION_PLACEMENT_CHANCE,
} from '../constants/gameConstants';

export const useGameBoard = (level: number) => {
  const [board, setBoard] = useState<Cell[][]>([]);

  const generateBoard = useCallback(() => {
    const levelQuestions = questions.filter(q => q.level === level);
    
    // If no questions for this level, use questions from previous levels
    const availableQuestions = levelQuestions.length > 0 
      ? levelQuestions 
      : questions.filter(q => q.level <= level);

    // Ensure we have minimum required questions
    if (availableQuestions.length < MIN_QUESTIONS_PER_LEVEL) {
      const lowerLevelQuestions = questions
        .filter(q => q.level < level)
        .sort(() => Math.random() - 0.5)
        .slice(0, MIN_QUESTIONS_PER_LEVEL - availableQuestions.length);
      availableQuestions.push(...lowerLevelQuestions);
    }

    let questionIndex = 0;
    let validBoard = false;
    let newBoard: Cell[][] = [];
    let questionCount = 0;

    while (!validBoard || questionCount < MIN_QUESTIONS_PER_LEVEL) {
      questionCount = 0;
      newBoard = [];
      questionIndex = 0;

      for (let y = 0; y < BOARD_SIZE; y++) {
        const row: Cell[] = [];
        for (let x = 0; x < BOARD_SIZE; x++) {
          if (x === 0 && y === 0) {
            row.push({ isWall: false, hasQuestion: false });
          } else if (x === BOARD_SIZE - 1 && y === BOARD_SIZE - 1) {
            row.push({ isWall: false, hasQuestion: false });
          } else {
            const isWall = Math.random() < OBSTACLE_CHANCE;
            const hasQuestion = !isWall && 
              questionIndex < availableQuestions.length && 
              Math.random() < QUESTION_PLACEMENT_CHANCE;

            if (hasQuestion) {
              questionCount++;
            }

            row.push({
              isWall,
              hasQuestion,
              question: hasQuestion ? availableQuestions[questionIndex++] : undefined,
            });
          }
        }
        newBoard.push(row);
      }

      validBoard = hasValidPath(
        newBoard,
        { x: 0, y: 0 },
        { x: BOARD_SIZE - 1, y: BOARD_SIZE - 1 }
      );
    }

    return newBoard;
  }, [level]);

  const updateBoard = (position: Position) => {
    const newBoard = [...board];
    newBoard[position.y][position.x].hasQuestion = false;
    setBoard(newBoard);
  };

  return {
    board,
    setBoard,
    generateBoard,
    updateBoard,
  };
};