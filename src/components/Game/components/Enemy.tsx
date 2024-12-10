import React from 'react';
import { Skull } from 'lucide-react';
import { calculateDistance } from '../utils/enemyAI';

interface EnemyProps {
  position: { x: number; y: number };
  cellSize: number;
  playerPosition: { x: number; y: number };
}

export const Enemy: React.FC<EnemyProps> = ({ position, cellSize, playerPosition }) => {
  const distance = calculateDistance(position, playerPosition);
  const isChasing = distance <= 3; // Updated to match new detection range

  return (
    <div
      className="absolute transform transition-all duration-150" // Reduced from 200ms to 150ms for smoother movement
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        transform: `translate(${position.x * cellSize}px, ${position.y * cellSize}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="relative">
        <div className={`absolute inset-0 ${isChasing ? 'animate-pulse' : ''} opacity-30`}>
          <Skull className={`w-10 h-10 ${isChasing ? 'text-red-600' : 'text-red-500'}`} />
        </div>
        <Skull 
          className={`w-10 h-10 ${isChasing ? 'text-red-700' : 'text-red-600'} 
            filter drop-shadow-lg relative z-10 
            ${isChasing ? 'scale-115' : 'scale-100'} 
            transition-all duration-200`}
        />
      </div>
    </div>
  );
};