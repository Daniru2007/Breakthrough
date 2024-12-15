import React, {useState, useEffect, useCallback, useContext} from 'react';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { QuestionModal } from './QuestionModal';
import { GameOverModal } from './GameOverModal';
import { XPDisplay } from './XPDisplay';
import { Trophy } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Question, Position, Enemy as EnemyType } from '../types/game';
import { checkCollision } from '../utils/gameUtils';
import { useGameBoard } from '../hooks/useGameBoard';
import { useEnemies } from '../hooks/useEnemies';
import { useEnemyMovement } from '../hooks/useEnemyMovement';
import { usePlayerMovement } from '../hooks/usePlayerMovement';
import {updateUserXPInFirestore} from "../../../IncreaseXP.tsx";
import {
  BOARD_SIZE,
  XP_PER_QUESTION,
  XP_PENALTY,
  INITIAL_PLAYER_POSITION,
  calculateCellSize,
} from '../constants/gameConstants';
import userContext from "../../../UserContext.tsx";

export const GameBoard: React.FC = () => {
  const { xp, addXP, reduceXP, resetXP } = useGame();
  const [level, setLevel] = useState(1);
  const [playerPos, setPlayerPos] = useState<Position>(INITIAL_PLAYER_POSITION);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showCollisionModal, setShowCollisionModal] = useState(false);
  const [collidedEnemy, setCollidedEnemy] = useState<EnemyType | null>(null);
  const [cellSize, setCellSize] = useState(calculateCellSize());

  const { board, setBoard, generateBoard, updateBoard } = useGameBoard(level);
  const { enemies, setEnemies, initializeEnemies, resetEnemy } = useEnemies();

  const isGamePaused = gameOver || gameWon || !!currentQuestion || showCollisionModal;
  const {user} = useContext(userContext);
  // Initialize board and enemies
  useEffect(() => {
    const newBoard = generateBoard();
    setBoard(newBoard);
    setPlayerPos(INITIAL_PLAYER_POSITION);
    setEnemies(initializeEnemies());
    setGameOver(false);
    setGameWon(false);
    
    if (level > 1) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
  }, [level, generateBoard, initializeEnemies, setBoard]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCellSize(calculateCellSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use enemy movement hook
  useEnemyMovement({
    enemies,
    setEnemies,
    playerPos,
    board,
    isPaused: isGamePaused,
  });

  // Collision detection
  useEffect(() => {
    enemies.forEach(enemy => {
      if (checkCollision(playerPos, enemy.position)) {
        setCollidedEnemy(enemy);
        setShowCollisionModal(true);
      }
    });
  }, [playerPos, enemies]);

  const handleCellEnter = useCallback((newPos: Position) => {
    const targetCell = board[newPos.y][newPos.x];
    if (targetCell.hasQuestion && targetCell.question) {
      setCurrentQuestion(targetCell.question);
    }

    if (newPos.x === BOARD_SIZE - 1 && newPos.y === BOARD_SIZE - 1) {
      if (level === 5) {
        updateUserXPInFirestore(user.email, xp);
        setGameWon(true);
      } else {
        setLevel(prev => prev + 1);
      }
    }
  }, [board, level]);

  // Use player movement hook
  usePlayerMovement({
    playerPos,
    setPlayerPos,
    board,
    isMovementDisabled: isGamePaused,
    onCellEnter: handleCellEnter,
  });

  const handlePlayAgain = () => {
    setShowCollisionModal(false);
    setGameWon(false);
    setGameOver(false);
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
      resetEnemy(collidedEnemy.id);
      reduceXP(XP_PENALTY);
    }
    setCollidedEnemy(null);
  };

  const handleAnswer = (answerIndex: number) => {
    if (currentQuestion) {
      if (answerIndex === currentQuestion.correctAnswer) {
        updateBoard(playerPos);
        addXP(XP_PER_QUESTION);
      } else {
        setPlayerPos(INITIAL_PLAYER_POSITION);
      }
      setCurrentQuestion(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
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
        <div 
          className="relative" 
          style={{ 
            width: `${BOARD_SIZE * cellSize}px`, 
            height: `${BOARD_SIZE * cellSize}px` 
          }}
        >
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
                  width: `${cellSize - 4}px`,
                  height: `${cellSize - 4}px`,
                  left: `${x * cellSize}px`,
                  top: `${y * cellSize}px`,
                  background: cell.isWall 
                    ? 'linear-gradient(135deg, #1F2937 0%, #111827 100%)'
                    : cell.hasQuestion 
                    ? 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)'
                    : 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
                  transition: 'all 0.3s',
                }}
              />
            ))
          )}
          <Player position={playerPos} cellSize={cellSize} />
          {enemies.map(enemy => (
            <Enemy 
              key={enemy.id} 
              position={enemy.position} 
              cellSize={cellSize}
              playerPosition={playerPos}
            />
          ))}
          <div
            className="absolute transform transition-all duration-300 hover:scale-110"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              left: `${(BOARD_SIZE - 1) * cellSize}px`,
              top: `${(BOARD_SIZE - 1) * cellSize}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Trophy 
              style={{ width: Math.min(cellSize * 0.8, 40), height: Math.min(cellSize * 0.8, 40) }}
              className="text-amber-500 filter drop-shadow-lg" 
            />
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
              onClick={handlePlayAgain}
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
      {/*<div className="mt-6 text-gray-600 bg-white px-6 py-3 rounded-full shadow-md">*/}
      {/*  Use arrow keys to move. Avoid enemies and reach the trophy while answering questions correctly!*/}
      {/*</div>*/}
    </div>
  );
};