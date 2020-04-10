const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config()
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    mongoose.connect(process.env.MONGO_URI);
  }
  if (process.env.NODE_ENV === 'windevelopment') {
    mongoose.connect(process.env.MONGO_URI_CLOUD);
  }  
}

// !!!order of middlewares is important
app.use(bodyParser.json()); //! above routes very important
app.use(cors());
routes(app);
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
