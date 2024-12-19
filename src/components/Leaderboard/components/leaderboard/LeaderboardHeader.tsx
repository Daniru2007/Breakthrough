import { Trophy } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export function LeaderboardHeader() {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-6">
          <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-4 shadow-lg transform -rotate-3 transition-transform hover:rotate-0">
            <Trophy size={32} className="text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-green-800">Diamond League</h1>
            <p className="text-green-600">Top 5% of learners this week</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}