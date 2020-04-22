const crypto = require('../utils/encrypt');
import { v4 as uuidv4 } from 'uuid';
import { Client as ClientModel } from '../models/client';
import { generateQRCode } from '../utils/generateQRCode';

import { Request, Response, NextFunction } from "express";

const setImageLink = (id: string) => {
  return `${process.env.APP_URL}/api/v1/qrimages?img=${id}.png`;
}

const createClient = (req: Request, res: Response, next: NextFunction) =>  {
  const data : { name: string } = req.body;
  const id = uuidv4();
  const encryptedId = crypto.encrypt(id);
  const link = setImageLink(id);
  const created = new Date();
  const newClient = Object.assign(data, { id, link, created });

  ClientModel.create(newClient)
    .then(() => generateQRCode(encryptedId, id))
    .then(() => res.send('ok'))
    .catch(next);
};

export default createClient;
