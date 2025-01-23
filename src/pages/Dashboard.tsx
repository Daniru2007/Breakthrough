import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Star, Trophy } from 'lucide-react';
import './Dashboard.css';

const xpData = [
  { day: 'Mo', xp: 10 },
  { day: 'Tu', xp: 15 },
  { day: 'We', xp: 8 },
  { day: 'Th', xp: 12 },
  { day: 'Fr', xp: 20 },
  { day: 'Sa', xp: 15 },
  { day: 'Su', xp: 18 },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="card">
          <h2 className="card-header">XP Progress</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="var(--primary-color)" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stats-container">
          <div className="card">
            <div className="card-header">
              <h2>Daily Goal</h2>
              <Star color="var(--yellow-400)" size={24} />
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <p className="progress-text">13/20 XP Today</p>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Leaderboard Position</h2>
            </div>
            <p className="stat-value">#42</p>
            <p className="stat-label">in Bronze League</p>
            <Trophy color="var(--secondary-color)" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;