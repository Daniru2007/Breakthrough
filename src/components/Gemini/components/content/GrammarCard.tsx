import React from 'react';
import { Book } from 'lucide-react';

interface GrammarSection {
  title: string;
  description: string;
  examples: string[];
}

interface GrammarCardProps {
  section: GrammarSection;
}

export const GrammarCard: React.FC<GrammarCardProps> = ({ section }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-[#2ECB46] to-[#25A83C] p-4">
        <div className="flex items-center space-x-3">
          <Book className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">{section.title}</h2>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-4">{section.description}</p>
        
        {/* Examples */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Examples:</h3>
          <div className="flex flex-wrap gap-2">
            {section.examples.map((example, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};