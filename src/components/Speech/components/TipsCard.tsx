import { Lightbulb } from 'lucide-react';

const tips = [
  "Structure your response with an introduction, body, and conclusion",
  "Use specific examples to support your points",
  "Speak clearly and at a moderate pace",
  "Monitor your time to cover all key points"
];

export function TipsCard() {
  return (
    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-xs animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="text-primary" size={20} />
        <h3 className="font-semibold text-gray-800">Speaking Tips</h3>
      </div>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-primary">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}