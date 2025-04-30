import React from "react";
import "../styles/ProfilePage.css";
import Navbar from '../components/Navbar';

const ProfilePage = () => {

  return (
    <>
      <Navbar  />
      <div className="profile-container">
        <h1 className="profile-title">User Profile</h1>
          <div className="profile-card">
            <div className="profile-header">
              <h2>XYZ</h2>
              <p>xyz@gmail.com</p>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-title">Account Created On:</span>
                <span>12-3-25</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Active:</span>
                <span>Yes</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Streak:</span>
                <span>0</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Points:</span>
                <span>0</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Questions Solved:</span>
                <span>2</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Articles Contributed:</span>
                <span>0</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Active Days:</span>
                <span>0</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Last Solved Date:</span>
                <span>11-4-25</span>
              </div>
            </div>
            <button className="logout-button">Logout</button>
          </div>
      </div>
    </>
  );
};

export default ProfilePage;
