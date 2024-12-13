import EmotionTracker from '../EmotionTracker';
import EmotionStats from '../EmotionStats';
import type { EmotionData } from '../../types/emotion';

interface EmotionPanelProps {
  emotions: EmotionData;
  onEmotionUpdate: (emotion: string) => void;
}

export function EmotionPanel({ emotions, onEmotionUpdate }: EmotionPanelProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Emotion Tracker</h2>
        <EmotionTracker onEmotionUpdate={onEmotionUpdate} />
      </div>
      <EmotionStats emotions={emotions} />
    </div>
  );
}