import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDs20KIFnXg158x4tGB1nRHAWix1G_ynZ0",
  authDomain: "lgbtq-bc67a.firebaseapp.com",
  projectId: "lgbtq-bc67a",
  storageBucket: "lgbtq-bc67a.firebasestorage.app",
  messagingSenderId: "412480579884",
  appId: "1:412480579884:web:67e733c6a6b43742496489",
  measurementId: "G-F2KVVHJ6W8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);