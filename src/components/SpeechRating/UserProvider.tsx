import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

interface User {
  email: string;
  Username: string;
  xp: number;
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchTestUser = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', 'mello@gmail.com'));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUser({
            email: userDoc.data().email,
            Username: userDoc.data().Username,
            xp: userDoc.data().xp || 0
          });
        } else {
          console.error('Test user not found');
        }
      } catch (error) {
        console.error('Error fetching test user:', error);
      }
    };

    fetchTestUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};