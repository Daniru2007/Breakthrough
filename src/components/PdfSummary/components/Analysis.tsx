import React from 'react';
import { BookOpen, List, GraduationCap } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AnalysisSection } from './AnalysisSection';
import type { AnalysisData } from '../types';

interface AnalysisProps {
  loading: boolean;
  analysis: AnalysisData | null;
}

export function Analysis({ loading, analysis }: AnalysisProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-3xl p-8 shadow-lg">
            <Skeleton height={24} width={150} className="mb-4" />
            <Skeleton count={3} />
          </div>
        ))}
      </div>
    );
  }

  if (!analysis) return null;

  const sections = [
    {
      icon: BookOpen,
      title: "Summary",
      content: (
        <div className="prose prose-lg max-w-none">
          {analysis.summary.split('. ').map((sentence, index) => (
            <p key={index} className="text-gray-600 leading-relaxed mb-3">
              {sentence}.
            </p>
          ))}
        </div>
      )
    },
    {
      icon: List,
      title: "Key Topics",
      content: (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.repeatedTopics.map((topic, index) => (
            <li key={index} className="flex items-center gap-3 bg-[#2ECB46] bg-opacity-5 p-4 rounded-2xl">
              <span className="w-8 h-8 rounded-full bg-[#2ECB46] bg-opacity-10 flex items-center justify-center text-[#2ECB46] font-semibold shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-700 font-medium">{topic}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      icon: GraduationCap,
      title: "Study Plan",
      content: (
        <ul className="space-y-4">
          {analysis.studyRecommendations.map((rec, index) => { // Fixed property name
            return (
              <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#2ECB46] bg-opacity-10 flex items-center justify-center text-[#2ECB46] shrink-0">
                  ✓
                </div>
                <span className="text-gray-700">{rec}</span>
              </li>
            );
          })}
        </ul>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <AnalysisSection
          key={index}
          icon={section.icon}
          title={section.title}
          animationDelay={index * 100}
        >
          {section.content}
        </AnalysisSection>
      ))}
    </div>
  );
}