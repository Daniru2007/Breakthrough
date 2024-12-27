import { useState, useEffect } from 'react';
import { Tutorial } from '../types';
import { getTutorialById } from '../services/tutorialService';

export function useTutorialContent(id: string | undefined) {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Tutorial ID is required');
      return;
    }

    const found = getTutorialById(id);
    if (found) {
      setTutorial(found);
      setError(null);
    } else {
      setError('Tutorial not found');
      setTutorial(null);
    }
  }, [id]);

  return { tutorial, error };
}