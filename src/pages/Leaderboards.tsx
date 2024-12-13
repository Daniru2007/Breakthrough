// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Trophy, Crown, Medal, Flame, Clock } from 'lucide-react';
import { collection, query, getDocs, doc, getFirestore, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.tsx';
import './Leaderboards.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Leaderboards() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        // Step 1: Fetch all users
        const usersQuery = query(collection(db, 'users'));
        const usersSnapshot = await getDocs(usersQuery);

        if (usersSnapshot.empty) {
          console.error('No users found.');
          setLoading(false);
          return;
        }

        // Step 2: Fetch corresponding UserExtension data for each user
        const userDataPromises = usersSnapshot.docs.map(async (userDoc) => {
          const userId = userDoc.id;
          const userDetails = userDoc.data();
          const userRef = doc(db, 'users', userId);

          // Query the UserExtension collection for the user's stats
          const userExtensionQuery = query(
              collection(db, 'UserExtension'),
              where('UserID', '==', userRef)
          );
          const userExtensionSnapshot = await getDocs(userExtensionQuery);

          let totalXP = 0;
          let streak = 0;

          userExtensionSnapshot.forEach((doc) => {
            const data = doc.data();
            totalXP += data.XP || 0;
            streak = data.Streak || 0; // Assuming `Streak` field exists
          });

          return {
            name: userDetails.Username || 'Unknown User',
            avatar: userDetails.Username ? userDetails.Username[0] : 'U',
            xp: totalXP,
            streak,
          };
        });

        // Wait for all promises to resolve
        const usersData = await Promise.all(userDataPromises);

        // Step 3: Sort users by XP and assign ranks
        const sortedUsers = usersData
            .sort((a, b) => b.xp - a.xp)
            .map((user, index) => ({
              ...user,
              rank: index + 1,
              progress: Math.min(100, (user.xp / 5000) * 100), // Example progress calculation
            }));

        setLeaderboardData(sortedUsers);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
