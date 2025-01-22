
import React, {useContext, useState} from 'react';
import Home from './Home';
import Content from './Content.tsx';
import Lessons from './Lessons.tsx';
import Speech from './Speech.tsx';
import Sign from './Sign.tsx';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import UserContext from "./UserContext.tsx";
import { Navigate } from 'react-router-dom';


function App() {
    const {user, setUser} = useContext(UserContext);
    return (
        <div>
            <Router>
                <Routes>
                        <Route path="/" element={user ? <Content /> : <Home />} />
                        <Route path="/sign/*" element={<Sign />} />
                        <Route path="/lessons" element={<Lessons />} />
                        <Route path="/speech" element={<Speech />} />
                        <Route path="/content/*" element={<Content />} />

                </Routes>
            </Router>
        </div>
    );
}

export default App;
