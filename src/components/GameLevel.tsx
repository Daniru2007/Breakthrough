// @ts-nocheck
import React from 'react';
import { Question } from '../data/questions';
import { Rocket, Star } from 'lucide-react';

interface GameLevelProps {
  currentQuestion: Question;
  onAnswer: (answer: string) => void;
  score: number;
  level: number;
}

export default function GameLevel({ currentQuestion, onAnswer, score, level }: GameLevelProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Rocket className="w-6 h-6 text-purple-500" />
          <span className="text-xl font-bold text-purple-500">Level {level}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-yellow-500" />
          <span className="text-xl font-bold text-yellow-500">Score: {score}</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-purple-500">
        <h2 className="text-2xl font-bold text-white mb-6">{currentQuestion.question}</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg 
                       transition-all duration-200 transform hover:scale-102 hover:shadow-lg
                       flex items-center justify-between"
            >
              <span>{option}</span>
              <Star className="w-4 h-4 opacity-50" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}