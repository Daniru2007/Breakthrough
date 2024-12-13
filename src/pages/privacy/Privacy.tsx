// @ts-nocheck
import React, { useState } from 'react';
import { Shield, Eye, Users, Bell } from 'lucide-react';
import './Privacy.css';

function Privacy() {
  const [profileVisible, setProfileVisible] = useState(true);
  const [activityVisible, setActivityVisible] = useState(true);
  const [friendRequests, setFriendRequests] = useState(true);

  return (
    <div className="privacy-container">
      <h1 className="more-title">Privacy Settings</h1>

      <div className="privacy-section">
        <div className="privacy-header">
          <Eye size={24} color="var(--primary-color)" />
          <h2 className="privacy-title">Profile Visibility</h2>
        </div>
        <div className="privacy-option">
          <div>
            <span className="option-label">Public Profile</span>
            <p className="option-description">Allow others to see your profile and progress</p>
          </div>
          <button
            className={`toggle-switch ${profileVisible ? 'active' : ''}`}
            onClick={() => setProfileVisible(!profileVisible)}
          />
        </div>
      </div>

      <div className="privacy-section">
        <div className="privacy-header">
          <Users size={24} color="var(--primary-color)" />
          <h2 className="privacy-title">Social Settings</h2>
        </div>
        <div className="privacy-option">
          <div>
            <span className="option-label">Activity Sharing</span>
            <p className="option-description">Share your learning activity with friends</p>
          </div>
          <button
            className={`toggle-switch ${activityVisible ? 'active' : ''}`}
            onClick={() => setActivityVisible(!activityVisible)}
          />
        </div>
        <div className="privacy-option">
          <div>
            <span className="option-label">Friend Requests</span>
            <p className="option-description">Allow others to send you friend requests</p>
          </div>
          <button
            className={`toggle-switch ${friendRequests ? 'active' : ''}`}
            onClick={() => setFriendRequests(!friendRequests)}
          />
        </div>
      </div>

      <div className="privacy-section">
        <div className="privacy-header">
          <Shield size={24} color="var(--primary-color)" />
          <h2 className="privacy-title">Data & Security</h2>
        </div>
        <button className="privacy-button">
          Download My Data
        </button>
      </div>
    </div>
  );
}

export default Privacy;