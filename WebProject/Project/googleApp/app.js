const express = require("express");
const path = require("path");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const app = express();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;

const client = new OAuth2Client(CLIENT_ID);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Auth middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden: Invalid token" });
    req.user = user;
    next();
  });
};
// Google login endpoint
app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Create our own JWT token
    const sessionToken = jwt.sign({ email, name, picture }, JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("auth_token", sessionToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });
    res.status(200).json({
      message: "authentication successful",
      user: { email, name, picture },
    });
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
});

// Protected route example
app.get("/api/user/profile", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Logout endpoint
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logged out successfully " });
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app running http://localhost:${PORT}`);
});
