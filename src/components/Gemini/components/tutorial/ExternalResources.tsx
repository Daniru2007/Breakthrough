import React from 'react';
import { motion } from 'framer-motion';
import { Link as LinkIcon } from 'lucide-react';
import { ExternalResource } from '../../types';

interface ExternalResourcesProps {
  resources: ExternalResource[];
}

export const ExternalResources: React.FC<ExternalResourcesProps> = ({ resources }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-12 bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6"
  >
    <div className="flex items-center gap-2 mb-6">
      <LinkIcon className="w-5 h-5 text-indigo-600" />
      <h2 className="text-xl font-semibold text-gray-800">Additional Resources</h2>
    </div>
    <div className="grid gap-4">
      {resources.map((resource, index) => (
        <a
          key={index}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-indigo-600 mb-1">
            {resource.title}
          </h3>
          <p className="text-sm text-gray-600">{resource.description}</p>
        </a>
      ))}
    </div>
  </motion.div>
);