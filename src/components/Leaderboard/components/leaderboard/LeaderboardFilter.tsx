import { GraduationCap, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface LeaderboardFilterProps {
  value: string;
  onChange: (value: string) => void;
  userSchool?: string;
}

export function LeaderboardFilter({ value, onChange, userSchool }: LeaderboardFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-white border-green-200 hover:border-green-300 transition-colors">
        {value === 'global' ? (
          <Globe className="h-4 w-4 text-green-600 flex-shrink-0 mr-2" />
        ) : (
          <GraduationCap className="h-4 w-4 text-green-600 flex-shrink-0 mr-2" />
        )}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="global">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-green-600" />
            <span>Global Leaderboard</span>
          </div>
        </SelectItem>
        {userSchool && (
          <SelectItem value="school">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-green-600" />
              <span>{userSchool}</span>
            </div>
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}