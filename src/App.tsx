import React, {useState} from 'react';
import Home from './Home';
import Content from './Content.tsx';
import Lessons from './Lessons.tsx';
import Sign from './Sign.tsx';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {firebaseConfig} from "./firebase.tsx";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
    const [user, setUser] = useState(null);
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/lessons" element={<Lessons />}/>
                    <Route path="/content/*" element={<Content/>}/>
                    <Route path="/sign/*" element={<Sign user={user} setUser={setUser}/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
