import { Question } from '../types/game';

interface QuestionModalProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export default function QuestionModal({ question, onAnswer }: QuestionModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full p-3 text-left rounded-lg bg-blue-50 hover:bg-blue-100 
                       transition-colors duration-200"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}