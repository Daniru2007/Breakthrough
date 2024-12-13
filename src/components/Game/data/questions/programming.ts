import { Question } from '../types';
import { QuestionCategory } from '../questionCategories';

export const programmingQuestions: Question[] = [
  {
    id: 1,
    text: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Stack", "Array", "Tree"],
    correctAnswer: 1,
    level: 1,
    category: QuestionCategory.Programming
  },
  {
    id: 2,
    text: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    level: 2,
    category: QuestionCategory.Programming
  },
  {
    id: 3,
    text: "What is recursion in programming?",
    options: [
      "A loop that runs forever",
      "A function that calls itself",
      "A type of variable",
      "A sorting algorithm"
    ],
    correctAnswer: 1,
    level: 1,
    category: QuestionCategory.Programming
  },
  {
    id: 4,
    text: "Which of these is not a primitive type in JavaScript?",
    options: ["string", "number", "array", "boolean"],
    correctAnswer: 2,
    level: 1,
    category: QuestionCategory.Programming
  },
  {
    id: 5,
    text: "What does DRY stand for in programming?",
    options: [
      "Don't Repeat Yourself",
      "Data Retrieval Yearly",
      "Document Ready Yesterday",
      "Debug Run Yield"
    ],
    correctAnswer: 0,
    level: 2,
    category: QuestionCategory.Programming
  }
];