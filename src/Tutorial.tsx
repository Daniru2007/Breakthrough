
import {useState, useCallback, useEffect, useContext} from 'react';
import type { EmotionData } from './types/emotion';
import { PopupOverlay } from './components/PopupOverlay';
import { Header } from './components/Tutorial/Header';
import { EmotionPanel } from './components/Tutorial/EmotionPanel';
import { ContentSection } from './components/Tutorial/ContentSection';
import { grammarSections } from './data/grammarSections';
import "./Tutorial.css";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.tsx';
import UserContext from "./UserContext.tsx";
import UserExtensionUpdate from "./UserExtensionUpdate.tsx";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const updateEmotion = async (userEmail: string, emotionData): Promise<void> => {
  try {

    const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
    const usersSnapshot = await getDocs(usersQuery);

    if (usersSnapshot.empty) {
      console.error('No user found with the provided email.');
      return;
    }

    const userDoc = usersSnapshot.docs[0];
    const userId = userDoc.id; // The document ID for the user
    const userRef = doc(db, 'users', userId);
    console.log(userId)

    const userExtensionQuery = query(
        collection(db, 'EmotionData'),
        where('UserID', '==', userRef)
    );
    const userExtensionSnapshot = await getDocs(userExtensionQuery);

    if (userExtensionSnapshot.empty) {
      console.error('No UserExtension document found for the user.');
      return;
    }

    const userExtensionDoc = userExtensionSnapshot.docs[0];
    const userExtensionData = userExtensionDoc.data();

    await updateDoc(doc(db, 'EmotionData', userExtensionDoc.id), {
      happy: userExtensionData.happy + emotionData.happy,
      sad: userExtensionData.sad + emotionData.sad,
      angry: userExtensionData.angry + emotionData.angry,
      neutral: userExtensionData.neutral + emotionData.neutral,
      surprise: userExtensionData.surprise + emotionData.surprise,
    });

  } catch (error) {
    console.error('Error updating XP in Firestore:', error);
  }
};





function Tutorial() {
  const {user} = useContext(UserContext); // Retrieve logged-in user context
  const [emotions, setEmotions] = useState<EmotionData>({
    happy: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    neutral: 0,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleEmotionUpdate = useCallback((emotion: string) => {
    setEmotions(prev => ({
      ...prev,
      [emotion]: prev[emotion] + (1/60),
    }));
  }, []);

  useEffect(() => {
    const totalEmotionCount = Object.values(emotions).reduce((acc, val) => acc + val, 0);

    if (totalEmotionCount >= 2) {
      const negativeEmotions = emotions.sad + emotions.angry;
      const positiveEmotions = emotions.happy;
      const isNegativeDominant = negativeEmotions > positiveEmotions;

      if (isNegativeDominant) {
        setShowPopup(true);
      }
      updateEmotion(user.email,emotions)

      setEmotions({
        happy: 0,
        sad: 0,
        angry: 0,
        surprised: 0,
        neutral: 0,
      });
    } else if (totalEmotionCount >= 0.3) {
      setShowPopup(false);
    }
  }, [emotions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <ContentSection sections={grammarSections} />
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <EmotionPanel 
              emotions={emotions}
              onEmotionUpdate={handleEmotionUpdate}
            />
          </div>
        </div>
      </main>

      <PopupOverlay 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}

export default Tutorial;