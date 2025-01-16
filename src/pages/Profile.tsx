// @ts-nocheck
import React, {useContext, useEffect, useState} from 'react';
import {Clock, Zap, Trophy, Medal, Pencil} from 'lucide-react';
import './Profile.css';
import {
    doc,
    getDoc,
    collection,
    where,
    query,
    getDocs,
    getFirestore,
    Timestamp,
} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebase.tsx';
import UserContext from '../UserContext.tsx';
import {useNavigate} from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Profile() {
    const {user,setUser} = useContext(UserContext); // Retrieve logged-in user context
    const [userData, setUserData] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!user || !user.email) {
                    console.error('User context or email is missing.', user);
                    return;
                }

                // Query the `users` collection to find the userId by email
                const usersQuery = query(
                    collection(db, 'users'),
                    where('email', '==', user.email)
                );
                const usersSnapshot = await getDocs(usersQuery);

                if (usersSnapshot.empty) {
                    console.error('No user found with the given email.');
                    return;
                }

                const userDoc = usersSnapshot.docs[0];
                const userId = userDoc.id; // Extract the document ID (userId)
                const userDetails = userDoc.data();
                const userRef = doc(db, 'users', userId);

                // Fetch user's stats from `UserExtension`
                const userExtensionQuery = query(
                    collection(db, 'UserExtension'),
                    where('UserID', '==', userRef)
                );
                const userExtensionSnapshot = await getDocs(userExtensionQuery);

                let totalXP = 0;
                let noOfLessons = 0;

                userExtensionSnapshot.forEach((doc) => {
                    const data = doc.data();
                    totalXP += data.XP || 0;
                    noOfLessons += data.NoLessons || 0;
                });

                const joinDate = userDetails.JoinedAt instanceof Timestamp
                    ? userDetails.JoinedAt.toDate()
                    : new Date(userDetails.JoinedAt);

                setUserData({
                    name: userDetails.Username,
                    email: userDetails.email,
                    joinDate: joinDate
                });

                setUserStats({
                    streak: 0, // Add streak logic if available
                    totalXP,
                    league: 'Bronze', // Add league calculation if needed
                    lessonsCompleted: noOfLessons,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);

    if (!userData || !userStats) {
        return <div>Loading...</div>;
    }

    const stats = [
        {icon: Clock, value: userStats.streak, label: 'Day streak'},
        {icon: Zap, value: userStats.totalXP, label: 'Total XP'},
        {icon: Trophy, value: userStats.league, label: 'Current league'},
        {icon: Medal, value: userStats.lessonsCompleted, label: 'Number of Lessons'},
    ];

    // Example achievements array
    const achievements = [
        {
            icon: '🔥',
            title: 'First Lesson',
            progress: '100%',
            description: 'Complete your first lesson.',
            progressPercent: 100,
        },
        {
            icon: '🏆',
            title: 'XP Master',
            progress: '50%',
            description: 'Earn 500 XP.',
            progressPercent: 50,
        },
    ];

    const logout = (e)=>{
        e.preventDefault();
        setUser(null);
        navigate('/');
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-info">
                    <div className="avatar">
                        <span>{userData.name[0]}</span>
                        <div className="avatar-edit" style={{color: "black"}}>
                            <Pencil size={16}/>
                        </div>
                    </div>
                    <div className="user-details">
                        <h1>{userData.name}</h1>
                        <p className="username">{userData.email}</p>
                        <p className="join-date">
                            <Clock size={16}/>
                            Joined {userData.joinDate.toDateString()}
                        </p>
                    </div>
                </div>
            </div>

            <button onClick={logout}>
                Logout
            </button>

            <section className="statistics-section">
                <h2>Statistics</h2>
                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat-card">
                            <stat.icon size={24} className="stat-icon"/>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="achievements-section">
                <h2>Achievements</h2>
                <div className="achievements-list">
                    {achievements.map((achievement) => (
                        <div key={achievement.title} className="achievement-card">
                            <div className="achievement-icon level-1">
                                <span>{achievement.icon}</span>
                                <div className="level-badge">LEVEL 1</div>
                            </div>
                            <div className="achievement-details">
                                <div className="achievement-header">
                                    <h3>{achievement.title}</h3>
                                    <span className="achievement-progress">{achievement.progress}</span>
                                </div>
                                <p>{achievement.description}</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{width: `${achievement.progressPercent}%`}}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="view-all-btn">
                        View all
                        <Clock size={16}/>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Profile;
