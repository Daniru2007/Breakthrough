import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface GrammarSectionProps {
  title: string;
  content: string;
  imageUrl: string;
}

const GrammarSection: React.FC<GrammarSectionProps> = ({ title, content, imageUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
    >
      <div className="flex items-center mb-4">
        <BookOpen className="w-6 h-6 text-[#2ECB46] mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600 leading-relaxed">{content}</p>
        </div>
        <div>
          <img
            src={imageUrl}
            alt={title}
            className="rounded-lg shadow-md w-full h-64 object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GrammarSection;