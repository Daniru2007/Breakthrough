import { useState, useEffect } from 'react';
import { EmotionData } from '../types';
import { fetchEmotionData } from '../services/emotionService';

export function useEmotionData() {
  const [emotionData, setEmotionData] = useState<EmotionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmotionData = async () => {
      try {
        const data = await fetchEmotionData('mello@gmail.com');
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

  return { emotionData, loading, error };
}