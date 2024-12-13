import { BookOpen } from 'lucide-react';
import "./Header.css";

export function Header() {
  return (
    <header className="bg-[#2ECB46] text-white py-6 -mx-4 sm:mx-0 px-4" id="headbg">
      <div className="container flex flex-col items-start justify-items-start mx-auto">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white" id="head12">
            English Grammar Tutorial
          </h1>
        </div>
        <p className="mt-2 text-sm sm:text-base">
          Interactive Learning with Emotion Tracking
        </p>
      </div>
    </header>
  );
}