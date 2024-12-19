import { Crown, Medal, Flame, GraduationCap } from 'lucide-react';
import { Progress } from '../ui/progress';
import { UserData } from '../../types/leaderboard';
import { memo } from 'react';

interface LeaderboardItemProps {
  user: UserData;
}

export const LeaderboardItem = memo(function LeaderboardItem({ user }: LeaderboardItemProps) {
  return (
    <div className="group p-4 hover:bg-green-50/50 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-12 text-center flex-shrink-0">
            {user.rank === 1 && <Crown size={24} className="mx-auto text-yellow-500 drop-shadow-sm" />}
            {user.rank === 2 && <Medal size={24} className="mx-auto text-gray-400 drop-shadow-sm" />}
            {user.rank === 3 && <Medal size={24} className="mx-auto text-amber-700 drop-shadow-sm" />}
            {user.rank > 3 && <span className="text-lg font-semibold text-gray-500">#{user.rank}</span>}
          </div>
          
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-lg transform transition-transform group-hover:scale-110 flex-shrink-0">
            {user.avatar}
          </div>
          
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-gray-900 truncate">{user.name}</span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
              {user.school && (
                <span className="flex items-center gap-1 truncate">
                  <GraduationCap size={14} className="flex-shrink-0" />
                  <span className="truncate">{user.school}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Flame size={14} className="text-orange-500 flex-shrink-0" />
                {user.streak} day streak
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-[200px] flex-shrink-0">
          <Progress value={user.progress} className="flex-1" />
          <span className="font-semibold text-green-600 min-w-[80px] text-right">
            {user.xp.toLocaleString()} XP
          </span>
        </div>
      </div>
    </div>
  );
});