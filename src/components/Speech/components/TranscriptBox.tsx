
interface TranscriptBoxProps {
  transcript: string;
  fullStory: string;
}

export function TranscriptBox({ transcript, fullStory }: TranscriptBoxProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Story</h3>
        <div className="min-h-[100px] max-h-[200px] overflow-y-auto bg-gray-50 p-4 rounded-lg">
          {fullStory && (
            <p className="text-gray-700 whitespace-pre-wrap mb-4">{fullStory}</p>
          )}
          {transcript && (
            <p className="text-gray-500 italic whitespace-pre-wrap">{transcript}</p>
          )}
          {!fullStory && !transcript && (
            <p className="text-gray-400 italic">Start speaking to tell your story...</p>
          )}
        </div>
      </div>
    </div>
  );
}