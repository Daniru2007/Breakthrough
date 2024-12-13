import { Mic, Square } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function RecordingControls({
  isRecording,
  onStartRecording,
  onStopRecording,
}: RecordingControlsProps) {
  return (
    <div className="flex justify-center gap-4">
      {!isRecording ? (
        <button
          onClick={onStartRecording}
          className="bg-primary hover:bg-primary-dark text-white rounded-full p-6 transition-all duration-300 transform hover:scale-110 shadow-lg animate-pulse-slow"
        >
          <Mic size={32} />
        </button>
      ) : (
        <button
          onClick={onStopRecording}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-6 transition-all duration-300 transform hover:scale-110 shadow-lg"
        >
          <Square size={32} />
        </button>
      )}
    </div>
  );
}