import React, { useState, useEffect, useCallback } from 'react';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { QuestionModal } from './QuestionModal';
import { GameOverModal } from './GameOverModal';
import { XPDisplay } from './XPDisplay';
import { questions, Question } from '../data/questions';
import { Trophy } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { theme } from '../styles/theme';
import { Enemy as EnemyType, Position } from '../types/game';
import { createEnemy, checkCollision, hasValidPath } from '../utils/gameUtils';
import { calculateNextEnemyMove } from '../utils/enemyAI';
import useUserXPUpdater from "../../../UserExtensionUpdate.tsx";

const BOARD_SIZE = 10;
const OBSTACLE_CHANCE = 0.2;
const XP_PER_QUESTION = 10;
const XP_PENALTY = 5;
const CELL_SIZE = 48;
const ENEMY_COUNT = 3;
const ENEMY_MOVE_INTERVAL = 500;
const INITIAL_PLAYER_POSITION: Position = { x: 0, y: 0 };

interface Cell {
  isWall: boolean;
  hasQuestion: boolean;
  question?: Question;
}

export const GameBoard: React.FC = () => {
  const { xp, addXP, reduceXP, resetXP } = useGame();
  const [level, setLevel] = useState(1);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [playerPos, setPlayerPos] = useState<Position>(INITIAL_PLAYER_POSITION);
  const [enemies, setEnemies] = useState<EnemyType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showCollisionModal, setShowCollisionModal] = useState(false);
  const [collidedEnemy, setCollidedEnemy] = useState<EnemyType | null>(null);

  const resetPositions = useCallback((enemy: EnemyType) => {
    setCollidedEnemy(enemy);
    setShowCollisionModal(true);
  }, []);

  const handlePlayAgain = () => {
    setShowCollisionModal(false);
    setLevel(1);
    setPlayerPos(INITIAL_PLAYER_POSITION);
    const newBoard = generateBoard();
    setBoard(newBoard);
    setEnemies(initializeEnemies());
    resetXP();
  };

  const handleContinue = () => {
    setShowCollisionModal(false);
    setPlayerPos(INITIAL_PLAYER_POSITION);
    if (collidedEnemy) {
      setEnemies(prevEnemies =>
        prevEnemies.map(e =>
          e.id === collidedEnemy.id
            ? { ...e, position: createEnemy(e.id, BOARD_SIZE).position }
            : e
        )
      );
      reduceXP(XP_PENALTY);
    }
    setCollidedEnemy(null);
  };

  useEffect(() => {
    enemies.forEach(enemy => {
      if (checkCollision(playerPos, enemy.position)) {
        resetPositions(enemy);
      }
    });
  }, [playerPos, enemies, resetPositions]);

  const generateBoard = useCallback(() => {
    const levelQuestions = questions.filter(q => q.level === level);
    let questionIndex = 0;
    let validBoard = false;
    let newBoard: Cell[][] = [];

    while (!validBoard) {
      newBoard = [];
      for (let y = 0; y < BOARD_SIZE; y++) {
        const row: Cell[] = [];
        for (let x = 0; x < BOARD_SIZE; x++) {
          if (x === 0 && y === 0) {
            row.push({ isWall: false, hasQuestion: false });
          } else if (x === BOARD_SIZE - 1 && y === BOARD_SIZE - 1) {
            row.push({ isWall: false, hasQuestion: false });
          } else {
            const isWall = Math.random() < OBSTACLE_CHANCE;
            const hasQuestion = !isWall && questionIndex < levelQuestions.length && Math.random() < 0.2;
            row.push({
              isWall,
              hasQuestion,
              question: hasQuestion ? levelQuestions[questionIndex++] : undefined,
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

  const initializeEnemies = useCallback(() => {
    const newEnemies: EnemyType[] = [];
    for (let i = 0; i < ENEMY_COUNT; i++) {
      newEnemies.push(createEnemy(i, BOARD_SIZE));
    }
    return newEnemies;
  }, []);

  useEffect(() => {
    const newBoard = generateBoard();
    setBoard(newBoard);
    setPlayerPos(INITIAL_PLAYER_POSITION);
    setEnemies(initializeEnemies());
    setGameOver(false);
    
    if (level > 1) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
  }, [level, generateBoard, initializeEnemies]);

  useEffect(() => {
    if (gameOver || gameWon || currentQuestion || showCollisionModal) return;

    const interval = setInterval(() => {
      setEnemies(prevEnemies =>
        prevEnemies.map(enemy => calculateNextEnemyMove(enemy, playerPos, board, BOARD_SIZE))
      );
    }, ENEMY_MOVE_INTERVAL);

    return () => clearInterval(interval);
  }, [board, gameOver, gameWon, currentQuestion, playerPos, showCollisionModal]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentQuestion || gameWon || gameOver || showCollisionModal) return;

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
        if (targetCell.hasQuestion && targetCell.question) {
          setCurrentQuestion(targetCell.question);
        }
        setPlayerPos(newPos);

        if (newPos.x === BOARD_SIZE - 1 && newPos.y === BOARD_SIZE - 1) {
          if (level === 5) {
            const updateUserXP = useUserXPUpdater();
            updateUserXP(Number(xp));
            setGameWon(true);
          } else {
            setLevel(prev => prev + 1);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, board, currentQuestion, level, gameWon, gameOver, showCollisionModal]);

  const handleAnswer = (answerIndex: number) => {
    if (currentQuestion) {
      if (answerIndex === currentQuestion.correctAnswer) {
        const newBoard = [...board];
        newBoard[playerPos.y][playerPos.x].hasQuestion = false;
        setBoard(newBoard);
        addXP(XP_PER_QUESTION);
      } else {
        setPlayerPos(INITIAL_PLAYER_POSITION);
      }
      setCurrentQuestion(null);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setGameOver(false);
    setGameWon(false);
    resetXP();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="mb-8 flex items-center gap-8">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Level {level}
        </div>
        <XPDisplay />
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-500 to-purple-500"
          style={{ zIndex: 0 }}
        />
        <div className="relative" style={{ width: `${BOARD_SIZE * CELL_SIZE}px`, height: `${BOARD_SIZE * CELL_SIZE}px` }}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`absolute rounded-lg transform transition-all duration-300 hover:scale-105 ${
                  cell.isWall 
                    ? 'shadow-lg' 
                    : cell.hasQuestion 
                    ? 'shadow-md hover:shadow-lg' 
                    : 'shadow-sm hover:shadow-md'
                }`}
                style={{
                  width: `${CELL_SIZE - 4}px`,
                  height: `${CELL_SIZE - 4}px`,
                  left: `${x * CELL_SIZE}px`,
                  top: `${y * CELL_SIZE}px`,
                  background: cell.isWall 
                    ? theme.gradients.wall 
                    : cell.hasQuestion 
                    ? theme.gradients.question 
                    : theme.gradients.path,
                  transition: 'all 0.3s',
                }}
              />
            ))
          )}
          <Player position={playerPos} cellSize={CELL_SIZE} />
          {enemies.map(enemy => (
            <Enemy 
              key={enemy.id} 
              position={enemy.position} 
              cellSize={CELL_SIZE}
              playerPosition={playerPos}
            />
          ))}
          <div
            className="absolute transform transition-all duration-300 hover:scale-110"
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
              left: `${(BOARD_SIZE - 1) * CELL_SIZE}px`,
              top: `${(BOARD_SIZE - 1) * CELL_SIZE}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Trophy className="w-10 h-10 text-amber-500 filter drop-shadow-lg" />
          </div>
        </div>
      </div>
      {currentQuestion && <QuestionModal question={currentQuestion} onAnswer={handleAnswer} />}
      {showCollisionModal && (
        <GameOverModal
          onPlayAgain={handlePlayAgain}
          onContinue={handleContinue}
          xpLost={XP_PENALTY}
        />
      )}
      {(gameWon || gameOver) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {gameWon ? 'Congratulations!' : 'Game Over!'}
            </h2>
            <p className="text-gray-600 mb-6">
              {gameWon ? "You've mastered all levels!" : 'You were caught by an enemy!'}
            </p>
            <button
              onClick={resetGame}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {showLevelUp && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-out">
          <div className="text-4xl font-bold text-indigo-600 animate-bounce">
            Level Up!
          </div>
        </div>
      )}
      <div className="mt-6 text-gray-600 bg-white px-6 py-3 rounded-full shadow-md">
        Use arrow keys to move. Avoid enemies and reach the trophy while answering questions correctly!
      </div>
    </div>
  );
};