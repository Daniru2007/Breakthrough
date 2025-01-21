import React, { useContext, useEffect, useState } from 'react';
import { storage, db } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, addDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { AudioPlayer } from './components/AudioPlayer';
import { RatingStars } from './components/RatingStars';
import type { Recording, User } from './types';
import { Headphones, AudioWaveform, Star, ChevronRight } from 'lucide-react';
import UserContext from "../../UserContext.tsx";
import { updateUserXPInFirestore } from "./IncreaseXP";
import { MyRatings } from './pages/MyRatings';

function SpeechRating() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState('');
  const { user } = useContext(UserContext);
  const [currentRating, setCurrentRating] = useState(0);
  const [showMyRatings, setShowMyRatings] = useState(false);
  const [hasJustRated, setHasJustRated] = useState(false);

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      if (!user?.email) return;
      
      try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setCurrentUserId(querySnapshot.docs[0].id);
        }
      } catch (error) {
        console.error('Error fetching current user ID:', error);
      }
    };

    fetchCurrentUserId();
  }, [user]);

  const findNextUnratedRecording = async (recordingsList: Recording[], startIndex = 0) => {
    for (let i = startIndex; i < recordingsList.length; i++) {
      const recording = recordingsList[i];
      
      if (recording.userId === currentUserId) {
        continue;
      }

      const ratingsRef = collection(db, 'ratings');
      const q = query(ratingsRef, 
        where('recordingId', '==', recording.userId),
        where('recordingCount', '==', recording.count),
        where('ratedBy', '==', user?.email)
      );
      
      try {
        const ratingSnapshot = await getDocs(q);
        console.log(`Checking recording ${recording.count} by ${recording.userId}:`, ratingSnapshot.empty ? 'Not rated' : 'Already rated');
        
        if (ratingSnapshot.empty) {
          const userRef = doc(db, 'users', recording.userId);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data() as User | undefined;
          
          return {
            ...recording,
            username: userData?.Username || 'Anonymous User',
            userEmail: userData?.email || ''
          };
        }
      } catch (error) {
        console.error('Error checking ratings:', error);
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!currentUserId) return;

      try {
        const storageRef = ref(storage);
        const result = await listAll(storageRef);
        
        const recordingsPromises = result.items.map(async (item) => {
          const [userId, count] = item.name.split('_');
          const url = await getDownloadURL(item);
          return {
            userId,
            count: parseInt(count),
            url
          };
        });

        const fetchedRecordings = (await Promise.all(recordingsPromises))
          .filter((recording): recording is Recording => recording !== null);
        
        console.log('Fetched recordings:', fetchedRecordings);
        setRecordings(fetchedRecordings);
        
        const firstUnrated = await findNextUnratedRecording(fetchedRecordings);
        console.log('First unrated recording:', firstUnrated);
        setCurrentRecording(firstUnrated);
      } catch (error) {
        console.error('Error fetching recordings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchRecordings();
    }
  }, [currentUserId]);

  const handleRate = async (userEmail: string, rating: number) => {
    if (!currentRecording || !user?.email) return;

    try {
      const ratingData = {
        recordingId: currentRecording.userId,
        recordingCount: currentRecording.count,
        rating: Number(rating),
        ratedBy: user.email,
        timestamp: Timestamp.now()
      };

      const ratingsRef = collection(db, 'ratings');
      await addDoc(ratingsRef, ratingData);

      await updateUserXPInFirestore(userEmail, rating * 10);
      setCurrentRating(rating);
      setHasJustRated(true);
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  const handleNextRecording = async () => {
    setHasJustRated(false);
    setCurrentRating(0);
    const currentIndex = recordings.findIndex(r => r.userId === currentRecording?.userId && r.count === currentRecording?.count);
    const nextRecording = await findNextUnratedRecording(recordings, currentIndex + 1);
    setCurrentRecording(nextRecording);
  };

  if (showMyRatings) {
    return (
      <div>
        <MyRatings />
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setShowMyRatings(false)}
            className="bg-[#2EC4B6] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#25A093] transition-colors flex items-center space-x-2"
          >
            <span>Back to Rating</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (!currentRecording) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
              <RatingStars 
                userEmail={currentRecording.userEmail} 
                rating={currentRating} 
                onRate={handleRate}
                disabled={currentRating > 0} 
              />
              
              {hasJustRated && (
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={() => setShowMyRatings(true)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <Star className="w-4 h-4" />
                    <span>View My Ratings</span>
                  </button>
                  <button
                    onClick={handleNextRecording}
                    className="bg-[#2EC4B6] text-white px-4 py-2 rounded-lg hover:bg-[#25A093] transition-colors flex items-center space-x-2"
                  >
                    <span>Rate Next Recording</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <p className="text-black text-sm">
            Rate recordings to see your own results
          </p>
        </div>
      </div>
    </div>
  );
}

export default SpeechRating;