
import React from 'react';
import { GameBoard } from './components/GameUpdate/components/GameBoard';
import { GameProvider } from './components/GameUpdate/context/GameContext';

function Game() {
  return (
    <GameProvider>
      <div className="min-h-screen">
        <GameBoard />
      </div>
    </GameProvider>
  );
}

export default Game;