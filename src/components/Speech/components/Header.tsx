import { Mic2, Brain, Clock3 } from 'lucide-react';

export function Header() {
  return (
    <div className="w-full mb-8 text-center animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Speaking Practice</h1>
      <div className="flex justify-center gap-8 text-gray-600">
        <div className="flex items-center gap-2">
          <Clock3 className="text-primary" size={20} />
          <span>3 Minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <Mic2 className="text-primary" size={20} />
          <span>Clear Speech</span>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="text-primary" size={20} />
          <span>Critical Thinking</span>
        </div>
      </div>
    </div>
  );
}