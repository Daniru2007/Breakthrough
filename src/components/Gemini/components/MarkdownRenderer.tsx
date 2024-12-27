import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-700">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4">{children}</blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 rounded px-2 py-1 text-sm">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto my-4">{children}</pre>
    ),
  };

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};