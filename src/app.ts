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
  let listSite = ['http://www.xn--80acc6acd1bv2f.xn--p1acf','http://xn--80acc6acd1bv2f.xn--p1acf'];
  if(req.headers['origin']) {
    const origin = listSite.find(list => list === req.headers['origin'][0]) || "*";
    res.header('Access-Control-Allow-Origin', origin);
  }

  let origin = req.headers['origin'][0];
  if(listSite.indexOf(origin) > -1) {
      res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('X-Powered-By', 'O_o');
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