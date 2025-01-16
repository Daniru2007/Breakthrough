import React from 'react';
import { EmotionData } from '../types';
import { Brain, Heart, Frown, Smile, AlertCircle } from 'lucide-react';

interface EmotionDataBoxProps {
  emotionData: EmotionData;
}

export const EmotionDataBox: React.FC<EmotionDataBoxProps> = ({ emotionData }) => {
  const emotions = [
    { name: 'Happy', value: emotionData.happy, icon: Smile, color: 'text-green-500' },
    { name: 'Sad', value: emotionData.sad, icon: Frown, color: 'text-blue-500' },
    { name: 'Angry', value: emotionData.angry, icon: AlertCircle, color: 'text-red-500' },
    { name: 'Neutral', value: emotionData.neutral, icon: Brain, color: 'text-gray-500' },
    { name: 'Surprise', value: emotionData.surprise, icon: Heart, color: 'text-purple-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Emotion Data (minutes)</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {emotions.map(({ name, value, icon: Icon, color }) => (
          <div key={name} className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <span className="text-sm text-gray-600">{name}</span>
            <span className="text-lg font-semibold">{value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};