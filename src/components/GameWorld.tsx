import { useEffect, useRef } from 'react';
import { GameState, Platform, Obstacle } from '../types/game';
import Player from './Player';
import QuestionModal from './QuestionModal';

interface GameWorldProps {
  gameState: GameState;
  platforms: Platform[];
  obstacles: Obstacle[];
  onJump: () => void;
  onMove: (direction: 'left' | 'right') => void;
  onAnswerQuestion: (answer: string) => void;
}

export default function GameWorld({ 
  gameState, 
  platforms, 
  obstacles,
  onJump,
  onMove,
  onAnswerQuestion
}: GameWorldProps) {
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key);
      
      if (e.key === ' ' || e.key === 'ArrowUp') {
        onJump();
      }
      if (e.key === 'ArrowLeft') {
        onMove('left');
      }
      if (e.key === 'ArrowRight') {
        onMove('right');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onJump, onMove]);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-sky-400 to-sky-200 overflow-hidden">
      <div className="absolute top-4 left-4 flex space-x-4">
        <div className="bg-white px-4 py-2 rounded-lg shadow-md">
          Score: {gameState.score}
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-md">
          Health: {gameState.health}
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-md">
          Level: {gameState.level}
        </div>
      </div>

      <Player gameState={gameState} />

      {/* Platforms */}
      {platforms.map((platform, index) => (
        <div
          key={index}
          className="absolute bg-green-800"
          style={{
            left: platform.x,
            top: platform.y,
            width: platform.width,
            height: platform.height
          }}
        />
      ))}

      {/* Obstacles */}
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className="absolute bg-red-500"
          style={{
            left: obstacle.x,
            top: obstacle.y,
            width: obstacle.width,
            height: obstacle.height
          }}
        />
      ))}

      {gameState.currentQuestion && (
        <QuestionModal
          question={gameState.currentQuestion}
          onAnswer={onAnswerQuestion}
        />
      )}
    </div>
  );
}