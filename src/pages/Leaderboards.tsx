import React from 'react';
import { Trophy, Crown, Medal, Flame, Clock } from 'lucide-react';
import './Leaderboards.css';

// Instead of hardcoding these details in the component, you can fetch them from the collection Users and take the UserExtension from collection
const leaderboardData = [
  { 
    name: 'Sarah J.',
    avatar: 'SJ',
    xp: 2500,
    streak: 15,
    rank: 1,
    progress: 100
  },
  { 
    name: 'Mike R.',
    avatar: 'MR',
    xp: 2350,
    streak: 12,
    rank: 2,
    progress: 94
  },
  { 
    name: 'Alex M.',
    avatar: 'AM',
    xp: 2200,
    streak: 8,
    rank: 3,
    progress: 88
  },
  { 
    name: 'Chris P.',
    avatar: 'CP',
    xp: 2100,
    streak: 10,
    rank: 4,
    progress: 84
  },
  { 
    name: 'Emma L.',
    avatar: 'EL',
    xp: 2000,
    streak: 7,
    rank: 5,
    progress: 80
  },
];

function Leaderboards() {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="league-info">
          <div className="league-icon">
            <Trophy size={32} color="var(--secondary-color)" />
          </div>
          <div className="league-details">
            <h1>Diamond League</h1>
            <p className="league-subtitle">Top 5% of learners this week</p>
          </div>
        </div>
        <div className="time-remaining">
          <Clock size={20} />
          <span>2d 14h remaining</span>
        </div>
      </div>
      
      <div className="leaderboard-card">
        <div className="leaderboard-list">
          {leaderboardData.map((user) => (
            <div key={user.name} className="leaderboard-item">
              <div className="user-info">
                <div className="rank-indicator">
                  {user.rank === 1 && <Crown size={24} className="rank-icon gold" />}
                  {user.rank === 2 && <Medal size={24} className="rank-icon silver" />}
                  {user.rank === 3 && <Medal size={24} className="rank-icon bronze" />}
                  {user.rank > 3 && <span className="rank-number">#{user.rank}</span>}
                </div>
                <div className="user-avatar">{user.avatar}</div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <div className="user-streak">
                    <Flame size={12} />
                    <span>{user.streak} day streak</span>
                  </div>
                </div>
              </div>
              <div className="xp-info">
                <div className="xp-bar">
                  <div 
                    className="xp-progress" 
                    style={{ width: `${user.progress}%` }}
                  />
                </div>
                <span className="xp-value">{user.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboards;