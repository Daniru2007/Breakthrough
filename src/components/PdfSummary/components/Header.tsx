import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-12 animate-scale-in">
      <div className="inline-flex items-center gap-3 mb-6 bg-white p-2 pr-6 rounded-full shadow-md">
        <div className="w-12 h-12 rounded-full bg-[#2ECB46] bg-opacity-10 flex items-center justify-center">
          <Brain className="w-6 h-6 text-[#2ECB46]" />
        </div>
        <span className="text-xl font-bold text-gray-800">Paper Analysis AI</span>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
        Analyze Your Papers
        <Sparkles className="w-8 h-8 text-[#2ECB46] animate-float" />
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Upload your paper and get instant insights on key topics and personalized study recommendations
      </p>
    </div>
  );
}