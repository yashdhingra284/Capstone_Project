// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchUser, logout } from "../api";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser()
      .then(setUser)
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    // redirect to login after logout
    navigate("/login");
  };

  if (!user) return <p className="loading">Loading...</p>;

  return (
    <div className="page-container">
      <div className="card">
        <h2>Welcome, {user.name || "User"}</h2>
        {user.avatar && <img className="avatar" src={user.avatar} alt="avatar" />}
        <p style={{ color: "#374151" }}>Email: {user.email}</p>
        <p style={{ color: "#374151" }}>Providers: {user.providers.join(", ")}</p>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
