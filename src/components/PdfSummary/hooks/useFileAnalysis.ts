import { useState } from 'react';
import { analyzePaper } from '../lib/gemini';
import { AnalysisData } from '../types';

export function useFileAnalysis() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        try {
          const base64String = (reader.result as string).split(',')[1];
          const result = await analyzePaper(base64String);
          
          setAnalysis({
            summary: result.summary,
            repeatedTopics: result.repeatedTopics,
            studyRecommendations: result.studyRecommendations // Fixed property name
          });
        } catch (error) {
          setError('Failed to analyze the paper. Please try again.');
          console.error('Error processing result:', error);
        }
      };

      reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
      };
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error processing file:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    analysis,
    error,
    handleFileSelect
  };
}