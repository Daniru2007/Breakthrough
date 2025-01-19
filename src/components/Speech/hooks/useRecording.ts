import {useState, useCallback, useEffect, useContext} from 'react';
import { getStorage } from 'firebase/storage';
import { RecordingState } from '../types';
import {
  collection,
  query,
  getDocs,
  where, getFirestore
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase.tsx';
import UserContext from "../../../UserContext.tsx";
import {listAll, ref, uploadBytesResumable} from "firebase/storage";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export function useRecording() {
  const {user} = useContext(UserContext);
  const [userId ,setUserId] = useState("");
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [audioBlob, setAudioBlob] = useState(null)


  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Get the first matching document's ID
          console.log("from effect", querySnapshot.docs[0].id)
          setUserId(querySnapshot.docs[0].id);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    if (user.email) {
      fetchUserId();
    }
  }, [user, audioBlob]);


  const getNextRecordingCount = useCallback(async () => {
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
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const count = await getNextRecordingCount();
      console.log(userId);
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



  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    audioBlob: null,
  });
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/x-m4a' });
        uploadRecording(blob);
        setRecordingState({ isRecording: false, audioBlob: blob });
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecordingState({ isRecording: true, audioBlob: null });
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, [uploadRecording]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
  }, [mediaRecorder]);

  return {
    recordingState,
    startRecording,
    stopRecording,
  };
}