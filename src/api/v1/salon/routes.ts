import ClientsController from './clients_controler';
import authController from './authController';
import checkAuth from '../../../middlewares/verify-user-token';
import createClient from './create_client';

import { Express, Response, Request } from "express";

const salonRroutes = (app: Express) => {

  app.post('/api/v1/auth', authController);

  app.get('/api/v1/clients', checkAuth(), ClientsController.get);  

  app.get('/api/v1/qrimages', (req: Request, res: Response) => {
    try {
      const file = req.query.img;
      res.download(`${process.cwd()}/src/qrimages/${file}`);
    } catch (err) {
      console.log(err);
    }
  });

  app.get('/api/v1/client/:id', checkAuth(), ClientsController.getOne);

  // app.get('/api/v1/register/:id', checkAuth(), ClientsController.updateOne);

  app.post('/api/v1/clients', checkAuth('admin'), createClient);

  app.put('/api/v1/clients/:id', checkAuth('admin'), ClientsController.edit);

  app.delete('/api/v1/clients/:id', checkAuth('admin'), ClientsController.delete);

  // app.get('*', (req, res) => res.redirect(`${process.env.CLIENT_URL}/`));

};

export default salonRroutes;
