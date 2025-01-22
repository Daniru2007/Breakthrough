import React from 'react';
import { User } from 'lucide-react';


interface PlayerProps {
  position: { x: number; y: number };
  cellSize: number;
}

export const Player: React.FC<PlayerProps> = ({ position, cellSize }) => {
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
          <User className="w-10 h-10 text-indigo-500" />
        </div>
        <User className="w-10 h-10 text-indigo-600 filter drop-shadow-lg relative z-10" />
      </div>
    </div>
  );
};