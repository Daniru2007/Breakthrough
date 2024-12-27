import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface TutorialSectionProps {
  title: string;
  content: string;
  examples?: string[];
  index: number;
}

export const TutorialSection: React.FC<TutorialSectionProps> = ({ 
  title, 
  content, 
  examples,
  index 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="mb-8"
  >
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="prose prose-indigo max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">{content}</p>
        {examples && examples.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Examples:</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);