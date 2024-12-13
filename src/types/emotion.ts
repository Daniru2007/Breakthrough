export interface EmotionData {
  happy: number;
  sad: number;
  angry: number;
  surprised: number;
  neutral: number;
}

export interface EmotionDetectionProps {
  onEmotionUpdate: (emotion: string) => void;
}