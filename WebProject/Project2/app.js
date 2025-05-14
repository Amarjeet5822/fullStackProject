const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/db");
require("dotenv").config();
const indexRoute = require("./routes/indexRoute");
const { webhookController } = require("./controllers/webhookControllers");
const arena = require("./queue/arenadashboard");

const app = express();
app.use(cors());
app.post("/webhook", express.raw({ type: "application/json" }), webhookController );
app.use(express.json());
// Set EJS as the view engine
app.set("view engine", "ejs");

// Optional: Set views directory (default is ./views)
app.set("views", path.join(__dirname, "views"));

app.use("/arena", arena);
app.use(indexRoute);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    console.log(`App running at http://localhost:${PORT}`);
    await sequelize.sync({ logging: true });
    console.log("model is sync and users db created");
  } catch (error) {
    console.log("Error : ", error.message);
  }
});