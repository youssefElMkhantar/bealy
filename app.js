const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI;

const app = express();
app.use(express.json());

const foodRoutes = require('./routes/food');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));

app.use( (req, res, next) => {
  next();
})

app.use(foodRoutes);
app.use(userRoutes);


mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    console.log('app listening on port 4000')
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
