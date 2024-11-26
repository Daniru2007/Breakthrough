import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {firebaseConfig} from "../firebase.tsx";
import { getFirestore, addDoc, doc, setDoc, collection } from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { useNavigate  } from 'react-router-dom';

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

export function SignUpForm({user,setUser}) {
    const [formData, setFormData] = useState<FormData>({
        age: '',
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Form submitted:', formData);
            await addDoc(collection(database, "users"), {
                Username: formData.name,
                email: formData.email,
                password: formData.password,
                age: formData.age
            });
            setUser( {"Email":formData.email,
                "Password": formData.password,
                "UserName": formData.name})
            navigate("/");
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const usr = result.user;

            // Add user to Firestore
            await addDoc(collection(database, "users"), {
                Username: usr.displayName,
                email: usr.email,
                uid: usr.uid,
                provider: 'google'
            });

            setUser( {"Email":usr.email,
                "Password": usr.uid,
                "UserName": usr.displayName})
            navigate("/");
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
                <img src="https://www.google.com/favicon.ico" alt="Google" className="google-icon" />
                GOOGLE
            </button>
        </form>
    );
}