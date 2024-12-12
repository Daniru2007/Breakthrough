
interface SpeakingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function SpeakingProgress({ currentStep, totalSteps }: SpeakingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}