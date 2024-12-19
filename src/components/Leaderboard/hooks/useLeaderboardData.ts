// ts-nocheck
import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserData, FirestoreUser, FirestoreUserExtension } from '../types/leaderboard';
import { useToast } from './use-toast';
import { calculateProgress } from '../utils/progress';

export function useLeaderboardData() {
  const [leaderboardData, setLeaderboardData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const usersQuery = query(collection(db, 'users'));
        const usersSnapshot = await getDocs(usersQuery);
        
        // Create a Map to store unique users by email
        const uniqueUsers = new Map();

        for (const userDoc of usersSnapshot.docs) {
          const userDetails = userDoc.data() as FirestoreUser;
          const email = userDetails.email;
          
          // Skip if no email or we've already processed this email
          if (!email || uniqueUsers.has(email)) {
            continue;
          }

          const userRef = doc(db, 'users', userDoc.id);
          const userExtensionQuery = query(
            collection(db, 'UserExtension'),
            where('UserID', '==', userRef)
          );
          const userExtensionSnapshot = await getDocs(userExtensionQuery);

          let totalXP = 0;
          let streak = 0;

          userExtensionSnapshot.forEach((doc) => {
            const data = doc.data() as FirestoreUserExtension;
            totalXP += data.XP || 0;
            streak += data.Streak || 0;
          });

          // Only use the Username field for display, never the email
          const userData: UserData = {
            name: userDetails.Username || 'Unknown User',
            avatar: userDetails.Username ? userDetails.Username[0].toUpperCase() : 'U',
            xp: totalXP,
            streak,
            school: userDetails.school,
            email: email,
          };

          uniqueUsers.set(email, userData);
        }

        const usersData = Array.from(uniqueUsers.values());
        const sortedUsers = usersData
          .sort((a, b) => b.xp - a.xp)
          .map((user, index) => ({
            ...user,
            rank: index + 1,
            progress: calculateProgress(user.xp),
          }));

        setLeaderboardData(sortedUsers);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load leaderboard data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, [toast]);

  return { leaderboardData, loading };
}