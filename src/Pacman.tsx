import { GameBoard } from './components/Game/components/GameBoard';
import { GameProvider } from './components/Game/context/GameContext';

function Game() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-100">
        <GameBoard />
      </div>
    </GameProvider>
  );
}

export default Game;