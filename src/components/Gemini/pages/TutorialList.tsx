import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { TutorialCard } from '../components/TutorialCard';
import tutorials from '../data/tutorials.json';
import { useEmotionData } from '../hooks/useEmotionData';

export const TutorialList: React.FC = () => {

  const { emotionData, loading, error } = useEmotionData('currentUserId');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <GraduationCap className="w-16 h-16 text-[#2ECB46] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Your Learning Journey
          </h1>
          <p className="text-gray-600 text-lg">
            Choose a tutorial to begin your personalized learning experience
          </p>
        </motion.div>

        {loading && (
          <div className="text-center">
            <p className="text-gray-600">Loading your personalized content...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.tutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              id={tutorial.id}
              title={tutorial.title}
              description={tutorial.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};