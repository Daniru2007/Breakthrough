import { Book } from 'lucide-react';
import './UnitCard.css';

interface UnitCardProps {
  title: string;
  description: string;
  color: string;
  isLocked?: boolean;
}

export default function UnitCard({ title, description, color, isLocked = false }: UnitCardProps) {
  return (
    <div className="unit-card" style={{ backgroundColor: color }}>
      <div className="unit-card-content">
        <div className="unit-info">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="unit-icon">
          <Book color="white" size={20} />
        </div>
      </div>
      {isLocked && (
        <div className="locked-overlay">
          <div className="lock-icon">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              color="var(--gray-500)"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}