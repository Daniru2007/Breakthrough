// @ts-nocheck
import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import questionsData from './data/questions.json';
import "./Lessons.css";

function Lessons() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [XP, setXP] = useState(0);

  const question = questionsData.questions[currentQuestion];

  const handleSelectAnswer = (answer: string) => {
    // if (selectedAnswer) return;
    setSelectedAnswer(answer);

    if (answer === question.correctAnswer) {
      setXP(prev => prev + 10);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestion(prev => 
      prev < questionsData.questions.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <ProgressBar 
          current={currentQuestion + 1} 
          total={questionsData.questions.length}
          XP={XP}
        />

        <QuestionCard
          prompt={question.prompt}
          options={question.options}
          selectedAnswer={selectedAnswer}
          correctAnswer={question.correctAnswer}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    </div>
  );
}

export default Lessons;