import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  url: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const time = (percentage / 100) * audio.duration;
    
    audio.currentTime = time;
    setProgress(percentage);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-[#2EC4B6] text-white hover:bg-opacity-90 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <div 
          className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden"
          onClick={handleProgressClick}
        >
          <div 
            className="absolute h-full bg-[#2EC4B6] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isMuted ? 
            <VolumeX className="text-gray-500" size={20} /> : 
            <Volume2 className="text-gray-500" size={20} />
          }
        </button>
      </div>

      <audio
        ref={audioRef}
        src={url}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />
    </div>
  );
};