
import {useContext, useState, useEffect} from 'react';
import { collection, query, getDocs, doc, where, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Toaster } from './ui/toaster';
import { useToast } from '../hooks/use-toast';
import { GraduationCap, Trophy, Medal, Flame, Globe, Crown, School } from 'lucide-react';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Card, CardContent } from './ui/card';
import schools from '../data/schools.json';
import UserContext from "../../../UserContext.tsx";


const TEST_USER = {
  EMAIL: 'aoeu@gmail.com'
};

const calculateProgress = (xp: number, maxXP: number = 5000): number => {
  return Math.min(100, (xp / maxXP) * 100);
};


interface UserData {
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  rank: number;
  progress: number;
  school?: string;
  email: string;
}

interface FirestoreUser {
  Username?: string;
  school?: string;
  email: string;
}

interface FirestoreUserExtension {
  XP: number;
  Streak: number;
  UserID: any;
}


function PageHeader({ viewMode, onViewChange, userSchool }) {
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-green-600" />
            <span className="font-semibold">Learning Platform</span>
          </div>
          <Select value={viewMode} onValueChange={onViewChange}>
            <SelectTrigger className="w-[180px] bg-white border-green-200 hover:border-green-300 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-green-600" />
                  <span>Global Leaderboard</span>
                </div>
              </SelectItem>
              {userSchool && (
                <SelectItem value="school">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-green-600" />
                    <span>{userSchool}</span>
                  </div>
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function LeaderboardHeader() {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-6">
          <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-4 shadow-lg transform -rotate-3 transition-transform hover:rotate-0">
            <Trophy size={32} className="text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-green-800">Diamond League</h1>
            <p className="text-green-600">Top 5% of learners this week</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LeaderboardItem({ user }) {
  return (
    <div className="group p-4 hover:bg-green-50/50 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-12 text-center flex-shrink-0">
            {user.rank === 1 && <Crown size={24} className="mx-auto text-yellow-500 drop-shadow-sm" />}
            {user.rank === 2 && <Medal size={24} className="mx-auto text-gray-400 drop-shadow-sm" />}
            {user.rank === 3 && <Medal size={24} className="mx-auto text-amber-700 drop-shadow-sm" />}
            {user.rank > 3 && <span className="text-lg font-semibold text-gray-500">#{user.rank}</span>}
          </div>
          
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-lg transform transition-transform group-hover:scale-110 flex-shrink-0">
            {user.avatar}
          </div>
          
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-gray-900 truncate">{user.name}</span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
              {user.school && (
                <span className="flex items-center gap-1 truncate">
                  <GraduationCap size={14} className="flex-shrink-0" />
                  <span className="truncate">{user.school}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Flame size={14} className="text-orange-500 flex-shrink-0" />
                {user.streak} day streak
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-[200px] flex-shrink-0">
          <Progress value={user.progress} className="flex-1" />
          <span className="font-semibold text-green-600 min-w-[80px] text-right">
            {user.xp.toLocaleString()} XP
          </span>
        </div>
      </div>
    </div>
  );
}

function LeaderboardList({ users }) {
  return (
    <div className="divide-y">
      {users.map((user) => (
        <LeaderboardItem key={user.email} user={user} />
      ))}
    </div>
  );
}

function EmptyState({ viewMode }) {
  return (
    <div className="p-8 text-center">
      <School size={48} className="mx-auto text-green-600 opacity-50 mb-4" />
      <p className="text-lg font-semibold text-gray-900 mb-2">No students found</p>
      <p className="text-gray-500">
        {viewMode === 'school' 
          ? 'Be the first to earn XP from your school!'
          : 'Start learning to appear on the leaderboard'}
      </p>
    </div>
  );
}

function SchoolSelector({ open, onSelect }) {
  return (
      <Dialog open={open} modal>
        <DialogContent className="sm:max-w-[425px] bg-white shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Select Your School
            </DialogTitle>
            <DialogDescription>
              Choose your school to connect with your academic community
            </DialogDescription>
          </DialogHeader>
          <Command className="rounded-lg border shadow-md bg-white ">
            <CommandInput placeholder="Search schools..." />
            <CommandList>
              <CommandEmpty>No school found.</CommandEmpty>
              <CommandGroup heading="Schools" className="max-h-[300px] overflow-auto">
                {schools.schools.map((school) => (
                    <CommandItem
                        key={school}
                        value={school}
                        onSelect={() => onSelect(school)}
                        className="cursor-pointer"
                    >
                      <GraduationCap className="mr-2 h-4 w-4" />
                      <span>{school}</span>
                    </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
  );
}


export default function Leaderboards() {
  const { user } = useContext(UserContext); // Retrieve logged-in user context
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSchoolSelector, setShowSchoolSelector] = useState(false);
  const [userSchool, setUserSchool] = useState(null);
  const [viewMode, setViewMode] = useState('global');
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    const fetchLeaderboards = async () => {
      try {
        const usersQuery = query(collection(db, 'users'));
        const usersSnapshot = await getDocs(usersQuery);
        const uniqueUsers = new Map();

        for (const userDoc of usersSnapshot.docs) {
          const userDetails = userDoc.data();
          const email = userDetails.email;

          if (!email || uniqueUsers.has(email)) continue;

          const userRef = doc(db, 'users', userDoc.id);
          const userExtensionQuery = query(
              collection(db, 'UserExtension'),
              where('UserID', '==', userRef)
          );
          const userExtensionSnapshot = await getDocs(userExtensionQuery);

          let totalXP = 0;
          let streak = 0;

          userExtensionSnapshot.forEach((doc) => {
            const data = doc.data();
            totalXP += data.XP || 0;
            streak += data.Streak || 0;
          });

          uniqueUsers.set(email, {
            name: userDetails.Username || 'Unknown User',
            avatar: userDetails.Username ? userDetails.Username[0].toUpperCase() : 'U',
            xp: totalXP,
            streak,
            school: userDetails.school,
            email: email,
            rank: 0,
            progress: calculateProgress(totalXP),
          });
        }

        const sortedUsers = Array.from(uniqueUsers.values())
            .sort((a, b) => b.xp - a.xp)
            .map((user, index) => ({
              ...user,
              rank: index + 1,
            }));

        setLeaderboardData(sortedUsers);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load leaderboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, [user, toast]);

  useEffect(() => {
    if (!user) return;

    const checkSchool = async () => {
      try {
        const usersQuery = query(
            collection(db, 'users'),
            where('email', '==', user.email) // Use current user's email
        );
        const querySnapshot = await getDocs(usersQuery);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          if (!userData.school) {
            setShowSchoolSelector(true);
          } else {
            setUserSchool(userData.school);
          }
        }
      } catch (error) {
        console.error('Error checking school:', error);
      }
    };

    checkSchool();
  }, [user]);

  const handleSchoolSelect = async (school: string) => {
    try {
      const usersQuery = query(
          collection(db, 'users'),
          where('email', '==', user.email) // Use current user's email
      );
      const querySnapshot = await getDocs(usersQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(userDoc.ref, { school });
        setUserSchool(school);
        setShowSchoolSelector(false);
        toast({
          title: "School Updated",
          description: `Your school has been set to ${school}`,
        });
      }
    } catch (error) {
      console.error('Error updating school:', error);
      toast({
        title: "Error",
        description: "Failed to update school. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredData = viewMode === 'global'
      ? leaderboardData
      : leaderboardData.filter((user) => user.school === userSchool);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
    );
  }

  return (
      <>
        <SchoolSelector open={showSchoolSelector} onSelect={handleSchoolSelect} />
        <div className="flex flex-col min-h-screen">
          <PageHeader viewMode={viewMode} onViewChange={setViewMode} userSchool={userSchool} />
          <main className="flex-1 bg-[#f9f9f9]">
            <div className="max-w-[800px] mx-auto px-6 py-8">
              <LeaderboardHeader />
              <div className="mt-4 bg-white rounded-xl shadow-sm border overflow-hidden">
                {filteredData.length > 0 ? (
                    <LeaderboardList users={filteredData} />
                ) : (
                    <EmptyState viewMode={viewMode} />
                )}
              </div>
            </div>
          </main>
        </div>
        <Toaster />
      </>
  );
}