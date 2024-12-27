import { GeminiError } from './types';

export function handleGeminiError(error: unknown): Error {
  if (error instanceof Response) {
    return new Error(`API request failed: ${error.statusText}`);
  }

  if (typeof error === 'object' && error !== null) {
    const geminiError = error as GeminiError;
    if (geminiError.error?.message) {
      return new Error(`Gemini API error: ${geminiError.error.message}`);
    }
  }

  return error instanceof Error 
    ? error 
    : new Error('An unexpected error occurred while generating content');
}