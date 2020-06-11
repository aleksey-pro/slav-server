import * as crypto from 'crypto';
import { sign } from '../../..//utils/jwt-util';
import { Member as MemberModel } from '../../../models/member';
import { Request, Response, NextFunction } from "express";

const authController = (req: Request, res: Response, next: NextFunction) => {

  const { nick, password } : { nick: string, password: string } = req.body;

  const hash = crypto.createHash('sha256');
  const hashPassword = hash.update(password).digest('hex');
  
  MemberModel
    .findOne({ nick })
    .then(member => {
      if (member) {
        if (member.password !== hashPassword) {
          // res.send({ error: true });
          res.send('User not found');
        }
        const token: string = sign(
          {
            id: member.id,
            nick,
          }
        );
        res.send({ token, id: member.id, error: '' });
      } else res.send({ error: 'User not found' });
    })
    .catch(next);
};

export default authController;
