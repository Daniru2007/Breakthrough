import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SpeakingNavigationProps {
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

export function SpeakingNavigation({
  onNext,
  onBack,
  canGoBack,
  canGoNext,
}: SpeakingNavigationProps) {
  return (
    <div className="flex justify-between w-full max-w-2xl mt-8">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300
          ${canGoBack 
            ? 'bg-white text-primary hover:bg-primary hover:text-white' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300
          ${canGoNext 
            ? 'bg-primary text-white hover:bg-primary-dark' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
      >
        Next
        <ArrowRight size={20} />
      </button>
    </div>
  );
}