import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { MistakesByDay } from '../types/mistake';

interface MistakeGraphProps {
  data: MistakesByDay[];
}

export const MistakeGraph: React.FC<MistakeGraphProps> = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-[#2EC4B6]">Mistakes Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="mistakeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2EC4B6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#CBF3F0" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#CBF3F0" />
          <XAxis 
            dataKey="date"
            tickFormatter={(date) => format(parseISO(date), 'MMM d')}
            stroke="#FF9F1C"
          />
          <YAxis stroke="#FF9F1C" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBF3F0',
              borderRadius: '8px',
            }}
            labelFormatter={(date) => format(parseISO(date as string), 'MMMM d, yyyy')}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#2EC4B6"
            fill="url(#mistakeGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}