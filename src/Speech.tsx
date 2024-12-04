import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { QuestionCard } from './components/QuestionCard';
import { RecordingControls } from './components/RecordingControls';
import { NavigationControls } from './components/NavigationControls';
import { ProgressBar } from './components/ProgressBar';
import { Header } from './components/Header';
import { TipsCard } from './components/TipsCard';
import { Background } from './components/Background';
import { useRecording } from './hooks/useRecording';
import { Question } from './types';
import "./Speech.css";

const questions: Question[] = [
  {
    text: "Information comes from many sources, including the people around us, the media, and even our own thoughts. How do you decide which information is most important to focus on? Describe a time when you filtered out some sources of information to give other sources your full attention. Include details and examples in your answer.",
    timeLimit: 180,
  },
  {
    text: "Describe a significant challenge you've faced and how you overcame it. What did you learn from this experience?",
    timeLimit: 180,
  },
  {
    text: "What role does technology play in your daily life? How has it changed the way you learn, work, or communicate?",
    timeLimit: 180,
  },
];

function Speech() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const { recordingState, startRecording, stopRecording } = useRecording();

  const handleTimerComplete = () => {
    setIsTimerComplete(true);
    stopRecording();
  };

  const handleStartRecording = () => {
    setIsTimerComplete(false);
    startRecording();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsTimerComplete(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setIsTimerComplete(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Background />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Header />
          
          <ProgressBar 
            currentStep={currentQuestionIndex + 1} 
            totalSteps={questions.length} 
          />

          <div className="flex gap-8 items-start mt-8">
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <div className="text-center">
                  <Timer
                    duration={questions[currentQuestionIndex].timeLimit}
                    onComplete={handleTimerComplete}
                  />
                </div>

                <QuestionCard question={questions[currentQuestionIndex]} />

                <div className="flex flex-col items-center space-y-6">
                  <RecordingControls
                    isRecording={recordingState.isRecording}
                    onStartRecording={handleStartRecording}
                    onStopRecording={stopRecording}
                  />
                  
                  {recordingState.audioBlob && (
                    <div className="w-full max-w-md p-4 bg-gray-50 rounded-lg animate-fade-in">
                      <audio
                        controls
                        src={URL.createObjectURL(recordingState.audioBlob)}
                        className="w-full"
                      />
                    </div>
                  )}

                  {isTimerComplete && (
                    <p className="text-primary font-medium animate-fade-in">Time's up!</p>
                  )}
                </div>

                <NavigationControls
                  onNext={handleNext}
                  onBack={handleBack}
                  canGoBack={currentQuestionIndex > 0}
                  canGoNext={currentQuestionIndex < questions.length - 1}
                />
              </div>
            </div>
            
            <div className="w-80 sticky top-8">
              <TipsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speech;