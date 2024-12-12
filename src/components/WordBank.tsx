
interface WordBankProps {
  words: string[];
  selectedWords: string[];
  onWordClick: (word: string) => void;
}

export default function WordBank({ words, selectedWords, onWordClick }: WordBankProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-6">
      {words.map((word, index) => {
        const isSelected = selectedWords.includes(word);
        return (
          <button
            key={`${word}-${index}`}
            onClick={() => !isSelected && onWordClick(word)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${isSelected 
                ? 'bg-gray-100 text-gray-400 cursor-default' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            disabled={isSelected}
          >
            {word}
          </button>
        );
      })}
    </div>
  );
}