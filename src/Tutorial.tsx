import React, {useState, useCallback, useEffect} from 'react';
import EmotionTracker from '../../../Desktop/project/src/components/EmotionTracker';
import EmotionStats from '../../../Desktop/project/src/components/EmotionStats';
import GrammarSection from '../../../Desktop/project/src/components/GrammarSection';
import type { EmotionData } from './types/emotion';
import { BookOpen } from 'lucide-react';
import { PopupOverlay } from '../../../Desktop/project/src/components/PopupOverlay';

function Tutorial() {
    const [emotions, setEmotions] = useState<EmotionData>({
        happy: 0,
        sad: 0,
        angry: 0,
        surprised: 0,
        neutral: 0,
    });

    const [showPopup, setShowPopup] = useState(false);

    const handleEmotionUpdate = useCallback((emotion: string) => {
        setEmotions(prev => ({
            ...prev,
            [emotion]: prev[emotion] + (1/60), // Update every second (1/60 of a minute)
        }));
    }, []);


    useEffect(() => {
        const totalEmotionCount = Object.values(emotions).reduce((acc, val) => acc + val, 0);

        if (totalEmotionCount >= 2) {
            // Determine if negative emotions dominate
            const negativeEmotions = emotions.sad + emotions.angry;
            const positiveEmotions = emotions.happy;
            const isNegativeDominant = negativeEmotions > positiveEmotions;

            if (isNegativeDominant) {
                console.warn("Negative emotions dominate!");
                setShowPopup(true);
            } else {
                console.log("Positive or neutral emotions dominate.");
            }

            // Reset emotions
            setEmotions({
                happy: 0,
                sad: 0,
                angry: 0,
                surprised: 0,
                neutral: 0,
            });
        }else if(totalEmotionCount>=0.3){
            setShowPopup(false)
        }
    }, [emotions]);

    const grammarSections = [
        {
            title: "Parts of Speech",
            content: "Understanding the eight parts of speech is essential for mastering English grammar. These include nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections. Each plays a vital role in constructing meaningful sentences.",
            imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "Sentence Structure",
            content: "A complete sentence must contain a subject and a predicate. Learn about simple, compound, and complex sentences, and how to use different types of clauses to express your ideas clearly and effectively.",
            imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "Punctuation Rules",
            content: "Master the art of punctuation to enhance your writing. From commas and periods to semicolons and em dashes, proper punctuation helps readers understand your meaning and adds professional polish to your work.",
            imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-[#2ECB46] text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-8 h-8" />
                        <h1 className="text-3xl font-bold">English Grammar Tutorial</h1>
                    </div>
                    <p className="mt-2">Interactive Learning with Emotion Tracking</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {grammarSections.map((section, index) => (
                            <GrammarSection
                                key={index}
                                title={section.title}
                                content={section.content}
                                imageUrl={section.imageUrl}
                            />
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Emotion Tracker</h2>
                            <EmotionTracker  onEmotionUpdate={handleEmotionUpdate} />
                        </div>
                        <EmotionStats emotions={emotions} />
                    </div>
                </div>
            </main>
            <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showPopup ? 'visible' : 'hidden'}`}/>

            <PopupOverlay isOpen={showPopup} onClose={() => setShowPopup(false)}/>
        </div>
    );
}

export default Tutorial;
