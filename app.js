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

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
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
