import { SpeakingCountdown } from './SpeakingCountdown';
import { SpeakingPrompt } from './SpeakingPrompt';
import { SpeakingRecorder } from './SpeakingRecorder';
import { SpeakingNavigation } from './SpeakingNavigation';
import { TranscriptBox } from './TranscriptBox';
import { Question } from '../types';
import { AudioPlayer } from './AudioPlayer';

interface SpeakingContainerProps {
  question: Question;
  isTimerComplete: boolean;
  recordingState: {
    isRecording: boolean;
    audioBlob: Blob | null;
  };
  transcript: string;
  fullStory: string;
  onTimerComplete: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

export function SpeakingContainer({
  question,
  isTimerComplete,
  recordingState,
  transcript,
  fullStory,
  onTimerComplete,
  onStartRecording,
  onStopRecording,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
}: SpeakingContainerProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
      <div className="text-center">
        <SpeakingCountdown
          duration={question.timeLimit}
          onComplete={onTimerComplete}
        />
      </div>

      <SpeakingPrompt question={question} />

      <div className="flex flex-col items-center space-y-6">
        <SpeakingRecorder
          isRecording={recordingState.isRecording}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
        />
        
        <TranscriptBox transcript={transcript} fullStory={fullStory} />

        {recordingState.audioBlob && (
          <AudioPlayer audioBlob={recordingState.audioBlob} />
        )}

        {isTimerComplete && (
          <p className="text-primary font-medium animate-fade-in">Time's up!</p>
        )}
      </div>

      <SpeakingNavigation
        onNext={onNext}
        onBack={onBack}
        canGoBack={canGoBack}
        canGoNext={canGoNext}
      />
    </div>
  );
}