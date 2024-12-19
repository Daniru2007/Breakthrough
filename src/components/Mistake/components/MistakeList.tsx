import React from 'react';
import { Mistake } from '../types/mistake';
import { BookX, Calendar, Tag } from 'lucide-react';

interface MistakeListProps {
  mistakes: Mistake[];
}

export const MistakeList: React.FC<MistakeListProps> = ({ mistakes }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-[#2EC4B6]">Recent Mistakes</h2>
      <div className="space-y-4">
        {mistakes.map((mistake) => (
          <div
            key={mistake.id}
            className="border border-[#CBF3F0] rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <BookX className="w-5 h-5 text-[#FF9F1C]" />
                  <span className="font-medium text-gray-800">{mistake.subject}</span>
                </div>
                <p className="text-gray-600">{mistake.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-[#2EC4B6]" />
                    <span>{new Date(mistake.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4 text-[#FFBF69]" />
                    <span>{mistake.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}