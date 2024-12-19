import React from 'react';
import { AlertTriangle, TrendingDown, Target, Brain } from 'lucide-react';

interface StatsProps {
  totalMistakes: number;
  improvementRate: number;
  commonCategory: string;
  streakDays: number;
}

export const Stats: React.FC<StatsProps> = ({
  totalMistakes,
  improvementRate,
  commonCategory,
  streakDays,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: 'Total Mistakes',
          value: totalMistakes,
          icon: AlertTriangle,
          color: '#FF9F1C',
        },
        {
          title: 'Improvement Rate',
          value: `${improvementRate}%`,
          icon: TrendingDown,
          color: '#2EC4B6',
        },
        {
          title: 'Common Category',
          value: commonCategory,
          icon: Target,
          color: '#FFBF69',
        },
        {
          title: 'Learning Streak',
          value: `${streakDays} days`,
          icon: Brain,
          color: '#2EC4B6',
        },
      ].map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl shadow-lg p-6 flex items-center"
        >
          <div
            className="p-4 rounded-lg mr-4"
            style={{ backgroundColor: `${stat.color}20` }}
          >
            <stat.icon
              className="w-6 h-6"
              style={{ color: stat.color }}
            />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}