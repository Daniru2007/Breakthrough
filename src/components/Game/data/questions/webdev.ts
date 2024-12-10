import { Question } from '../types';
import { QuestionCategory } from '../questionCategories';

export const webDevQuestions: Question[] = [
  {
    id: 11,
    text: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 1,
    level: 1,
    category: QuestionCategory.WebDev
  },
  {
    id: 12,
    text: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: 1,
    level: 3,
    category: QuestionCategory.WebDev
  },
  {
    id: 13,
    text: "What is the purpose of semantic HTML?",
    options: [
      "To make the code look prettier",
      "To improve website accessibility and SEO",
      "To add styling to elements",
      "To make the website load faster"
    ],
    correctAnswer: 1,
    level: 2,
    category: QuestionCategory.WebDev
  },
  {
    id: 14,
    text: "What is the virtual DOM in React?",
    options: [
      "A fake DOM that doesn't exist",
      "A lightweight copy of the real DOM",
      "A special browser feature",
      "A type of JavaScript function"
    ],
    correctAnswer: 1,
    level: 3,
    category: QuestionCategory.WebDev
  },
  {
    id: 15,
    text: "Which attribute is used to define inline styles in HTML?",
    options: ["class", "styles", "style", "css"],
    correctAnswer: 2,
    level: 1,
    category: QuestionCategory.WebDev
  }
];