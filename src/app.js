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
  mongoose.connect('mongodb://localhost/slavsalon');
}

// !!!order of middlewares is important
app.use(bodyParser.json()); //! above routes very important
app.use(cors());
routes(app);
app.use(express.static(path.join(__dirname, "public")));
//  Error catch middleware, thatconsole.log(process.env.APP_PORT); after routes, after request object and before response object
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message }); // вернет ошибку в ответ сервера
   // next()
});

module.exports = app;
