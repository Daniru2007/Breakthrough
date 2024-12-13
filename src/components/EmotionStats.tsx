import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Angry, AlertCircle, Meh } from 'lucide-react';
import type { EmotionData } from '../types/emotion';

interface EmotionStatsProps {
  emotions: EmotionData;
}

const EmotionStats: React.FC<EmotionStatsProps> = ({ emotions }) => {
  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy': return <Smile className="w-6 h-6 text-[#2ECB46]" />;
      case 'sad': return <Frown className="w-6 h-6 text-blue-500" />;
      case 'angry': return <Angry className="w-6 h-6 text-red-500" />;
      case 'surprised': return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default: return <Meh className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800">Your Emotion Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(emotions).map(([emotion, minutes]) => (
          <div key={emotion} className="flex items-center space-x-2">
            {getEmotionIcon(emotion)}
            <div>
              <p className="capitalize text-gray-700">{emotion}</p>
              <p className="text-sm text-gray-500">{minutes.toFixed(1)} minutes</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

};

export default EmotionStats;