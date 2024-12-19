// ts-nocheck
import React from 'react';
import { User } from 'lucide-react';
import { theme } from '../styles/theme';

interface PlayerProps {
  position: { x: number; y: number };
  cellSize: number;
}

export const Player: React.FC<PlayerProps> = ({ position, cellSize }) => {
  const iconSize = Math.min(cellSize * 0.8, 40); // Cap the icon size

  return (
    <div
      className="absolute transform transition-all duration-200 hover:scale-110"
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
        <div className="absolute inset-0 animate-ping opacity-30">
          <User style={{ width: iconSize, height: iconSize }} className="text-indigo-500" />
        </div>
        <User 
          style={{ width: iconSize, height: iconSize }} 
          className="text-indigo-600 filter drop-shadow-lg relative z-10" 
        />
      </div>
    </div>
  );
};