import { GraduationCap } from 'lucide-react';
import { LeaderboardFilter } from '../leaderboard/LeaderboardFilter';

interface PageHeaderProps {
  viewMode: string;
  onViewChange: (value: string) => void;
  userSchool?: string;
}

export function PageHeader({ viewMode, onViewChange, userSchool }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-green-600" />
            <span className="font-semibold">Learning Platform</span>
          </div>
          <LeaderboardFilter 
            value={viewMode}
            onChange={onViewChange}
            userSchool={userSchool}
          />
        </div>
      </div>
    </div>
  );
}