
interface AudioPlayerProps {
  audioBlob: Blob;
}

export function AudioPlayer({ audioBlob }: AudioPlayerProps) {
  return (
    <div className="w-full max-w-md p-4 bg-gray-50 rounded-lg animate-fade-in">
      <audio
        controls
        src={URL.createObjectURL(audioBlob)}
        className="w-full"
      />
    </div>
  );
}