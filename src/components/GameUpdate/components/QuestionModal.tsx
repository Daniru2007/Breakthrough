import React from 'react';
import { Question } from '../data/types';
import { theme } from '../styles/theme';

interface QuestionModalProps {
  question: Question;
  onAnswer: (index: number) => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({ question, onAnswer }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100 shadow-2xl">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {question.category}
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {question.text}
        </h2>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className="w-full p-4 text-left rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 transform hover:scale-102 hover:shadow-md"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};