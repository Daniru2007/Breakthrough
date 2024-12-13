import React from 'react';
import { Skull } from 'lucide-react';

interface GameOverModalProps {
  onPlayAgain: () => void;
  onContinue: () => void;
  xpLost: number;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ onPlayAgain, onContinue, xpLost }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="mb-6 animate-bounce">
            <Skull className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-purple-600">
            Caught by Enemy!
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            You lost {xpLost} XP points!
          </p>
          <div className="flex gap-4 w-full mt-4">
            <button
              onClick={onPlayAgain}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transform transition-all duration-200 hover:scale-105"
            >
              Restart Level
            </button>
            <button
              onClick={onContinue}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};