import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnalysisSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  animationDelay: number;
}

export function AnalysisSection({ icon: Icon, title, children, animationDelay }: AnalysisSectionProps) {
  return (
    <div 
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-[#2ECB46] bg-opacity-10">
          <Icon className="w-6 h-6 text-[#2ECB46]" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}