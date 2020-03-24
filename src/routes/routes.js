const path = require('path');
const ClientsController = require('../controllers/clients_controler');
const createClient = require('../controllers/create_client');
const app = require('../../app');

module.exports = (app) => {

  app.get('/api/v1/clients', ClientsController.get);

  app.get('/public/*', (req, res, next) => {
    const filePath = req.path;
    res.download(`${process.cwd()}/${filePath}`);
  });

  app.get('/api/v1/client/:id', ClientsController.getOne);

  app.get('/api/v1/register/:id', ClientsController.updateOne);

  app.post('/api/v1/clients', createClient);

  app.put('/api/v1/clients/:id', ClientsController.edit);

  app.delete('/api/v1/clients/:id', ClientsController.delete);

};
