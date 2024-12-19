import {useState, useEffect, useContext} from 'react';
import { Circle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import EmojiCelebration from './EmojiCelebration';
import UserContext from "../UserContext.tsx";
import { getDocs, collection, query, where, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.tsx';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Updates the mistake data for a user in Firestore based on their email.
 * @param userEmail - The email of the user whose mistake data is to be updated.
 * @param subject - The subject field to update (e.g., 'maths', 'ict', 'english').
 * @param question - The question that the user made a mistake on.
 */
export const updateUserMistakesByEmail = async (
    userEmail: string,
    subject: 'maths' | 'ict' | 'english',
    question: string
): Promise<void> => {
  try {
    // Step 1: Query the `users` collection to get the user document and reference
    const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
    const usersSnapshot = await getDocs(usersQuery);

    if (usersSnapshot.empty) {
      console.error('No user found with the provided email.');
      return;
    }

    const userDoc = usersSnapshot.docs[0];
    const userRef = doc(db, 'users', userDoc.id); // Reference to the user document

    // Step 2: Query the `mistakes` collection using the `userID` reference
    const mistakesQuery = query(collection(db, 'mistakes'), where('userID', '==', userRef));
    const mistakesSnapshot = await getDocs(mistakesQuery);

    if (mistakesSnapshot.empty) {
      console.error('No mistakes document found for the provided user.');
      return;
    }

    const mistakeDoc = mistakesSnapshot.docs[0];

    // Step 3: Append the new mistake to the subject array
    const newMistake = {
      question,
      date: new Date(), // Current date and time
    };

    await updateDoc(doc(db, 'mistakes', mistakeDoc.id), {
      [subject]: arrayUnion(newMistake), // Add the new mistake to the existing array
    });

    console.log(`${subject} mistakes updated successfully for user (${userEmail}).`);
  } catch (error) {
    console.error('Error updating mistakes in Firestore:', error);
  }
};

interface QuestionCardProps {
  prompt: string;
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  onSelectAnswer: (answer: string | null) => void;
  onNextQuestion: () => void;
}

export default function QuestionCard({
                                       prompt,
                                       options,
                                       selectedAnswer,
                                       correctAnswer,
                                       onSelectAnswer,
                                       onNextQuestion
                                     }: QuestionCardProps) {
  const [cooldown, setCooldown] = useState(0);
  const [isInCooldown, setIsInCooldown] = useState(false);
  const isCorrect = selectedAnswer === correctAnswer;
  const showNextButton = selectedAnswer === correctAnswer;
  const {user} = useContext(UserContext); // Retrieve logged-in user context

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (cooldown === 0 && isInCooldown) {
      setIsInCooldown(false);
      onSelectAnswer(null);
    }
    return () => clearInterval(timer);
  }, [cooldown, isInCooldown]);

  const handleAnswerSelect = (answer: string) => {
    if (isInCooldown || selectedAnswer) return;

    if (answer !== correctAnswer) {
      updateUserMistakesByEmail(user.email, 'maths', prompt); // Update mistake count for the user
      setCooldown(5); // Start cooldown when answer is incorrect
      setIsInCooldown(true);
    }
    onSelectAnswer(answer);
  };

  return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 animate-slide-up relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-[100px] -z-0" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand/5 rounded-tr-[80px] -z-0" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-brand/10 rounded-full animate-bounce-soft">
            <span className="text-brand text-lg font-medium">∑</span>
          </span>
            <span className="text-sm font-medium text-brand tracking-wide">MATHEMATICS</span>
            {isInCooldown && (
                <div className="ml-auto flex items-center gap-2 bg-red-50 text-red-500 px-3 py-1.5 rounded-full animate-pulse">
                  <Clock size={16} />
                  <span className="font-medium">{cooldown}s</span>
                </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              Solve the problem
              <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
            </h2>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
              <p className="text-xl font-mono text-gray-900 whitespace-pre-wrap">{prompt}</p>
            </div>
          </div>

          <div className="space-y-3 relative">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === correctAnswer;
              const isWrongSelection = isSelected && !isCorrectOption;

              let buttonStyle = 'border-gray-200 hover:border-brand/30 hover:bg-gray-50';
              if (isSelected && isCorrectOption) {
                buttonStyle = 'border-green-500 bg-green-50 text-green-600';
              } else if (isWrongSelection) {
                buttonStyle = 'border-red-500 bg-red-50 text-red-600 animate-shake';
              }

              return (
                  <button
                      key={index}
                      onClick={() => !selectedAnswer && !isInCooldown && handleAnswerSelect(option)}
                      disabled={isInCooldown} // Disable only if cooldown is active
                      className={`group w-full text-left p-4 rounded-xl border-2 transition-all duration-300 
                  transform hover:scale-[1.02] relative overflow-hidden ${buttonStyle}
                  ${isInCooldown ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/5 to-transparent
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="flex items-center justify-between relative">
                      <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm transition-colors
                      ${isSelected && isCorrectOption ? 'border-green-500 text-green-600' :
                        isWrongSelection ? 'border-red-500 text-red-600' :
                            'border-gray-300 text-gray-500'}`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                        <span className="font-mono text-lg">{option}</span>
                      </div>
                      {isSelected ? (
                          isCorrectOption ? (
                              <CheckCircle2 className="text-green-500 animate-celebrate" size={24} />
                          ) : (
                              <XCircle className="text-red-500" size={24} />
                          )
                      ) : (
                          <Circle className="text-gray-300 group-hover:text-brand/50 transition-colors" size={24} />
                      )}
                    </div>
                  </button>
              );
            })}
          </div>

          {showNextButton && (
              <div className="mt-6 flex justify-end animate-fade-in">
                <button
                    onClick={onNextQuestion}
                    className="group px-6 py-3 bg-brand text-green-400 rounded-xl font-medium
                hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20
                transform hover:scale-105 transition-transform duration-200
                relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center gap-2">
                Next Question
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
                </button>
              </div>
          )}

          {isCorrect && <EmojiCelebration />}
        </div>
      </div>
  );
}
