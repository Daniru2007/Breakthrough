import { Tutorial } from '../types';
import tutorials from '../data/tutorials.json';

export function getTutorialById(id: string): Tutorial | undefined {
  return tutorials.tutorials.find(t => t.id === id);
}

export function getAllTutorials(): Tutorial[] {
  return tutorials.tutorials;
}