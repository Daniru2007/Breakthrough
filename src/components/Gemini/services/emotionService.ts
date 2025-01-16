import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { EmotionData } from '../types';

const DEFAULT_EMOTION_DATA: EmotionData = {
  happy: 5,
  sad: 5,
  angry: 0,
  neutral: 5,
  surprise: 0
};

export async function fetchEmotionData(userEmail): Promise<EmotionData> {
  try {
    console.log('Fetching emotion data from Firebase...');


    const usersQuery = query(
        collection(db, 'users'),
        where('email', '==', userEmail) // Match by email
    );
    const usersSnapshot = await getDocs(usersQuery);

    if (usersSnapshot.empty) {
      console.error('No user document found for the given email.');
      return;
    }

    // Step 2: Get the user's document reference
    const userDoc = usersSnapshot.docs[0];
    const userId = userDoc.id;
    const userRef = doc(db, 'users', userId);
    const emotionsRef = collection(db, 'EmotionData');
    const emotionQuery = query(emotionsRef, where('UserID', '==', userRef));
    
    const emotionSnapshot = await getDocs(emotionQuery);
    
    if (!emotionSnapshot.empty) {
      const rawData = emotionSnapshot.docs[0].data();
      const data: EmotionData = {
        happy: Number(rawData.happy) || 0,
        sad: Number(rawData.sad) || 0,
        angry: Number(rawData.angry) || 0,
        neutral: Number(rawData.neutral) || 0,
        surprise: Number(rawData.surprised) || 0
      };
      console.log('Emotion data retrieved:', data);
      return data;
    }
    
    console.log('No emotion data found, using defaults');
    return DEFAULT_EMOTION_DATA;
  } catch (error) {
    console.error('Firebase Error:', error instanceof Error ? error.message : 'Unknown error');
    return DEFAULT_EMOTION_DATA; // Return defaults instead of null
  }
}