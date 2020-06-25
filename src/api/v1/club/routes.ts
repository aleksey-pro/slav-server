import MembersController from './members_controller';
import createMember from './create_member';
import authController from './authController';

import { Express, Response, Request } from "express";

const clubRroutes = (app: Express) => {

  app.post('/api/v1/authMember', authController);

  app.get('/api/v1/registerMember/:id', createMember);

  app.get('/api/v1/members', MembersController.list);

  app.get('/api/v1/member/:id', MembersController.get);

  app.put('/api/v1/member/:id', MembersController.edit);

  app.get('/api/v1/register/:id', MembersController.checkQRCode);

  // app.get('*', (req, res) => res.redirect(`${process.env.CLIENT_URL}/`));

  // app.get('/api/v1/qrimages', (req: Request, res: Response) => {
  //   try {
  //     const file = req.query.img;
  //     res.download(`${process.cwd()}/src/qrimages/${file}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  // app.get('/api/v1/client/:id', checkAuth(), ClientsController.getOne);

  // app.get('/api/v1/register/:id', checkAuth(), ClientsController.updateOne);

  // app.post('/api/v1/clients', checkAuth('admin'), createClient);

  // app.put('/api/v1/clients/:id', checkAuth('admin'), ClientsController.edit);

  // app.delete('/api/v1/clients/:id', checkAuth('admin'), ClientsController.delete);


  // app.get('/api/v1/members', () => console.log('get clients'));


};

export default clubRroutes;
