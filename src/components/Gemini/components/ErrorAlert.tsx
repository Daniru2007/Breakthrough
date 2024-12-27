import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  title: string;
  message: string;
  subMessage?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, message, subMessage }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 flex items-start">
    <AlertCircle className="w-5 h-5 text-yellow-700 mr-2 flex-shrink-0 mt-0.5" />
    <div>
      <p className="text-yellow-700 font-medium">{title}</p>
      <p className="text-yellow-600 text-sm mt-1">{message}</p>
      {subMessage && <p className="text-yellow-600 text-sm mt-2">{subMessage}</p>}
    </div>
  </div>
);