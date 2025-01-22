import {
  Calculator, 
  Monitor, 
  Languages, 
  Music, 
  Globe2, 

  BookOpen 
} from 'lucide-react';

interface SubjectButtonProps {
  subject: string;
  description: string;
}

const iconMap = {
  MATHEMATICS: Calculator,
  ICT: Monitor,
  GERMAN: Languages,
  ITALIAN: Languages,
  PORTUGUESE: Globe2,
  DUTCH: BookOpen,
  JAPANESE: Music,
};

export function SubjectButton({ subject, description }: SubjectButtonProps) {
  const Icon = iconMap[subject as keyof typeof iconMap];
  
  return (
    <button className="subject-button">
      <div className="subject-content">
        <Icon size={24} />
        <span className="subject-title">{subject}</span>
        <p className="subject-description">{description}</p>
      </div>
    </button>
  );
}