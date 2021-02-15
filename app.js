const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
var dotenv = require('dotenv');
dotenv.config();

const feedRoutes = require("./routes/feed");
const local = process.env.MONGO_URI_LOCAL;
const atlas = process.env.MONGO_URI_ATLAS;

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

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

app.use((error, req, res, next)=>{
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({message: message});
})

mongoose
  .connect(
    local,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log('Database Connected...');
    
  })
  .catch((err) => {
    console.log(err);
  });
  app.listen(8080);