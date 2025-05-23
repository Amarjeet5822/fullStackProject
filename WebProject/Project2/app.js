const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const indexRoute = require("./routes/indexRoute");
const { webhookController } = require("./controllers/webhookControllers");
const arena = require("./queue/arenadashboard");
const serverAdapter = require("./queue/bullDashboard");

const app = express();

app.use(cors(
  {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "Content/Type": "Application/json",
  "optionsSuccessStatus": 204
}));

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookController
);
app.use("/", arena);
app.use("/admin/queues", serverAdapter.getRouter());

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
// Set EJS as the view engine
app.set("view engine", "ejs");

// Optional: Set views directory (default is ./views)
app.set("views", path.join(__dirname, "views"));

app.use(indexRoute);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    console.log(`App running at http://localhost:${PORT}`);
    console.log("📊 Bull Board at http://localhost:8080/admin/queues");
    // console.log("model is sync and users db created");
  } catch (error) {
    console.log("Error : ", error.message);
  }
});
