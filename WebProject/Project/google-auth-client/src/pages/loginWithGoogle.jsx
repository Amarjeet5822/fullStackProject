// src/components/LoginWithGoogle.jsx
import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const VITE_GOOGLE_CLIENT_ID = '195914562940-rbsq73jd1encje4c31m6633iv63r8go3.apps.googleusercontent.com'

const LoginWithGoogle = ({ setUser }) => {
  const handleCredentialResponse = async (response) => {
    try {
      const res = await axios.post(
        "/api/auth/google",
        { token: response.credential },
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  React.useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("google-signin"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return <div id="google-signin"></div>;
};

export default LoginWithGoogle;
