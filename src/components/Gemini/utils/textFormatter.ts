import { EmotionData } from '../types';

export function cleanFormatting(text: string): string {
  return text
    // Remove markdown formatting
    .replace(/\*+/g, '')
    // Remove multiple spaces
    .replace(/\s{2,}/g, ' ')
    // Remove multiple newlines but preserve paragraph breaks
    .replace(/\n{3,}/g, '\n\n')
    // Remove any ### markers
    .replace(/###/g, '')
    // Ensure proper spacing after periods
    .replace(/\.(\S)/g, '. $1')
    .trim();
}

export function formatHeading(text: string): string {
  return text
    // Ensure proper spacing for numbered lists
    .replace(/(\d+\.)\s*([A-Z])/g, '$1 $2')
    // Add newlines before numbered items
    .replace(/(\d+\.)/g, '\n$1')
    .trim();
}