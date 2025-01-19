import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  userEmail: string;
  rating: number;
  onRate: (rating: number) => void;
  disabled?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ userEmail, rating, onRate, disabled = false }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !disabled && onRate(userEmail, star)}
          disabled={disabled}
          className={`transition-colors ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:text-[#2EC4B6]'}`}
        >
          <Star
            size={24}
            className={star <= rating ? 'fill-[#2EC4B6] text-[#2EC4B6]' : 'text-gray-300'}
          />
        </button>
      ))}
    </div>
  );
};