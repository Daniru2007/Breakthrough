import { Question } from '../types';

interface SpeakingPromptProps {
  question: Question;
}

export function SpeakingPrompt({ question }: SpeakingPromptProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in">
      <div className="bg-primary/5 p-6 rounded-lg shadow-inner-glow">
        <p className="text-lg text-gray-700 leading-relaxed">{question.text}</p>
      </div>
    </div>
  );
}