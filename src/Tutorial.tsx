import { useState, useCallback, useEffect } from 'react';
import type { EmotionData } from './types/emotion';
import { PopupOverlay } from './components/PopupOverlay';
import { Header } from './components/Tutorial/Header';
import { EmotionPanel } from './components/Tutorial/EmotionPanel';
import { ContentSection } from './components/Tutorial/ContentSection';
import { grammarSections } from './data/grammarSections';
import "./Tutorial.css";

function Tutorial() {
  const [emotions, setEmotions] = useState<EmotionData>({
    happy: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    neutral: 0,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleEmotionUpdate = useCallback((emotion: string) => {
    setEmotions(prev => ({
      ...prev,
      [emotion]: prev[emotion] + (1/60),
    }));
  }, []);

  useEffect(() => {
    const totalEmotionCount = Object.values(emotions).reduce((acc, val) => acc + val, 0);

    if (totalEmotionCount >= 2) {
      const negativeEmotions = emotions.sad + emotions.angry;
      const positiveEmotions = emotions.happy;
      const isNegativeDominant = negativeEmotions > positiveEmotions;

      if (isNegativeDominant) {
        setShowPopup(true);
      }

      setEmotions({
        happy: 0,
        sad: 0,
        angry: 0,
        surprised: 0,
        neutral: 0,
      });
    } else if (totalEmotionCount >= 0.3) {
      setShowPopup(false);
    }
  }, [emotions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <ContentSection sections={grammarSections} />
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <EmotionPanel 
              emotions={emotions}
              onEmotionUpdate={handleEmotionUpdate}
            />
          </div>
        </div>
      </main>

      <PopupOverlay 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}

export default Tutorial;