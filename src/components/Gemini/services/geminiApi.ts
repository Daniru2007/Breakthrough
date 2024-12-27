import { GEMINI_API_KEY, GEMINI_API_URL } from '../config/constants';
import { EmotionData } from '../types';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export async function generateTutorialContent(
  topic: string,
  emotionData: EmotionData
): Promise<string> {
  const prompt = `
Create an educational tutorial about ${topic}. Don't Structure the content in a specific format:
but try to create unique structures for each api call and also whenever a user is more sad give him a larger and simple explaination whenever a user is more sad give him a small explanation since he already understood it correctly

Guidelines:
- Use clear, ${getEmotionalTone(emotionData)} language
- Include practical examples in each section
- Keep explanations concise but thorough
- Use bullet points for lists
- Format examples as: "Example: [your example here]"

Do not include any special formatting characters or markdown symbols in the output.
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

function getEmotionalTone(emotionData: EmotionData): string {
  const total = Object.values(emotionData).reduce((sum, val) => sum + val, 0);
  const sadRatio = emotionData.sad / total;
  const happyRatio = emotionData.happy / total;

  if (sadRatio > 0.3) {
    return 'supportive and encouraging';
  } else if (happyRatio > 0.3) {
    return 'make everything brief and small';
  }
  return 'clear and straightforward';
}