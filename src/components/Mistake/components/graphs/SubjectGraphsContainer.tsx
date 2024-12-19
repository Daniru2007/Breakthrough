import React from 'react';
import { SubjectGraph } from './SubjectGraph';
import { SubjectMistake, SubjectType } from '../../types/subject';

interface SubjectGraphsContainerProps {
  mistakesBySubject: Record<SubjectType, SubjectMistake[]>;
}

export const SubjectGraphsContainer: React.FC<SubjectGraphsContainerProps> = ({ mistakesBySubject }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-[#2EC4B6] mb-6">Subject-wise Mistake Analysis</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(Object.keys(mistakesBySubject) as SubjectType[]).map((subject) => (
          <SubjectGraph
            key={subject}
            subject={subject}
            data={mistakesBySubject[subject]}
          />
        ))}
      </div>
    </div>
  );
};