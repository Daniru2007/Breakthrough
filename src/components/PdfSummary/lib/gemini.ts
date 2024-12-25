import axios from 'axios';
import { AnalysisData } from '../types';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

function cleanJsonResponse(text: string): string {
  // Remove markdown code block markers and 'json' label
  let cleaned = text.replace(/```json\s*|\s*```/g, '');
  
  // If the text starts with a curly brace, assume it's already JSON
  if (cleaned.trim().startsWith('{')) {
    return cleaned;
  }
  
  // Otherwise, try to find the first occurrence of a curly brace
  const jsonStart = cleaned.indexOf('{');
  if (jsonStart !== -1) {
    cleaned = cleaned.slice(jsonStart);
  }
  
  return cleaned;
}

export async function analyzePaper(imageBase64: string): Promise<AnalysisData> {
  try {
    const response = await axios.post<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBCYrO6k4s2iLPNPQDklydVreIOar7clxI`,
      {
        contents: [{
          parts: [
            {
              text: "Analyze this paper and provide a response in this exact format (no markdown, no json tags, just a plain object): { summary: 'A clear summary broken into paragraphs', repeatedTopics: ['topic1', 'topic2'], recommendations: ['rec1', 'rec2'] }"
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: imageBase64
              }
            }
          ]
        }]
      }
    );

    const responseText = response.data.candidates[0].content.parts[0].text;
    const cleanedJson = cleanJsonResponse(responseText);

    try {
      const parsedResponse = JSON.parse(cleanedJson);
      return {
        summary: parsedResponse.summary || "No summary available",
        repeatedTopics: parsedResponse.repeatedTopics || [],
        studyRecommendations: parsedResponse.recommendations || []
      };
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      // If JSON parsing fails, create a structured response from the raw text
      return {
        summary: responseText,
        repeatedTopics: [],
        studyRecommendations: []
      };
    }
  } catch (error) {
    console.error('Error analyzing paper:', error);
    throw new Error('Failed to analyze the paper. Please try again.');
  }
}