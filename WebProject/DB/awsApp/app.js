const express = require("express");
const indexRoute = require("./routes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/", indexRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("app running at http://localhost:8000"));