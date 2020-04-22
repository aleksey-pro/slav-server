import ClientsController from '../controllers/clients_controler';
import authController from '../controllers/authController';
import checkAuth from '../middlewares/verify-user-token';
import createClient from '../controllers/create_client';

import { Express, Response, Request } from "express";

const routes = (app: Express) => {

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

  app.get('/api/v1/register/:id', checkAuth(), ClientsController.updateVisit);

  app.post('/api/v1/clients', checkAuth('admin'), createClient);

  app.put('/api/v1/clients/:id', checkAuth('admin'), ClientsController.edit);

  app.delete('/api/v1/clients/:id', checkAuth('admin'), ClientsController.delete);

};

export default routes;
