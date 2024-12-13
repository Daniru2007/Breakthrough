// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';

export function useSpeechToText() {
  const [transcript, setTranscript] = useState('');
  const [fullStory, setFullStory] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setFullStory(prev => prev + ' ' + finalTranscript.trim());
          }
          setTranscript(interimTranscript);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };

        setRecognition(recognition);
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      // Add any remaining transcript to the full story
      setFullStory(prev => prev + ' ' + transcript.trim());
      setTranscript('');
    }
  }, [recognition, transcript]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setFullStory('');
  }, []);

  return {
    transcript,
    fullStory: fullStory.trim(),
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  };
}