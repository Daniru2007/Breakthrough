import React from 'react';
import { Brain, Book } from 'lucide-react';
import {useNavigate} from "react-router-dom";

const practiceTypes = [
  {
    icon: Brain,
    title: 'Mistake Analysis',
    description: 'Practice previous lessons',
    link: './mistake'
  },
  {
    icon: Book,
    title: 'Summarize Tutorials',
    description: 'Summarize your past papers and tutorials',
    link: './summary'
  },
];

function App() {
  const navigate = useNavigate();
  return (
      <div className="min-h-screen  relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
            Let's Practice!
          </h1>

          <div className="grid grid-cols-1 gap-6 mt-8">
            {practiceTypes.map((type, index) => (
                <button
                    key={type.title}
                    onClick={() => {navigate(type.link)}}
                    className={`
                group relative overflow-hidden rounded-xl p-8 
                transition-all duration-500 ease-out
                hover:shadow-2xl hover:scale-[1.02]
                bg-gradient-to-br from-[#2EC4B6] to-[#25A99D]
                animate-slide-up
                focus:outline-none focus:ring-4 focus:ring-[#2EC4B6] focus:ring-opacity-50
              `}
                    style={{
                      animationDelay: `${index * 150}ms`
                    }}
                >
                  {/* Card background effects */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_70%)]" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 text-white transform group-hover:scale-110 transition-transform duration-500">
                      <type.icon className="w-12 h-12 animate-bounce-subtle" />
                    </div>

                    <h3 className="text-2xl font-semibold text-white mb-3 transform group-hover:scale-105 transition-transform duration-500">
                      {type.title}
                    </h3>

                    <p className="text-white/90 text-lg">
                      {type.description}
                    </p>
                  </div>

                  {/* Interactive circle effect */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 -mb-16 -mr-16
                           bg-white/10 rounded-full transform scale-0
                           group-hover:scale-100 transition-transform duration-700 ease-out" />
                </button>
            ))}
          </div>
        </div>
      </div>
  );
}

export default App;