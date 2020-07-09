import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import { options } from './bdconfig';

import salonRroutes from './api/v1/salon/routes';
import clubRroutes from './api/v1/club/routes';

const app = express();
import { Response, Request, NextFunction } from "express";

if (process.env.NODE_ENV !== 'test') {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    connect(process.env.MONGO_URI, options, (): void => console.log(`MongoDb at ${process.env.MONGO_URI}`));
  }
  if (process.env.NODE_ENV === 'windevelopment') {
    connect(process.env.MONGO_URI_CLOUD, (): void => console.log(`MongoDb at ${process.env.MONGO_URI_CLOUD}`));
  }
}


const allowCrossDomain = function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', 'http://xn--80aaf8admgsd3i.xn--p1acf');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, CREATE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

// !!!order of middlewares is important
app.use(bodyParser.json()); //! above routes very important
// app.use(cors());
app.use(allowCrossDomain);
salonRroutes(app);
clubRroutes(app);
// app.use((err, req: Request, res: Response): void => {
//   res.status(422).send({ error: 'Server Error' });
// });

// fix to make tests work (not export default!)
module.exports =  app;