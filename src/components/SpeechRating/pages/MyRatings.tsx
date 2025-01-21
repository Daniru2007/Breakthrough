import React, { useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import UserContext from '../../../UserContext.tsx';
import { Star, AlertCircle } from 'lucide-react';

interface Rating {
  rating: number;
  timestamp: any;
}

interface RecordingRatings {
  count: number;
  url: string;
  ratings: Rating[];
  averageRating: number;
}

export const MyRatings = () => {
  const { user } = useContext(UserContext);
  const [recordings, setRecordings] = useState<RecordingRatings[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // First get the user's ID
  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.email) return;
      
      try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setUserId(querySnapshot.docs[0].id);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, [user]);

  // Then fetch the recordings using the user ID
  useEffect(() => {
    const fetchUserRatings = async () => {
      if (!userId) return;

      try {
        console.log('Current user ID:', userId);
        
        const storageRef = ref(storage);
        const result = await listAll(storageRef);
        
        console.log('All storage items:', result.items.map(item => item.name));
        
        const userRecordingRefs = result.items
          .filter(item => {
            const [recordingUserId] = item.name.split('_');
            console.log('Comparing:', recordingUserId, userId);
            return recordingUserId === userId;
          });

        console.log('Filtered user recordings:', userRecordingRefs.map(ref => ref.name));

        if (userRecordingRefs.length === 0) {
          console.log('No recordings found for user');
          setLoading(false);
          return;
        }

        // Get URLs and prepare recordings data
        const recordingsData = await Promise.all(
          userRecordingRefs.map(async (ref) => {
            const count = parseInt(ref.name.split('_')[1]);
            const url = await getDownloadURL(ref);
            return { count, url, ratings: [], averageRating: 0 };
          })
        );

        console.log('Recordings data:', recordingsData);

        // Fetch ratings for each recording
        const ratingsRef = collection(db, 'ratings');
        const ratingsPromises = recordingsData.map(async (recording) => {
          const q = query(
            ratingsRef,
            where('recordingId', '==', userId),
            where('recordingCount', '==', recording.count)
          );
          const snapshot = await getDocs(q);
          const ratings = snapshot.docs.map(doc => ({
            rating: doc.data().rating,
            timestamp: doc.data().timestamp
          }));

          const averageRating = ratings.length > 0
            ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
            : 0;

          return {
            ...recording,
            ratings,
            averageRating
          };
        });

        const recordingsWithRatings = await Promise.all(ratingsPromises);
        console.log('Final recordings with ratings:', recordingsWithRatings);
        setRecordings(recordingsWithRatings);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserRatings();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2EC4B6] border-t-transparent"></div>
      </div>
    );
  }

  if (recordings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-[#2EC4B6] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Recordings Found</h2>
          <p className="text-gray-600">
            You haven't uploaded any recordings yet. Record your voice first to receive ratings from the community.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            My Recording Ratings
          </h1>
          
          <div className="space-y-6">
            {recordings.map((recording) => (
              <div 
                key={recording.count}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Recording #{recording.count}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className={`w-5 h-5 ${recording.averageRating > 0 ? 'text-[#2EC4B6] fill-[#2EC4B6]' : 'text-gray-300'}`} />
                    <span className="text-lg font-medium">
                      {recording.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <audio
                    className="w-full"
                    controls
                    src={recording.url}
                  />
                  
                  <div className="space-y-2">
                    {recording.ratings.length > 0 ? (
                      recording.ratings.map((rating, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between text-sm text-gray-600"
                        >
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-[#2EC4B6] fill-[#2EC4B6]" />
                            <span>{rating.rating}</span>
                          </div>
                          <span>
                            {new Date(rating.timestamp.seconds * 1000).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-2">
                        No ratings yet - Share this recording to get feedback from the community!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};