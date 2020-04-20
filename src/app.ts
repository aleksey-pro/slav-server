import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/routes';

const app = express();
import { Response } from "express";

const options = {
  "user": process.env.MONGO_USER,
  "pass": process.env.MONGO_PASS,
  "useUnifiedTopology": true,
  "useNewUrlParser": true,
  "useCreateIndex": true,
};

if (process.env.NODE_ENV !== 'test') {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    connect(process.env.MONGO_URI, options, (): void => console.log(`MongoDb at ${process.env.MONGO_URI}`));
  }
  if (process.env.NODE_ENV === 'windevelopment') {
    connect(process.env.MONGO_URI_CLOUD, (): void => console.log(`MongoDb at ${process.env.MONGO_URI_CLOUD}`));
  }  
}

// !!!order of middlewares is important
app.use(bodyParser.json()); //! above routes very important
app.use(cors());
routes(app);
app.use((err, res: Response): void => {
  res.status(422).send({ error: 'Server Error' });
});

export default app;