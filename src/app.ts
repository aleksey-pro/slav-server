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
import { Response, Request } from "express";

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
salonRroutes(app);
clubRroutes(app);
// app.use((err, req: Request, res: Response): void => {
//   res.status(422).send({ error: 'Server Error' });
// });

// fix to make tests work (not export default!)
module.exports =  app;