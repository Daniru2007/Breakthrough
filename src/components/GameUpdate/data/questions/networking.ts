import { Question } from '../types';
import { QuestionCategory } from '../questionCategories';

export const networkingQuestions: Question[] = [
  {
    id: 6,
    text: "Which protocol is used for secure web browsing?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correctAnswer: 2,
    level: 1,
    category: QuestionCategory.Networking
  },
  {
    id: 7,
    text: "What is the default port for HTTPS?",
    options: ["80", "443", "8080", "3000"],
    correctAnswer: 1,
    level: 2,
    category: QuestionCategory.Networking
  },
  {
    id: 8,
    text: "What does DNS stand for?",
    options: [
      "Domain Name System",
      "Dynamic Network Service",
      "Digital Network Security",
      "Data Network Storage"
    ],
    correctAnswer: 0,
    level: 1,
    category: QuestionCategory.Networking
  },
  {
    id: 9,
    text: "Which network protocol is connectionless?",
    options: ["TCP", "UDP", "HTTP", "FTP"],
    correctAnswer: 1,
    level: 2,
    category: QuestionCategory.Networking
  },
  {
    id: 10,
    text: "What is a subnet mask used for?",
    options: [
      "To hide IP addresses",
      "To divide networks into smaller networks",
      "To encrypt network traffic",
      "To block malicious websites"
    ],
    correctAnswer: 1,
    level: 3,
    category: QuestionCategory.Networking
  }
];