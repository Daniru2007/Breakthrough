import { EmotionData } from '../../types';

export function getEmotionalTone(emotionData: EmotionData): string {
  const total = Object.values(emotionData).reduce((sum, val) => sum + val, 0);
  const sadRatio = emotionData.sad / total;
  const happyRatio = emotionData.happy / total;

  if (sadRatio > 0.3) {
    return 'supportive and encouraging';
  } else if (happyRatio > 0.3) {
    return 'enthusiastic and engaging';
  }
  return 'clear and straightforward';
}

export function createTutorialPrompt(topic: string, tone: string): string {
  return `
Create an educational tutorial about ${topic}. Structure the content in this specific format:

# ${topic}

Brief introduction explaining why ${topic} matters.

Key Concepts:
- List 2-3 main concepts
- Include clear examples
- Keep it practical

Common Usage:
- Show real-world applications
- Include everyday examples
- Highlight best practices

Tips and Tricks:
- Share practical advice
- Include common pitfalls to avoid
- Add helpful reminders

Examples:
- Include 2-3 concrete examples
- Make them relatable
- Show correct usage

Use ${tone} language throughout. Keep explanations clear and concise.
Format with clear sections and bullet points.
`;
}