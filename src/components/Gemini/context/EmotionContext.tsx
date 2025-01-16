import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { EmotionData } from '../types';
import { fetchEmotionData } from '../services/emotionService';
import UserContext from "../../../UserContext.tsx";

interface EmotionContextType {
  emotionData: EmotionData | null;
  loading: boolean;
  error: string | null;
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export function EmotionProvider({ children }: { children: ReactNode }) {
  const [emotionData, setEmotionData] = useState<EmotionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {user,setUser} = useContext(UserContext);

  useEffect(() => {
    const loadEmotionData = async () => {
      try {
        const data = await fetchEmotionData(user.email);
        setEmotionData(data);
      } catch (err) {
        setError('Failed to fetch emotion data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEmotionData();
  }, []);

  return (
    <EmotionContext.Provider value={{ emotionData, loading, error }}>
      {children}
    </EmotionContext.Provider>
  );
}

export function useEmotionContext() {
  const context = useContext(EmotionContext);
  if (context === undefined) {
    throw new Error('useEmotionContext must be used within an EmotionProvider');
  }
  return context;
}