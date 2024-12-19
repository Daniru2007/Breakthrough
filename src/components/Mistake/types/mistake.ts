export interface Mistake {
  id: string;
  studentId: string;
  subject: string;
  description: string;
  date: string;
  category: string;
}

export interface MistakesByDay {
  date: string;
  count: number;
}