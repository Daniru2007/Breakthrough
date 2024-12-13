import {Link, useNavigate} from 'react-router-dom';
import { Gamepad2, NotebookPen, AudioLines, CirclePlay, Lock, Book, Trophy } from 'lucide-react';
import './Learn.css';

const units = [
  {
    id: 1,
    title: 'Unit 1',
    description: 'Form basic sentences, greet people',
    color: '#58cc02',
    guide: './tute',
    isLocked: false,
    lessons: [
      { type: 'quiz', completed: true, link: "./quiz" },
      { type: 'speaking', completed: true, link: "./speaking" },
      { type: 'game', completed: true, link: "./game" },
    ],
  },
  {
    id: 2,
    title: 'Unit 2',
    description: 'Get around in a city',
    color: '#ce82ff',
    guide: './tute',
    isLocked: false,
    lessons: [
      { type: 'quiz', completed: true, link: "./quiz" },
      { type: 'speaking', completed: true, link: "./speaking" },
      { type: 'game', completed: true, link: "./game" },
    ],
  },
  {
    id: 3,
    title: 'Unit 3',
    description: 'Order food and drink',
    color: '#00cd9c',
    guide: './tute',
    isLocked: true,
    lessons: [
      { type: 'quiz', completed: false, link: "./quiz" },
      { type: 'speaking', completed: false, link: "./speaking" },
      { type: 'game', completed: false, link: "./game" },
    ],
  },
];

function Learn() {
  const navigate = useNavigate();
  
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'game': return <Gamepad2 />;
      case 'start': return <CirclePlay />;
      case 'quiz': return <NotebookPen />;
      case 'speaking': return <AudioLines />;
      default: return null;
    }
  };

  return (
    <div className="learn-container">
      <div className="learn-content">
        <div className="learning-path">
          {units.map((unit) => (
            <div key={unit.id} className="unit-section">
              <div className="unit-header" style={{ backgroundColor: unit.color }}>
                <div className="unit-info">
                  <h2>{unit.title}</h2>
                  <p>{unit.description}</p>
                </div>
                <button 
                  className="guidebook-btn" 
                  onClick={() => navigate(unit.guide)}
                >
                  <Book size={16} />
                  GUIDEBOOK
                </button>
              </div>

              <div className="lesson-path">
                {unit.lessons.map((lesson, index) => (
                  <Link 
                    to={unit.isLocked ? '#' : lesson.link} 
                    key={index} 
                    className="lesson-item"
                    onClick={(e) => unit.isLocked && e.preventDefault()}
                  >
                    <div className={`lesson-node ${lesson.completed ? 'completed' : ''} ${unit.isLocked ? 'locked' : ''}`}>
                      {getLessonIcon(lesson.type)}
                      {unit.isLocked && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                          <Lock size={14} />
                        </div>
                      )}
                    </div>
                    {index < unit.lessons.length - 1 && (
                      <div className={`lesson-connector ${lesson.completed ? 'completed' : ''}`} />
                    )}
                  </Link>
                ))}
              </div>

              {unit.id < units.length && (
                <button 
                  className="jump-btn" 
                  disabled={unit.isLocked}
                >
                  JUMP HERE?
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="progress-sidebar">
          <div className="progress-card">
            <h3>Unlock Leaderboards!</h3>
            <div className="unlock-info">
              <div className="unlock-icon">
                <Trophy size={24} />
              </div>
              <p>Complete 9 more lessons to start competing</p>
            </div>
          </div>

          <div className="progress-card">
            <div className="progress-header">
              <h3>XP Progress</h3>
              <button className="edit-goal-btn">EDIT GOAL</button>
            </div>
            <div className="daily-goal">
              <div className="goal-icon">📚</div>
              <div className="goal-info">
                <span>Daily Goal</span>
                <div className="goal-progress">
                  <div className="goal-bar">
                    <div className="goal-fill" style={{ width: '30%' }}></div>
                  </div>
                  <span>13/20 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learn;