import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface TutorialRendererProps {
  content: string;
  tutorialType: string;
}

export const TutorialRenderer: React.FC<TutorialRendererProps> = ({ 
  content,
  tutorialType 
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  );
};