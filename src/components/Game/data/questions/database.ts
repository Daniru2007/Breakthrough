import { Question } from '../types';
import { QuestionCategory } from '../questionCategories';

export const databaseQuestions: Question[] = [
  {
    id: 21,
    text: "What type of database is MongoDB?",
    options: ["SQL", "NoSQL", "Graph", "Time Series"],
    correctAnswer: 1,
    level: 3,
    category: QuestionCategory.Database
  },
  {
    id: 22,
    text: "Which SQL command is used to combine rows from two or more tables?",
    options: ["COMBINE", "MERGE", "JOIN", "UNION"],
    correctAnswer: 2,
    level: 4,
    category: QuestionCategory.Database
  },
  {
    id: 23,
    text: "What is a primary key in a database?",
    options: [
      "The first column in a table",
      "A unique identifier for each record",
      "The most important data in a table",
      "A password for database access"
    ],
    correctAnswer: 1,
    level: 3,
    category: QuestionCategory.Database
  },
  {
    id: 24,
    text: "What does ACID stand for in database transactions?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Asynchronous, Concurrent, Indexed, Distributed",
      "Access, Control, Identity, Data",
      "Automated, Continuous, Integrated, Development"
    ],
    correctAnswer: 0,
    level: 5,
    category: QuestionCategory.Database
  },
  {
    id: 25,
    text: "Which type of SQL join returns all matching records from both tables?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN"],
    correctAnswer: 2,
    level: 4,
    category: QuestionCategory.Database
  }
];