import { Question } from './types';
import { programmingQuestions } from './questions/programming';
import { networkingQuestions } from './questions/networking';
import { webDevQuestions } from './questions/webdev';
import { devOpsQuestions } from './questions/devops';
import { databaseQuestions } from './questions/database';

export type { Question };

export const questions: Question[] = [
  ...programmingQuestions,
  ...networkingQuestions,
  ...webDevQuestions,
  ...devOpsQuestions,
  ...databaseQuestions,
].sort((a, b) => a.level - b.level);