const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorizaton");
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect(
    "mongodb+srv://Nabeel:PBpod0DW0YksU2O4@cluster0.8hou4.mongodb.net/max?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log('Database Connected...');
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
