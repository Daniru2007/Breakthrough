import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TutorialCardProps {
  id: string;
  title: string;
  description: string;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({ id, title, description }) => {
  return (
    <Link to={`./${id}`}>
    <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center mb-4">
          <BookOpen className="w-6 h-6 text-[#2ECB46] mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    </Link>
  );
};