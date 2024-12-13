import { useEffect, useState } from 'react';

const EMOJIS = ['🎉', '⭐', '🌟', '✨', '💫', '🎊'];

interface EmojiParticle {
  id: number;
  emoji: string;
  left: number;
  delay: number;
}

export default function EmojiCelebration() {
  const [particles, setParticles] = useState<EmojiParticle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="emoji-container inset-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="emoji-particle animate-float"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
}