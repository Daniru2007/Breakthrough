export type SubjectType = 'Mathematics' | 'English' | 'ICT';

export interface SubjectMistake {
  date: string;
  count: number;
  subject: SubjectType;
}

export interface SubjectStats {
  totalMistakes: number;
  improvementRate: number;
  commonCategory: string;
}