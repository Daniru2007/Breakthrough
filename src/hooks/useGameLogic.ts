import { useState, useCallback, useEffect } from 'react';
import { GameState, Platform, Obstacle } from '../types/game';
import { questions } from '../data/questions';

const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const MOVE_SPEED = 5;

const INITIAL_STATE: GameState = {
  position: { x: 50, y: 300 },
  isJumping: false,
  isFalling: false,
  score: 0,
  health: 3,
  currentQuestion: null,
  gameOver: false,
  level: 1
};

const PLATFORMS: Platform[] = [
  { x: 0, y: 500, width: 800, height: 20, hasQuestion: false },
  { x: 300, y: 400, width: 200, height: 20, hasQuestion: true },
  { x: 600, y: 300, width: 200, height: 20, hasQuestion: true },
];

const OBSTACLES: Obstacle[] = [
  { x: 400, y: 380, width: 40, height: 40, questionId: 1 },
  { x: 700, y: 280, width: 40, height: 40, questionId: 2 },
];

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const checkCollisions = useCallback(() => {
    // Platform collisions
    const onPlatform = PLATFORMS.some(platform => 
      gameState.position.x < platform.x + platform.width &&
      gameState.position.x + 30 > platform.x &&
      gameState.position.y + 40 >= platform.y &&
      gameState.position.y + 40 <= platform.y + 5
    );

    // Obstacle collisions
    OBSTACLES.forEach(obstacle => {
      if (
        gameState.position.x < obstacle.x + obstacle.width &&
        gameState.position.x + 30 > obstacle.x &&
        gameState.position.y < obstacle.y + obstacle.height &&
        gameState.position.y + 40 > obstacle.y
      ) {
        setGameState(prev => ({
          ...prev,
          currentQuestion: questions.find(q => q.id === obstacle.questionId) || null
        }));
      }
    });

    return onPlatform;
  }, [gameState.position]);

  const jump = useCallback(() => {
    if (!gameState.isJumping && !gameState.isFalling) {
      setVelocity(prev => ({ ...prev, y: JUMP_FORCE }));
      setGameState(prev => ({ ...prev, isJumping: true }));
    }
  }, [gameState.isJumping, gameState.isFalling]);

  const move = useCallback((direction: 'left' | 'right') => {
    const multiplier = direction === 'left' ? -1 : 1;
    setVelocity(prev => ({ ...prev, x: MOVE_SPEED * multiplier }));
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    const isCorrect = gameState.currentQuestion?.correctAnswer === answer;
    
    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 100 : prev.score,
      health: !isCorrect ? prev.health - 1 : prev.health,
      currentQuestion: null,
      gameOver: !isCorrect && prev.health <= 1
    }));
  }, [gameState.currentQuestion]);

  useEffect(() => {
    if (gameState.gameOver) return;

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        const newY = prev.position.y + velocity.y;
        const newX = prev.position.x + velocity.x;
        
        const onPlatform = checkCollisions();

        let newVelocityY = velocity.y;
        if (!onPlatform) {
          newVelocityY += GRAVITY;
        } else {
          newVelocityY = 0;
        }

        setVelocity(prev => ({ ...prev, y: newVelocityY }));

        return {
          ...prev,
          position: {
            x: Math.max(0, Math.min(newX, 760)), // Keep player within bounds
            y: Math.min(newY, 460) // Ground level
          },
          isJumping: newVelocityY < 0,
          isFalling: newVelocityY > 0
        };
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [velocity, checkCollisions, gameState.gameOver]);

  return {
    gameState,
    platforms: PLATFORMS,
    obstacles: OBSTACLES,
    onJump: jump,
    onMove: move,
    onAnswerQuestion: handleAnswer
  };
}