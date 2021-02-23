const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
var dotenv = require("dotenv");
dotenv.config();

const feedRoutes = require("./routes/feed");
const feedMiddleware = require("./middleware/feed");
const local = process.env.MONGO_URI_LOCAL;
const atlas = process.env.MONGO_URI_ATLAS;

const app = express();

app.use(bodyParser.json());
app.use(
  multer({
    storage: feedMiddleware.fileStorage,
    fileFilter: feedMiddleware.fileFilter,
  }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(feedMiddleware.cors);
app.use(feedMiddleware.errorHandeler);
app.use("/feed", feedRoutes);

mongoose
  .connect(local, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(8080);
