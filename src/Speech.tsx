import { useState } from 'react';
import { SpeakingProgress } from './components/Speech/components/SpeakingProgress';
import { SpeakingHeader } from './components/Speech/components/SpeakingHeader';
import { SpeakingTips } from './components/Speech/components/SpeakingTips';
import { SpeakingBackground } from './components/Speech/components/SpeakingBackground';
import { SpeakingContainer } from './components/Speech/components/SpeakingContainer';
import { useRecording } from './components/Speech/hooks/useRecording';
import { useSpeechToText } from './components/Speech/hooks/useSpeechToText';
import { questions } from './components/Speech/utils/questions';

function Speech() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const { recordingState, startRecording, stopRecording } = useRecording();
  const { transcript, fullStory, startListening, stopListening, resetTranscript } = useSpeechToText();

  const handleTimerComplete = () => {
    setIsTimerComplete(true);
    stopRecording();
    stopListening();
  };

  const handleStartRecording = () => {
    setIsTimerComplete(false);
    startRecording();
    startListening();
  };

  const handleStopRecording = () => {
    stopRecording();
    stopListening();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsTimerComplete(false);
      resetTranscript();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setIsTimerComplete(false);
      resetTranscript();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <SpeakingBackground />

      <div className="speech-container">
        <div className="max-w-4xl mx-auto">
          <SpeakingHeader />

          <SpeakingProgress
            currentStep={currentQuestionIndex + 1}
            totalSteps={questions.length}
          />

          <div className="speech-content">
            <div className="flex-1">
              <SpeakingContainer
                question={questions[currentQuestionIndex]}
                isTimerComplete={isTimerComplete}
                recordingState={recordingState}
                transcript={transcript}
                fullStory={fullStory}
                onTimerComplete={handleTimerComplete}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                onNext={handleNext}
                onBack={handleBack}
                canGoBack={currentQuestionIndex > 0}
                canGoNext={currentQuestionIndex < questions.length - 1}
              />
            </div>

            <div className="speech-sidebar">
              <SpeakingTips />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speech;