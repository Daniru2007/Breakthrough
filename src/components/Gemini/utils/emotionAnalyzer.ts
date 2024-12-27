import { EmotionData } from '../types';

export function analyzeEmotionalState(data: EmotionData): {
  dominantEmotion: keyof EmotionData;
  intensity: number;
} {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  const dominant = Object.entries(data).reduce((a, b) => 
    data[a[0] as keyof EmotionData] > data[b[0] as keyof EmotionData] ? a : b
  )[0] as keyof EmotionData;

  return {
    dominantEmotion: dominant,
    intensity: total > 0 ? data[dominant] / total : 0
  };
}