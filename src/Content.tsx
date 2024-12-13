// @ts-nocheck
import React, {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react'; // Import from Lucide React
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Practice from './pages/Practice';
import Leaderboards from './pages/Leaderboards';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import More from './pages/More';
import Settings from './pages/settings/Settings';
import Help from './pages/help/Help';
import Notifications from './pages/notifications/Notifications';
import Friends from './pages/friends/Friends';
import Privacy from './pages/privacy/Privacy';
import './Content.css';
import Speech from "./Speech.tsx";
import Lessons from "./Lessons.tsx";
import Game from "./GameUpdate.tsx";
import UserContext from "./UserContext.tsx";
import Tutorial from "./Tutorial.tsx";

function Content() {
  const navigate = useNavigate();

  return (
      <div className="app" style={{overflowX:'hidden'}}>
        <Sidebar />
        <main className="main-content">
          {/* Back Button */}
          <CircleArrowLeft
              onClick={() => navigate(-1)}
              className="back-button"
              style={{
                position: 'fixed',
                  display: 'inline',
                top: '10px',
                left: '270px',
                cursor: 'pointer',
                color: '#888', // Subtle color
                opacity: 0.6,  // Slightly transparent
                width: '40px',
                height: '40px',
              }}
          />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="learn/speaking" element={<Speech />} />
            <Route path="learn/quiz" element={<Lessons />} />
            <Route path="learn/game" element={<Game />} />
            <Route path="learn/tute" element={<Tutorial />} />
            <Route path="learn" element={<Learn />} />
            <Route path="practice" element={<Practice />} />
            <Route path="leaderboards" element={<Leaderboards />} />
            <Route path="shop" element={<Shop />} />
            <Route path="profile" element={<Profile />} />
            <Route path="more" element={<More />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="friends" element={<Friends />} />
            <Route path="privacy" element={<Privacy />} />
          </Routes>
        </main>
      </div>
  );
}

export default Content;