import { QuestionCategory } from './questionCategories';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  level: number;
  category: QuestionCategory;
}