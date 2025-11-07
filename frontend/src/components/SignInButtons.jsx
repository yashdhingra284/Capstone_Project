import React from "react";
import { signInWithProvider, googleProvider, facebookProvider } from "../firebaseConfig";
import "./SignInButtons.css";

export default function SignInButtons() {
  const handleLogin = async (provider) => {
    await signInWithProvider(provider);
    window.location.href = "/";
  };

  return (
    <div className="signin-container">
      <button className="signin-button google" onClick={() => handleLogin(googleProvider)}>
        Continue with Google
      </button>
      <button className="signin-button facebook" onClick={() => handleLogin(facebookProvider)}>
        Continue with Facebook
      </button>
    </div>
  );
}