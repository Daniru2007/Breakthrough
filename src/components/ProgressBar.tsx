import { X } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
  XP: number;
}

export default function ProgressBar({ current, total, XP }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="relative w-full mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-2">
          <X size={24} />
        </button>
        
        <div className="relative group">
          <div className="bg-brand text-green-500 text-sm px-4 py-1.5 rounded-full shadow-lg shadow-brand/20 transform group-hover:scale-110 transition-transform">
            Score: {XP}
          </div>
          <div className="absolute inset-0 bg-brand rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
        </div>
      </div>
      
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-transparent to-brand/20 animate-pulse opacity-50" />
        <div 
          className="h-full bg-brand transition-all duration-700 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </div>
  );
}