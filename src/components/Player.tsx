import { GameState } from '../types/game';
import { User } from 'lucide-react';

interface PlayerProps {
  gameState: GameState;
}

export default function Player({ gameState }: PlayerProps) {
  const { position, isJumping, isFalling } = gameState;
  
  return (
    <div 
      className={`absolute transition-transform duration-100 ${
        isJumping ? 'animate-jump' : isFalling ? 'animate-fall' : ''
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <User className="w-8 h-8 text-blue-500" />
    </div>
  );
}