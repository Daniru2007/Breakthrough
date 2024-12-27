import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TutorialList } from './components/Gemini/pages/TutorialList';
import { TutorialContent } from './components/Gemini/pages/TutorialContent';
import { EmotionProvider } from './components/Gemini/context/EmotionContext';

export default function Gemini() {
  return (
    <EmotionProvider>
        <Routes>
          <Route path="/" element={<TutorialList />} />
          <Route path="./:id" element={<TutorialContent />} />
        </Routes>
    </EmotionProvider>
  );
}