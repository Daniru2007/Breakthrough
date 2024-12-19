// ts-nocheck
import React from 'react';
import { useGame } from '../context/GameContext';
import { Star } from 'lucide-react';
import { theme } from '../styles/theme';

export const XPDisplay: React.FC = () => {
  const { xp } = useGame();

  return (
    <div className="relative group">
      <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105">
        <Star className="w-6 h-6 text-white animate-pulse" />
        <span className="font-bold text-white text-lg">{xp} XP</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-200" style={{ zIndex: -1 }} />
    </div>
  );
};