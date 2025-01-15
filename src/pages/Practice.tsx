// @ts-nocheck
import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Dumbbell, Brain, Clock, Zap, Book } from 'lucide-react';
import './Practice.css';

const practiceTypes = [
  {
    icon: Brain,
    title: 'Mistake Analysis',
    description: 'Practice previous lessons',
    color: 'var(--primary-color)',
    link: './mistake'
  },
  {
    icon: Book,
    title: 'Summarize Tutorials',
    description: 'Summarize your past papers and tutorials',
    color: 'var(--secondary-color)',
    link: './summary'
  },
];

function Practice() {
  const navigate = useNavigate();
  return (
    <div className="practice-container">
      <h1>Practice Exercises</h1>
      <div className="practice-grid">
        {practiceTypes.map((type) => (
          <button
              onClick={() => {navigate(type.link)}}
            key={type.title}
            className="practice-card"
            style={{ backgroundColor: type.color }}
          >
            <type.icon className="practice-icon" size={32} />
            <h3 className="practice-title">{type.title}</h3>
            <p className="practice-description">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Practice;