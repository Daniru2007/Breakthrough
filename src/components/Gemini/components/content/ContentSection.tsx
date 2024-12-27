import React from 'react';
import { motion } from 'framer-motion';
import { ContentSection as ContentSectionType } from '../../utils/contentProcessors/sectionParser';

interface ContentSectionProps {
  section: ContentSectionType;
}

export const ContentSection: React.FC<ContentSectionProps> = ({ section }) => {
  switch (section.type) {
    case 'heading':
      return (
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {section.content}
        </h1>
      );

    case 'subheading':
      return (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {section.content}
          </h2>
        </div>
      );

    case 'example':
      return (
        <div className="mb-6 pl-4 border-l-4 border-[#2ECB46]">
          <p className="text-gray-600 mb-2">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {section.examples?.map((example, i) => (
              <span
                key={i}
                className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-700"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      );

    case 'paragraph':
      return (
        <p className="text-gray-700 leading-relaxed mb-4">
          {section.content}
        </p>
      );

    default:
      return null;
  }
};