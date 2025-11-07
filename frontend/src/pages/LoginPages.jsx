// frontend/src/pages/LoginPage.jsx
import React from "react";
import SignInButtons from "../components/SignInButtons.jsx";
import "./Pages.css";

export default function LoginPage() {
  return (
    <div className="page-container">
      <div className="card">
        <h2>Nimbus Login</h2>
        <p style={{ color: "#6b7280", marginBottom: 16 }}>Sign in using Google or Facebook</p>
        <SignInButtons redirect="/" />
      </div>
    </div>
  );
}
