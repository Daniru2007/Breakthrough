import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmotionContext } from '../context/EmotionContext';
import { generateTutorialContent } from '../services/geminiApi';
import { useTutorialContent } from '../hooks/useTutorialContent';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import { BackButton } from '../components/BackButton';
import { TutorialRenderer } from '../components/TutorialRenderer';
import { EmotionDataBox } from '../components/EmotionDataBox';

export const TutorialContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [enhancedContent, setEnhancedContent] = useState<string>('');
  const { tutorial, error: tutorialError } = useTutorialContent(id);
  const { emotionData, loading: emotionLoading, error: emotionError } = useEmotionContext();
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(enhancedContent);
    const enhanceContent = async () => {
      if (!tutorial?.title || !emotionData) return;

      setIsEnhancing(true);
      setError(null);

      try {
        console.log('Generating content for:', tutorial.title);
        const enhanced = await generateTutorialContent(tutorial.title, emotionData);
        console.log('Generated content:', enhanced);
        
        if (!enhanced) {
          throw new Error('No content generated');
        }
        
        setEnhancedContent(enhanced);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to enhance content';
        console.error('Error enhancing content:', errorMessage);
        setError(errorMessage);
      } finally {
        setIsEnhancing(false);
      }
    };

    if (tutorial && emotionData) {
      enhanceContent();
    }
  }, [tutorial, emotionData]);

  if (tutorialError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <ErrorAlert
          title="Error Loading Tutorial"
          message={tutorialError}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <BackButton onClick={() => navigate(-1)} />
        
        {emotionData && <EmotionDataBox emotionData={emotionData} />}

        {(emotionLoading || isEnhancing) && (
          <LoadingSpinner 
            message={emotionLoading ? 'Loading emotion data...' : 'Enhancing content...'}
          />
        )}

        {(error || emotionError) && (
          <ErrorAlert
            title="Error"
            message={error || emotionError || 'Something went wrong'}
            subMessage="Showing original content instead."
          />
        )}

        {!isEnhancing && !emotionLoading && enhancedContent && (
          <>
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <TutorialRenderer 
                content={enhancedContent}
                tutorialType={tutorial?.id || ''}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};