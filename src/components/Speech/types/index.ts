// @ts-nocheck
export interface Question {
  text: string;
  timeLimit: number;
}

export interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export interface RecordingState {
  isRecording: boolean;
  audioBlob: Blob | null;
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}