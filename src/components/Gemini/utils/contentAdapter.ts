export function calculateContentStrategy(emotionData: EmotionData): ContentStrategy {
  const total = Object.values(emotionData).reduce((sum, val) => sum + val, 0);
  const sadRatio = (emotionData.sad + emotionData.angry) / total;
  const happyRatio = emotionData.happy / total;

  // Base configuration
  const strategy: ContentStrategy = {
    complexity: 'moderate',
    tone: 'neutral',
    structure: 'conceptual',
    verbosity: 'moderate',
    wordCount: 1000,
    supportLevel: 'standard'
  };

  // Higher sad/angry emotions - provide more detailed, supportive content
  if (sadRatio > 0.3) {
    return {
      ...strategy,
      complexity: 'simple',
      tone: 'supportive',
      structure: 'step-by-step',
      verbosity: 'detailed',
      wordCount: 3000,
      supportLevel: 'high'
    };
  }

  // Very happy - can handle more advanced content
  if (happyRatio > 0.3) {
    return {
      ...strategy,
      complexity: 'detailed',
      tone: 'encouraging',
      structure: 'conceptual',
      verbosity: 'moderate',
      wordCount: 2000,
      supportLevel: 'standard'
    };
  }

  // Neutral state - balanced approach
  return {
    ...strategy,
    wordCount: 1500,
    supportLevel: 'moderate'
  };
}