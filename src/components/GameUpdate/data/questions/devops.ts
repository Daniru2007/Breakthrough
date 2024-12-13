import { Question } from '../types';
import { QuestionCategory } from '../questionCategories';

export const devOpsQuestions: Question[] = [
  {
    id: 16,
    text: "What tool is used for container orchestration?",
    options: ["Docker", "Kubernetes", "Jenkins", "Git"],
    correctAnswer: 1,
    level: 4,
    category: QuestionCategory.DevOps
  },
  {
    id: 17,
    text: "Which AWS service is used for serverless computing?",
    options: ["EC2", "Lambda", "S3", "RDS"],
    correctAnswer: 1,
    level: 5,
    category: QuestionCategory.DevOps
  },
  {
    id: 18,
    text: "What is the purpose of CI/CD?",
    options: [
      "To write better code",
      "To automate the deployment process",
      "To manage databases",
      "To design user interfaces"
    ],
    correctAnswer: 1,
    level: 4,
    category: QuestionCategory.DevOps
  },
  {
    id: 19,
    text: "What does Docker containerize?",
    options: [
      "Hardware",
      "Operating Systems",
      "Applications and dependencies",
      "Network protocols"
    ],
    correctAnswer: 2,
    level: 4,
    category: QuestionCategory.DevOps
  },
  {
    id: 20,
    text: "What is Infrastructure as Code (IaC)?",
    options: [
      "Writing code in the cloud",
      "Managing infrastructure through code",
      "Code documentation",
      "Programming infrastructure hardware"
    ],
    correctAnswer: 1,
    level: 5,
    category: QuestionCategory.DevOps
  }
];