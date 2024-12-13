//@ts-nocheck
import React, {useContext, useState} from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {firebaseConfig} from "../firebase.tsx";
import { getFirestore,or, addDoc, doc, setDoc, collection,query, where, getDocs } from "firebase/firestore";
import { useNavigate  } from 'react-router-dom';
import UserContext from "../UserContext.tsx";

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getFirestore(app);

interface FormData {
  emailOrUsername: string;
  password: string;
}

export function LoginForm() {
    const {user, setUser} = useContext(UserContext);
  const [formData, setFormData] = useState<FormData>({
    emailOrUsername: '',
    password: ''
  });

  const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
  const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      const q = query(collection(database, "users"), or(where("email", "==", formData.emailOrUsername),where("Username", "==", formData.emailOrUsername)));
      if(q) {
          console.log(q)
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
              setUser({
                  "email": doc.data().email,
                  "password": doc.data().password,
                  "UserName": doc.data().Username
              })
              if (doc.data().Password === formData.password) {
                  setError(false);
              } else {
                  setError(true);
                  return
              }
          });
          navigate("/content");

      }else{
          setError(true);
          return
      }

  };

  const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      if(e.target.name === "password"){
            setError(false);
      }
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="emailOrUsername"
        placeholder="Email or username"
        value={formData.emailOrUsername}
        onChange={handleChange}
      />
      
      <div className="password-container">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <a href="#" className="forgot-link">FORGOT?</a>
      </div>
      
      <button type="submit" className="create-account-btn">
        LOG IN
      </button>
      
      <div className="divider">
        <span>OR</span>
      </div>
        {error && <p className="error">Invalid email or password</p>}
      
      <button type="button" className="google-btn">
        <img src="https://www.google.com/favicon.ico" alt="Google" className="google-icon" />
        GOOGLE
      </button>
    </form>
  );
}