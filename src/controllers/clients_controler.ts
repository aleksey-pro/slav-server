import { Client as ClientModel } from '../models/client';
const crypto = require('../utils/encrypt');

import { Request, Response, NextFunction } from "express";
import { IClient } from '../models/client';

const ClientsController = {

  get(req: Request, res: Response, next: NextFunction) {
    ClientModel.find({})
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  },

  getOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    ClientModel.findOne({ id })
      .then((data) => res.send(data))
      .catch(next);
  },

  updateOne(req: Request, res: Response, next: NextFunction) {
    const cypherId = req.params.id;
    const decryptedId = crypto.decrypt(cypherId);
    ClientModel.findOneAndUpdate({ id: decryptedId }, { $inc: { visits: 1 }} )
      .then(() => res.redirect(`${process.env.CLIENT_URL}/admin/#/client/${decryptedId}`))
      .catch(next);
  },

  edit(req: Request, res: Response, next: NextFunction) {
    const clientId = req.params.id;
    const newData : IClient = req.body;
    ClientModel.findOne({ id: clientId})
      .then(client => {
        const { bonuses } = client;
        const { bonusesToAdd } = newData;
        const bonusesTotal = bonuses || 0 + Number(bonusesToAdd);
        const updatedData = Object.assign(newData, { bonuses: bonusesTotal });
        // console.log("edit -> updatedData", updatedData)
        ClientModel.findOneAndUpdate({ id: clientId }, updatedData)
          .then(() => ClientModel.findOne({ id:  clientId}))
          .then(client => res.send(client))
      })
      .catch(next);
  },

  delete(req: Request, res: Response, next: NextFunction) {
    const clientId = req.params.id;
    ClientModel.findOneAndDelete({ id: clientId })
      .then(client => {res.send(client)})
      .catch(next);
  },

};

export default ClientsController;
