// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LoginWithGoogle from "./pages/loginWithGoogle";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/user/profile", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Google Login Auth App</h1>
      {user ? (
        <div>
          <img src={user.picture} alt="profile" style={{ borderRadius: "50%", width: 80 }} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginWithGoogle setUser={setUser} />
      )}
    </div>
  );
}

export default App;
