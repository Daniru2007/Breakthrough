import React, { createContext, useContext, useState } from 'react';

interface GameContextType {
  xp: number;
  addXP: (amount: number) => void;
  reduceXP: (amount: number) => void;
  resetXP: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXP] = useState(0);

  const addXP = (amount: number) => {
    setXP(prev => prev + amount);
  };

  const reduceXP = (amount: number) => {
    setXP(prev => Math.max(0, prev - amount));
  };

  const resetXP = () => {
    setXP(0);
  };

  return (
    <GameContext.Provider value={{ xp, addXP, reduceXP, resetXP }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};