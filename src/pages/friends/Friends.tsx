import { UserPlus, Flame } from 'lucide-react';
import './Friends.css';

const friends = [
  {
    name: 'Sarah Johnson',
    streak: 15,
    status: 'Learning Spanish',
    avatar: 'SJ',
  },
  {
    name: 'Mike Peters',
    streak: 7,
    status: 'Learning French',
    avatar: 'MP',
  },
  {
    name: 'Emma Wilson',
    streak: 23,
    status: 'Learning German',
    avatar: 'EW',
  },
  {
    name: 'Alex Thompson',
    streak: 5,
    status: 'Learning Italian',
    avatar: 'AT',
  },
];

function Friends() {
  return (
    <div className="friends-container">
      <div className="friends-header">
        <h1 className="more-title">Friends</h1>
        <button className="add-friend-btn">
          <UserPlus size={20} />
          Add Friend
        </button>
      </div>
      
      <div className="friends-list">
        {friends.map((friend, index) => (
          <div key={index} className="friend-item">
            <div className="friend-avatar">{friend.avatar}</div>
            <div className="friend-info">
              <h3 className="friend-name">{friend.name}</h3>
              <div className="friend-status">
                <span>{friend.status}</span>
                <span className="streak-count">
                  <Flame size={16} />
                  {friend.streak}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;