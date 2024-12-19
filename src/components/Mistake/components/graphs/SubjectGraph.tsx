import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { SubjectMistake, SubjectType } from '../../types/subject';
import { subjectColors, commonGraphStyles } from '../../utils/graphStyles';

interface SubjectGraphProps {
  data: SubjectMistake[];
  subject: SubjectType;
}

export const SubjectGraph: React.FC<SubjectGraphProps> = ({ data, subject }) => {
  const colors = subjectColors[subject];
  const gradientId = `${subject.toLowerCase()}Gradient`;

  return (
    <div className="w-full h-[300px] bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6" style={{ color: colors.main }}>
        {subject} Mistakes
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.gradient.start} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={colors.gradient.end} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={commonGraphStyles.gridColor} />
          <XAxis 
            dataKey="date"
            tickFormatter={(date) => format(parseISO(date), 'MMM d')}
            stroke={commonGraphStyles.axisColor}
          />
          <YAxis stroke={commonGraphStyles.axisColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: commonGraphStyles.tooltipBackground,
              border: `1px solid ${commonGraphStyles.tooltipBorder}`,
              borderRadius: '8px',
            }}
            labelFormatter={(date) => format(parseISO(date as string), 'MMMM d, yyyy')}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke={colors.main}
            fill={`url(#${gradientId})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};