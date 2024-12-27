import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface TutorialHeaderProps {
  title: string;
}

export const TutorialHeader: React.FC<TutorialHeaderProps> = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-xl">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  </motion.div>
);