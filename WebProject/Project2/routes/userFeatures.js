const express = require("express");
const { userSearch, userFilter } = require("../controllers/featuresControllers");

const userFeatures = express.Router();

userFeatures.get("/search", userSearch);
userFeatures.get("/filter", userFilter);

module.exports = userFeatures;