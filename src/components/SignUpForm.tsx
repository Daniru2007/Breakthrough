// @ts-nocheck
import React, { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../firebase.tsx";
import {
    getFirestore,
    addDoc,
    doc,
    setDoc,
    collection,
} from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext.tsx";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface FormData {
    age: string;
    name: string;
    email: string;
    password: string;
}

export function SignUpForm() {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState<FormData>({
        age: "",
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Form submitted:", formData);

            const date = new Date();
            // Add a new user document to the "users" collection
            const userRef = await addDoc(collection(database, "users"), {
                Username: formData.name,
                email: formData.email,
                password: formData.password,
                age: formData.age,
                JoinedAt: date,
            });

            // Use the user ID to create a corresponding document in "UserExtension"
            await setDoc(doc(database, "UserExtension", userRef.id), {
                UserID: userRef,
                NoLessons: 0,
                XP: 0,
                Gems: 0,
                DurationOfLessons: 0,
            });

            // Create a document in the "mistakes" collection for this user
            await setDoc(doc(database, "mistakes", userRef.id), {
                userID: userRef,
                ict: [],
                maths: [],
            });
            await setDoc(doc(database, "EmotionData", userRef.id), {
                UserID: userRef,
                angry:0,
                happy:0,
                neutral:0,
                sad:0,
                surprise:0
            });

            // Update the UserContext
            setUser({
                email: formData.email,
                password: formData.password,
                UserName: formData.name,
                JoinedAt: date,
            });

            navigate("/content");
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const usr = result.user;

            // Add user to Firestore
            const userRef = await addDoc(collection(database, "users"), {
                Username: usr.displayName,
                email: usr.email,
                uid: usr.uid,
                provider: "google",
            });

            // Use the user ID to create a corresponding document in "UserExtension"
            await setDoc(doc(database, "UserExtension", userRef.id), {
                UserID: userRef,
                NoLessons: 0,
                XP: 0,
                Gems: 0,
                DurationOfLessons: 0,
            });

            // Create a document in the "mistakes" collection for this user
            await setDoc(doc(database, "mistakes", userRef.id), {
                userID: userRef,
                ict: [],
                maths: [],
            });

            await setDoc(doc(database, "EmotionData", userRef.id), {
                UserID: userRef,
                angry:0,
                happy:0,
                neutral:0,
                sad:0,
                surprise:0
            });

            // Update the UserContext
            setUser({
                email: usr.email,
                password: usr.uid,
                UserName: usr.displayName,
            });

            navigate("/");
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
            />

            <input
                type="text"
                name="name"
                placeholder="Name (optional)"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <button type="submit" className="create-account-btn">
                CREATE ACCOUNT
            </button>

            <div className="divider">
                <span>OR</span>
            </div>

            <button
                type="button"
                className="google-btn"
                onClick={handleGoogleSignIn}
            >
                <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="google-icon"
                />
                GOOGLE
            </button>
        </form>
    );
}
