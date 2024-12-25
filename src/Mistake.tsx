import React, { useEffect, useState, useContext } from 'react';
import { BookOpen } from 'lucide-react';
import {
  collection,
  query,
  getDocs,
  getFirestore,
  where, doc,
    Timestamp
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.tsx';
import UserContext from './UserContext.tsx';
import { SubjectGraphsContainer } from './components/Mistake/components/graphs/SubjectGraphsContainer';
import { MistakeList } from './components/Mistake/components/MistakeList';
import { Stats } from './components/Mistake/components/Stats';
import './Mistake.css';
import { SubjectMistake, SubjectType } from './components/Mistake/types/subject';

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Mistake() {
  const { user } = useContext(UserContext); // Retrieve the logged-in user's context
  const [mistakes, setMistakes] = useState([]);
  const [mistakesBySubject, setMistakesBySubject] = useState<Record<SubjectType, SubjectMistake[]>>({});
  const [stats, setStats] = useState({
    totalMistakes: 0,
    improvementRate: 0,
    commonCategory: '',
    streakDays: 0,
  });

  useEffect(() => {
    const fetchMistakes = async () => {
      try {
        if (!user || !user.email) {
          console.error('User context or email is missing.', user);
          return;
        }

        // Step 1: Query the `users` collection to find the logged-in user
        const usersQuery = query(
            collection(db, 'users'),
            where('email', '==', user.email) // Match by email
        );
        const usersSnapshot = await getDocs(usersQuery);

        if (usersSnapshot.empty) {
          console.error('No user document found for the given email.');
          return;
        }

        // Step 2: Get the user's document reference
        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id;
        const userRef = doc(db, 'users', userId);

        // Step 3: Query the `mistakes` collection using the userId
        const mistakesQuery = query(
            collection(db, 'mistakes'),
            where('userID', '==', userRef) // Filter mistakes by userId
        );
        const mistakesSnapshot = await getDocs(mistakesQuery);

        if (mistakesSnapshot.empty) {
          console.error('No mistakes found for the given user.');
          return;
        }

        const fetchedMistakes = [];
        const subjectCounts: Record<SubjectType, SubjectMistake[]> = {
          Mathematics: [],
          ICT: [],
        };

        // Process each mistake document
        mistakesSnapshot.forEach((doc) => {
          const data = doc.data();
          const formatDate = (timestamp: Timestamp) => {
            return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toISOString(); // ISO string format
          };
          // Extract Maths mistakes
          if (data.maths) {
            data.maths.forEach((item: { date: string; question: string }) => {
              fetchedMistakes.push({
                id: `${doc.id}-maths-${item.date}`,
                subject: 'Mathematics',
                date: formatDate(item.date),
                description: item.question,
              });

              // Aggregate by subject
              subjectCounts['Mathematics'].push({
                date: formatDate(item.date),
                count: 1, // Each mistake counts as 1
                subject: 'Mathematics',
              });
            });
          }

          // Extract ICT mistakes
          if (data.ict) {
            data.ict.forEach((item: { date: string; question: string }) => {
              fetchedMistakes.push({
                id: `${doc.id}-ict-${item.date}`,
                subject: 'ICT',
                date: formatDate(item.date),
                description: item.question,
              });

              // Aggregate by subject
              subjectCounts['ICT'].push({
                date: formatDate(item.date),
                count: 1,
                subject: 'ICT',
              });
            });
          }
        });

        // Step 4: Calculate stats
        const totalMistakes = fetchedMistakes.length;
        const commonCategory = 'Mathematics'; // Placeholder: you can add logic to calculate the actual most common category
        const streakDays = calculateStreakDays(fetchedMistakes);
        const improvementRate = calculateImprovementRate(subjectCounts);

        // Update state
        setMistakes(fetchedMistakes);
        setMistakesBySubject(subjectCounts);
        setStats({
          totalMistakes,
          improvementRate,
          commonCategory,
          streakDays,
        });
      } catch (error) {
        console.error('Error fetching mistakes:', error);
      }
    };

    fetchMistakes();
    console.log(mistakesBySubject);
  }, [mistakes, mistakesBySubject, user]);

  // Helper function to calculate streak days
  const calculateStreakDays = (mistakes) => {
    const dates = mistakes.map((m) => new Date(m.date).toDateString());
    const uniqueDates = new Set(dates);
    return uniqueDates.size; // Number of unique mistake dates = streak days
  };

  // Helper function to calculate improvement rate (dummy logic)
  const calculateImprovementRate = (mistakesBySubject) => {
    let rate = 0;
    Object.values(mistakesBySubject).forEach((mistakes) => {
      if (mistakes.length > 1) {
        const firstDay = mistakes[0].count;
        const lastDay = mistakes[mistakes.length - 1].count;
        rate += ((firstDay - lastDay) / firstDay) * 100;
      }
    });
    return Math.round(rate / Object.keys(mistakesBySubject).length || 1); // Average rate
  };

  return (
      <div className="min-h-screen">
        {/* Header */}
        <header
            className="bg-[#2EC4B6] text-white py-6"
            style={{
              maxHeight: '300px',
              margin: '-100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >
          <div className="container px-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8" />
              <h1
                  className="text-2xl font-bold"
                  style={{ marginBottom: '0px' }}
                  id="learn"
              >
                Learning Progress Tracker
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-12">
            {/* Stats Section */}
            <Stats
                totalMistakes={stats.totalMistakes}
                improvementRate={stats.improvementRate}
                commonCategory={stats.commonCategory}
                streakDays={stats.streakDays}
            />

            {/* Subject Graphs Section */}
            <SubjectGraphsContainer mistakesBySubject={mistakesBySubject} />

            {/* Recent Mistakes List */}
            <MistakeList mistakes={mistakes} />
          </div>
        </main>
      </div>
  );
}

export default Mistake;
