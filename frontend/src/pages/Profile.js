// frontend/src/pages/Profile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error(error.response.data.message);
        alert(error.response.data.message);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Your Profile</h2>
        <p className="profile-item">
          Name: <span>{user.name}</span>
        </p>
        <p className="profile-item">
          Email: <span>{user.email}</span>
        </p>
        <p className="profile-item">
          Member Since:{" "}
          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
