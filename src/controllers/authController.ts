import * as crypto from 'crypto';
import { sign } from '../utils/jwt-util';
const mongoose = require('mongoose');
import { options } from '../bdconfig';
import { User as UserModel } from '../models/user';
import { Request, Response, NextFunction } from "express";

const authController = (req: Request, res: Response, next: NextFunction) => {

  // PRODUCTION SERVER BUG FIX (TODO)  
  if(process.env.NODE_ENV === 'production') {
    mongoose.connect(process.env.MONGO_URI, options, (): void => console.log(`MongoDb at ${process.env.MONGO_URI}`));
  }

  const { email, password } : {email: string, password: string} = req.body;
  const role = email.split('@')[0];

  const hash = crypto.createHash('sha256');
  const hashPassword = hash.update(password).digest('hex');
  
  UserModel
    .findOne({ email })
    .then(user => {
      if (user) {
        if (user.password !== hashPassword) {
          // res.send({ error: true });
          res.send('User not found');
        }
        const token: string = sign(
          {
            id: user._id,
            email,
            role,
          }
        );
        res.send({ token });
      }
    })
    .catch(next);
};

export default authController;
