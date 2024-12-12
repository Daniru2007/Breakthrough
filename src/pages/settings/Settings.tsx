// @ts-nocheck
import React, { useState } from 'react';
import { Volume2, Bell, Moon, Globe, User, Book, Target, MessageSquare } from 'lucide-react';
import './Settings.css';

function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showStreak, setShowStreak] = useState(true);
  const [showXP, setShowXP] = useState(true);
  const [autoCorrect, setAutoCorrect] = useState(true);
  const [hardMode, setHardMode] = useState(false);

  return (
    <div className="settings-container">
      <h1 className="more-title">Settings</h1>

      <div className="settings-section">
        <div className="settings-header">
          <User size={24} color="var(--primary-color)" />
          <h2 className="settings-title">Profile Settings</h2>
        </div>
        <div className="setting-item">
          <span className="setting-label">Show Streak Count</span>
          <div className="setting-control">
            <button
              className={`toggle-switch ${showStreak ? 'active' : ''}`}
              onClick={() => setShowStreak(!showStreak)}
            />
          </div>
        </div>
        <div className="setting-item">
          <span className="setting-label">Display XP Progress</span>
          <div className="setting-control">
            <button
              className={`toggle-switch ${showXP ? 'active' : ''}`}
              onClick={() => setShowXP(!showXP)}
            />
          </div>
        </div>
        <div className="setting-item">
          <span className="setting-label">Profile Theme</span>
          <div className="setting-control">
            <select className="select-control">
              <option value="default">Default</option>
              <option value="minimal">Minimal</option>
              <option value="colorful">Colorful</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-header">
          <Book size={24} color="var(--primary-color)" />
          <h2 className="settings-title">Learning Preferences</h2>
        </div>
        <div className="setting-item">
          <span className="setting-label">Auto-Correct</span>
          <div className="setting-control">
            <button
              className={`toggle-switch ${autoCorrect ? 'active' : ''}`}
              onClick={() => setAutoCorrect(!autoCorrect)}
            />
          </div>
        </div>
        <div className="setting-item">
          <span className="setting-label">Hard Mode</span>
          <div className="setting-control">
            <button
              className={`toggle-switch ${hardMode ? 'active' : ''}`}
              onClick={() => setHardMode(!hardMode)}
            />
          </div>
        </div>
        <div className="setting-item">
          <span className="setting-label">Daily Goal</span>
          <div className="setting-control">
            <select className="select-control">
              <option value="casual">Casual (10 XP)</option>
              <option value="regular">Regular (20 XP)</option>
              <option value="serious">Serious (30 XP)</option>
              <option value="intense">Intense (50 XP)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-header">
          <Globe size={24} color="var(--primary-color)" />
          <h2 className="settings-title">Language</h2>
        </div>
        <div className="setting-item">
          <span className="setting-label">Interface Language</span>
          <div className="setting-control">
            <select className="select-language">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-header">
          <Volume2 size={24} color="var(--primary-color)" />
          <h2 className="settings-title">Sound & Visual</h2>
        </div>
        <div className="setting-item">
          <span className="setting-label">Sound Effects</span>
          <div className="setting-control">
            <button
              className={`toggle-switch ${soundEnabled ? 'active' : ''}`}
              onClick={() => setSoundEnabled(!soundEnabled)}
            />
          </div>
        </div>
        <div className="setting-item">
          <span className="setting-label">Dark Mode</span>
          <div className="setting-control">
            <button
              className={`toggle-switch ${darkMode ? 'active' : ''}`}
              onClick={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-header">
          <Bell size={24} color="var(--primary-color)" />
          <h2 className="settings-title">Notifications</h2>
        </div>
        <div className="setting-item">
          <span className="setting-label">Push Notifications</span>
          <div className="setting-control">
            <button
              className={`toggle-switch ${notifications ? 'active' : ''}`}
              onClick={() => setNotifications(!notifications)}
            />
          </div>
        </div>
        <div className="setting-item">
          <span className="setting-label">Reminder Time</span>
          <div className="setting-control">
            <select className="select-control">
              <option value="morning">Morning (9:00 AM)</option>
              <option value="afternoon">Afternoon (2:00 PM)</option>
              <option value="evening">Evening (7:00 PM)</option>
              <option value="night">Night (10:00 PM)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;