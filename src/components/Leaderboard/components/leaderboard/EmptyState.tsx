import { School } from 'lucide-react';

interface EmptyStateProps {
  viewMode: string;
}

export function EmptyState({ viewMode }: EmptyStateProps) {
  return (
    <div className="p-8 text-center">
      <School size={48} className="mx-auto text-green-600 opacity-50 mb-4" />
      <p className="text-lg font-semibold text-gray-900 mb-2">No students found</p>
      <p className="text-gray-500">
        {viewMode === 'school' 
          ? 'Be the first to earn XP from your school!'
          : 'Start learning to appear on the leaderboard'}
      </p>
    </div>
  );
}