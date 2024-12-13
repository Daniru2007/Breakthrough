import { Trophy, Zap, Heart, Star } from 'lucide-react';
import './Notifications.css';

const notifications = [
  {
    icon: Trophy,
    title: 'Achievement Unlocked!',
    message: 'You\'ve completed 7 lessons this week',
    time: '2 hours ago',
    color: '#fbbf24',
  },
  {
    icon: Zap,
    title: 'Double XP Active',
    message: 'Your double XP boost is now active for 30 minutes',
    time: '5 hours ago',
    color: '#3b82f6',
  },
  {
    icon: Heart,
    title: 'Streak Milestone',
    message: 'Congratulations on reaching a 5-day streak!',
    time: '1 day ago',
    color: '#ef4444',
  },
  {
    icon: Star,
    title: 'New Achievement Available',
    message: 'Complete 3 more lessons to earn "Language Explorer"',
    time: '2 days ago',
    color: '#8b5cf6',
  },
];

function Notifications() {
  return (
    <div className="notifications-container">
      <h1 className="more-title">Notifications</h1>
      
      <div className="notifications-list">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div 
              className="notification-icon"
              style={{ 
                backgroundColor: `${notification.color}20`,
                color: notification.color
              }}
            >
              <notification.icon size={20} />
            </div>
            <div className="notification-content">
              <h3 className="notification-title">{notification.title}</h3>
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;