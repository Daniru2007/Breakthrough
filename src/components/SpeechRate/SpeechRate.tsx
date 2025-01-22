import React, {useContext, useEffect, useState} from 'react';
import { storage, db } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import {doc, getDoc, setDoc, collection, query, where, getDocs} from 'firebase/firestore';
import { AudioPlayer } from './components/AudioPlayer';
import { RatingStars } from './components/RatingStars';
import type { Recording, User } from './types';
import { Headphones, AudioWaveform } from 'lucide-react';
import UserContext from "../../UserContext.tsx";
import {updateUserXPInFirestore} from "../../IncreaseXP.tsx";

function SpeechRate() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState('USER_ID_HERE');
  const {user} = useContext(UserContext);

  const findNextUnratedRecording = async (recordingsList: Recording[], startIndex = 0) => {
    for (let i = startIndex; i < recordingsList.length; i++) {
      const recording = recordingsList[i];
      const ratingRef = doc(collection(db, 'rating'), recording.userId);
      const ratingDoc = await getDoc(ratingRef);
      const ratingData = ratingDoc.data();
      
      if (!ratingDoc.exists() || !ratingData?.[recording.count.toString()]) {

        const userRef = collection(db, 'users');
        const q = query(userRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0];
        setCurrentUserId(userDoc.id);
        const userData = userDoc.data() as User | undefined;
        
        return {
          ...recording,
          userId: userDoc.id,
          userEmail: userData.email,
          username: userData?.Username || 'Anonymous User'
        };
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const storageRef = ref(storage);
        const result = await listAll(storageRef);
        
        const recordingsPromises = result.items.map(async (item) => {
          const [userId, count] = item.name.split('_');
          if (userId !== currentUserId) {
            const url = await getDownloadURL(item);
            return {
              userId,
              count: parseInt(count),
              url
            };
          }
          return null;
        });

        const fetchedRecordings = (await Promise.all(recordingsPromises))
          .filter((recording): recording is Recording => recording !== null);
        
        setRecordings(fetchedRecordings);
        
        const firstUnrated = await findNextUnratedRecording(fetchedRecordings);
        setCurrentRecording(firstUnrated);
      } catch (error) {
        console.error('Error fetching recordings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordings();
  }, [currentUserId]);

  const handleRate = async (userEmail:string, rating: number) => {
    if (!currentRecording) return;

    try {
      const ratingRef = doc(collection(db, 'rating'), currentRecording.userId);
      const ratingDoc = await getDoc(ratingRef);
      
      await setDoc(ratingRef, {
        ...ratingDoc.data(),
        [currentRecording.count.toString()]: {
          rating,
          timestamp: new Date()
        }
      }, { merge: true });

      await updateUserXPInFirestore(userEmail, rating * 10)

      const currentIndex = recordings.findIndex(r =>
        r.userId === currentRecording.userId && r.count === currentRecording.count
      );
      const nextUnrated = await findNextUnratedRecording(recordings, currentIndex + 1);
      setCurrentRecording(nextUnrated);
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (!currentRecording) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
          <Headphones className="w-16 h-16 text-[#2EC4B6] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No more recordings to rate!
          </h2>
          <p className="text-gray-600">
            You've rated all available recordings. Check back later for new ones!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-center mb-8">
            <div className="relative inline-block">
              <Headphones className="text-[#2EC4B6] w-16 h-16" />
              <AudioWaveform className="text-[#2EC4B6] w-6 h-6 absolute -right-4 -bottom-3 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Rate Community Recordings
          </h1>
          
          <div className="text-center mb-8">
            <p className="text-gray-500">
              Recording #{currentRecording.count} by <span className="font-semibold text-[#2EC4B6]">{currentRecording.username}</span>
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <AudioPlayer url={currentRecording.url} />
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-600 font-medium">How would you rate this recording?</p>
              <RatingStars userEmail={currentRecording.userEmail} rating={0} onRate={handleRate} />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <p className="text-black text-sm">
            Rate one recording to see your own results
          </p>
        </div>
      </div>
    </div>
  );
}

export default SpeechRate;