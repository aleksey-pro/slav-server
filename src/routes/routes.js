const path = require('path');
const ClientsController = require('../controllers/clients_controler');
const authController = require('../controllers/authController');
const checkAuth = require('../middlewares/verify-user-token');
const createClient = require('../controllers/create_client');
const app = require('../app');

module.exports = (app) => {

  app.post('/api/v1/auth', authController);

  app.get('/api/v1/clients', ClientsController.get);

  app.get('/api/v1/qrimages', (req, res, next) => {
    try {
      const file = req.query.img;
      res.download(`${process.cwd()}/src/qrimages/${file}`);
    } catch (err) {
      console.log(err);
    }
  });

  app.get('/api/v1/client/:id', checkAuth, ClientsController.getOne);

  app.get('/api/v1/register/:id', checkAuth, ClientsController.updateOne);

  app.post('/api/v1/clients', checkAuth, createClient);

  app.put('/api/v1/clients/:id', checkAuth, ClientsController.edit);

  app.delete('/api/v1/clients/:id', ClientsController.delete);

};
