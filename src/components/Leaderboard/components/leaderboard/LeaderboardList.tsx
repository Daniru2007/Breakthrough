import { memo } from 'react';
import { UserData } from '../../types/leaderboard';
import { LeaderboardItem } from './LeaderboardItem';

interface LeaderboardListProps {
  users: UserData[];
}

export const LeaderboardList = memo(function LeaderboardList({ users }: LeaderboardListProps) {
  return (
    <div className="divide-y">
      {users.map((user) => (
        <LeaderboardItem key={user.email} user={user} />
      ))}
    </div>
  );
});