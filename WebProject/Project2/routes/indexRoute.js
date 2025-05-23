
const express = require("express");
const userRoutes = require("./userRoute");
const awsRoute = require("./awsRoute");
// const blogRoutes = require("./blogRoute");
// const commentRoutes = require("./commentRoute");
// const userFeatures = require("./userFeatures");
// const fileRoutes = require("./fileRoutes");
// const videoRoute = require("./videoRoute");
// const emailRoute = require("./emailRoute");
// const importRoute = require("./importRoute");
// const exportRoute = require("./exportRoute");
// const razorpayRoute = require("./razorpayRoute");

const indexRoute = express.Router();

indexRoute.use("/users", userRoutes);
indexRoute.use("/aws", awsRoute);
// indexRoute.use('/features', userFeatures);
// indexRoute.use("/blogs", blogRoutes);
// indexRoute.use("/comments", commentRoutes);
// indexRoute.use("/files", fileRoutes);
// indexRoute.use("/videos", videoRoute);
// indexRoute.use("/mail-to", emailRoute);
// indexRoute.use("/import-data", importRoute );
// indexRoute.use("/export-data", exportRoute );
// indexRoute.use("/razorpay", razorpayRoute);


module.exports = indexRoute;