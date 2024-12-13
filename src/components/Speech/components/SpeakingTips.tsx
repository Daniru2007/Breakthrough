import { Lightbulb } from 'lucide-react';
import { speakingTips } from '../utils/tips';

export function SpeakingTips() {
  return (
    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-xs animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="text-primary" size={20} />
        <h3 className="font-semibold text-gray-800">Speaking Tips</h3>
      </div>
      <ul className="space-y-2">
        {speakingTips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-primary">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}