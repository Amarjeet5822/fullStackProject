const express = require("express");
const cors = require("cors");
const session = require("express-session");
const userRoute = require("./routes/userRoute");
// const store = new session.MemoryStore();

const app = express();
// app.use(session({
//   secret:"cap01",
//   cookie: {maxAge:300000 },
//   saveUninitialized:false,
//   store
// }));

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("You are at Home Page.");
// });

app.use(userRoute);
app.listen(8082, async () => {
  try {
    // await connectdb();
    console.log("app running http://localhost:8082");
  } catch (error) {
    console.log("Error in connecting db");
  }
});
