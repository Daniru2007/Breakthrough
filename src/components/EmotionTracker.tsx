// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import * as Human from '@vladmandic/human';
import type { EmotionDetectionProps } from '../types/emotion';
import { Camera, CameraOff } from 'lucide-react';

const EmotionTracker: React.FC<EmotionDetectionProps> = ({onEmotionUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const humanRef = useRef<Human.Human | null>(null);
  const detectionLoopRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const lastDetectionRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>('neutral');

  const requestCameraPermission = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: 'user',
          frameRate: { ideal: 10 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
        await initHuman();
      }
    } catch (err) {
      console.error('Camera permission error:', err);
      setError('Please allow camera access to detect emotions');
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  };

  const initHuman = async () => {
    try {
      if (!humanRef.current) {
        humanRef.current = new Human.Human({
          modelBasePath: 'https://cdn.jsdelivr.net/npm/@vladmandic/human/models',
          filter: { enabled: true, equalization: false },
          face: {
            enabled: true,
            detector: { rotation: true },
            emotion: { enabled: true },
            mobilenetv1: { enabled: true },
            insightface: { enabled: false },
            attention: { enabled: true },
            iris: { enabled: true },
            liveness: { enabled: true },
            description: { enabled: true },
            antispoof: { enabled: true },
          },
          body: { enabled: false },
          hand: { enabled: false },
          object: { enabled: false },
          gesture: { enabled: false },
          warmup: 'none',
        });

        await humanRef.current.load();
        await humanRef.current.warmup();
        startDetection();
      }
    } catch (err) {
      console.error('Human.js initialization error:', err);
      setError('Failed to initialize emotion detection');
      setIsLoading(false);
    }
  };

  const startDetection = () => {
    if (detectionLoopRef.current) return;

    const detectEmotion = async () => {
      if (!videoRef.current || !humanRef.current) return;

      const now = performance.now();
      if (now - lastDetectionRef.current < 500) {
        detectionLoopRef.current = requestAnimationFrame(detectEmotion);
        return;
      }

      try {
        const result = await humanRef.current.detect(videoRef.current);
        // console.log('Detection result:', result.face[0].emotion);

        if (result.face && result.face[0]?.emotion) {
          const emotions = result.face[0].emotion;
          // Find the emotion with the highest confidence
          let maxConfidence = 0;
          let dominantEmotion = 'neutral';

          Object.entries(emotions).forEach(([i, confidence]) => {
            const {score,emotion} = confidence;
            if (score > maxConfidence) {
              // console.log('Emotion:', emotion, 'Confidence:', confidence);
              maxConfidence = score;
              // Map the emotion names to our supported set
              switch (emotion) {
                case 'happy':
                  dominantEmotion = 'happy';
                  break;
                case 'sad':
                  dominantEmotion = 'sad';
                  break;
                case 'angry':
                  dominantEmotion = 'angry';
                  break;
                case 'surprise':
                  dominantEmotion = 'surprised';
                  break;
                default:
                  dominantEmotion = 'neutral';
              }
            }
          });

          setCurrentEmotion(dominantEmotion);
          onEmotionUpdate(dominantEmotion);
        }

        lastDetectionRef.current = now;
      } catch (err) {
        console.error('Detection error:', err);
      }

      detectionLoopRef.current = requestAnimationFrame(detectEmotion);
    };

    detectEmotion();
  };

  useEffect(() => {
    requestCameraPermission();

    return () => {
      if (detectionLoopRef.current) {
        cancelAnimationFrame(detectionLoopRef.current);
        detectionLoopRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'text-[#2ECB46]';
      case 'sad': return 'text-blue-500';
      case 'angry': return 'text-red-500';
      case 'surprised': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  if (!hasPermission && !isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center space-y-4">
          <CameraOff className="w-12 h-12 text-gray-400" />
          <p className="text-gray-600 text-center">Camera access is required for emotion detection</p>
          <button
            onClick={requestCameraPermission}
            className="px-4 py-2 bg-[#2ECB46] text-white rounded-md hover:bg-[#25A33B] transition-colors"
          >
            Enable Camera
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-4">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="flex flex-col items-center space-y-2">
            <Camera className="w-8 h-8 text-[#2ECB46] animate-pulse" />
            <p className="text-gray-600">Initializing camera...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
          <p className="text-red-600 text-sm p-4 text-center">{error}</p>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-48 rounded-lg shadow-lg object-cover"
        onLoadedData={() => setIsLoading(false)}
      />
      <div className="flex items-center justify-center space-x-2">
        <span className="text-gray-600">Current Emotion:</span>
        <span className={`font-semibold capitalize ${getEmotionColor(currentEmotion)}`}>
          {currentEmotion}
        </span>
      </div>
    </div>
  );
};

export default EmotionTracker;