import React from 'react';
import { SubjectGraphsContainer } from './components/Mistake/components/graphs/SubjectGraphsContainer';
import { MistakeList } from './components/Mistake/components/MistakeList';
import { Stats } from './components/Mistake/components/Stats';
import { BookOpen } from 'lucide-react';
import { SubjectMistake, SubjectType } from './components/Mistake/types/subject';
import "./Mistake.css"

// Mock data for subject-wise mistakes
const mockMistakesBySubject: Record<SubjectType, SubjectMistake[]> = {
  Mathematics: [
    { date: '2024-03-01', count: 5, subject: 'Mathematics' },
    { date: '2024-03-02', count: 3, subject: 'Mathematics' },
    { date: '2024-03-03', count: 7, subject: 'Mathematics' },
    { date: '2024-03-04', count: 2, subject: 'Mathematics' },
    { date: '2024-03-05', count: 4, subject: 'Mathematics' },
  ],
  English: [
    { date: '2024-03-01', count: 3, subject: 'English' },
    { date: '2024-03-02', count: 4, subject: 'English' },
    { date: '2024-03-03', count: 2, subject: 'English' },
    { date: '2024-03-04', count: 5, subject: 'English' },
    { date: '2024-03-05', count: 1, subject: 'English' },
  ],
  ICT: [
    { date: '2024-03-01', count: 2, subject: 'ICT' },
    { date: '2024-03-02', count: 1, subject: 'ICT' },
    { date: '2024-03-03', count: 4, subject: 'ICT' },
    { date: '2024-03-04', count: 3, subject: 'ICT' },
    { date: '2024-03-05', count: 2, subject: 'ICT' },
  ],
};

const mockMistakes = [
  {
    id: '1',
    studentId: 'ST001',
    subject: 'Mathematics',
    description: 'Incorrect application of quadratic formula',
    date: '2024-03-07',
    category: 'Algebra',
  },
  {
    id: '2',
    studentId: 'ST001',
    subject: 'English',
    description: 'Incorrect use of past participle',
    date: '2024-03-06',
    category: 'Grammar',
  },
  {
    id: '3',
    studentId: 'ST001',
    subject: 'ICT',
    description: 'Wrong HTML tag structure',
    date: '2024-03-05',
    category: 'Web Development',
  },
];

function Mistake() {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-[#2EC4B6] text-white py-6" style={{maxHeight:"300px", margin:"-100px", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div className="container  px-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-2xl font-bold" style={{marginBottom:"00px"}} id="learn">Learning Progress Tracker</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Stats Section */}
          <Stats
            totalMistakes={15}
            improvementRate={24}
            commonCategory="Algebra"
            streakDays={7}
          />

          {/* Subject Graphs Section */}
          <SubjectGraphsContainer mistakesBySubject={mockMistakesBySubject} />

          {/* Recent Mistakes List */}
          <MistakeList mistakes={mockMistakes} />
        </div>
      </main>
    </div>
  );
}

export default Mistake;