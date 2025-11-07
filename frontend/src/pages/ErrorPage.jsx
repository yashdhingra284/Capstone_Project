// frontend/src/pages/ErrorPage.jsx
import React from "react";
import "./Pages.css";

export default function ErrorPage() {
  return (
    <div className="page-container">
      <div className="card">
        <h2>Authentication Failed</h2>
        <p>Please try again.</p>
        <a href="/login">Return to login</a>
      </div>
    </div>
  );
}
