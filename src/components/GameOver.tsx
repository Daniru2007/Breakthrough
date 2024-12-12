import { Trophy, RefreshCw } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export default function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <div className="text-center">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
        <p className="text-2xl mb-8">Final Score: {score}</p>
        <button
          onClick={onRestart}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg
                   transition-all duration-200 flex items-center space-x-2 mx-auto"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
}