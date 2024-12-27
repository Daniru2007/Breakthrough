import { GEMINI_API_KEY, GEMINI_API_URL } from '../../config/constants';
import { EmotionData } from '../../types';
import { calculateContentStrategy } from '../../utils/contentAdapter';
import { buildPrompt } from './promptBuilder';
import { GeminiResponse } from './types';
import { handleGeminiError } from './errorHandler';

export async function generateTutorialContent(
  topic: string,
  emotionData: EmotionData
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const strategy = calculateContentStrategy(emotionData);
    const prompt = buildPrompt(topic, strategy);

    console.log('Sending prompt to Gemini:', prompt);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 1.0, // Increased for more creative/natural responses
          topK: 40,
          topP: 0.95,
          maxOutputTokens: Math.max(strategy.wordCount * 4, 1000), // Ensure enough tokens for word count
          stopSequences: [
            "Key Concepts:",
            "Practical Usage:",
            "Common Mistakes:",
            "Practice Tips:"
          ]
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_DEROGATORY",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const content = data.candidates[0].content.parts[0].text;
    console.log('Generated content length:', content.split(' ').length, 'words');
    
    return content;
  } catch (error) {
    throw handleGeminiError(error);
  }
}