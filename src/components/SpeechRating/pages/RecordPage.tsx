import React, { useState, useCallback, useEffect } from 'react';
import { Mic, StopCircle, Loader2, Upload } from 'lucide-react';
import { ref, listAll, uploadBytesResumable } from 'firebase/storage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { storage, db } from '../firebase';

export const RecordPage = () => {
  const userEmail = 'USER_EMAIL'; // Replace this with how you get the current user's email
  const [userId, setUserId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  // Fetch user ID from Firestore based on email
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // Get the first matching document's ID
          setUserId(querySnapshot.docs[0].id);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    if (userEmail) {
      fetchUserId();
    }
  }, [userEmail]);

  const getNextRecordingCount = useCallback(async () => {
    if (!userId) return 0;

    try {
      const storageRef = ref(storage);
      const result = await listAll(storageRef);
      
      // Filter recordings for current user and get the highest count
      const userRecordings = result.items
        .filter(item => item.name.startsWith(`${userId}_`))
        .map(item => {
          const count = parseInt(item.name.split('_')[1]);
          return isNaN(count) ? 0 : count;
        });

      const maxCount = userRecordings.length > 0 
        ? Math.max(...userRecordings)
        : -1;

      return maxCount + 1;
    } catch (error) {
      console.error('Error getting recording count:', error);
      return 0;
    }
  }, [userId]);

  const uploadRecording = async (blob: Blob) => {
    if (!userId) {
      console.error('No user ID available');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      const count = await getNextRecordingCount();
      const fileName = `${userId}_${count}.m4a`;
      const storageRef = ref(storage, fileName);
      
      const uploadTask = uploadBytesResumable(storageRef, blob);
      
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading recording:', error);
          setIsUploading(false);
          setUploadProgress(0);
        },
        () => {
          setIsUploading(false);
          setUploadProgress(100);
          setAudioBlob(null);
        }
      );
    } catch (error) {
      console.error('Error initiating upload:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const startRecording = async () => {
    if (!userId) {
      console.error('No user ID available');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setIsRecording(false);
        await uploadRecording(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setAudioBlob(null);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2EC4B6] to-[#208C82] flex items-center justify-center p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 text-[#2EC4B6] animate-spin" />
            <span className="text-gray-600">Loading user data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2EC4B6] to-[#208C82] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Voice Recording
            </h1>
            <p className="text-gray-600">
              Record your voice to share with the community
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            {/* Recording Button */}
            <div className="relative">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isUploading}
                className={`
                  w-32 h-32 rounded-full flex items-center justify-center
                  transition-all duration-300 relative
                  ${isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-[#2EC4B6] hover:bg-[#25A093]'}
                  ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
                  shadow-lg hover:shadow-xl
                `}
              >
                {isRecording ? (
                  <StopCircle className="w-16 h-16 text-white" />
                ) : (
                  <Mic className="w-16 h-16 text-white" />
                )}
              </button>
              
              {/* Recording Animation */}
              {isRecording && (
                <div className="absolute -inset-2">
                  <div className="w-full h-full rounded-full border-4 border-red-500 animate-ping" />
                </div>
              )}
            </div>

            {/* Status Text */}
            <div className="text-center">
              {isRecording && (
                <p className="text-red-500 font-semibold animate-pulse">
                  Recording in progress...
                </p>
              )}
              {isUploading && (
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 text-[#2EC4B6] animate-spin" />
                    <span className="text-gray-600">Uploading recording...</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#2EC4B6] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
              {!isRecording && !isUploading && audioBlob && (
                <p className="text-gray-600">
                  Recording complete! Uploading will start automatically.
                </p>
              )}
            </div>

            {/* Instructions */}
            {!isRecording && !isUploading && !audioBlob && (
              <div className="text-center text-gray-600 space-y-4">
                <p>Click the microphone button to start recording</p>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Upload className="w-4 h-4" />
                  <span>Your recording will be uploaded automatically</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recording Count */}
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <p className="text-white text-sm">
            Record one voice sample to see your results
          </p>
        </div>
      </div>
    </div>
  );
};