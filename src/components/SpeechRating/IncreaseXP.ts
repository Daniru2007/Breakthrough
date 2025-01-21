import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const updateUserXPInFirestore = async (userEmail: string, xpAmount: number) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const currentXP = userDoc.data().xp || 0;
      
      await updateDoc(userDoc.ref, {
        xp: currentXP + xpAmount
      });
    }
  } catch (error) {
    console.error('Error updating XP:', error);
  }
};