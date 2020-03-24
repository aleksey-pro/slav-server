const Client = require('../models/client');
const crypto = require('../utils/encypt');

module.exports = {

  get(req, res, next) {
    Client.find({})
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  },

  getOne(req, res, next) {
    const id = req.params.id;
    Client.findOne({ id })
      .then((data) => res.send(data))
      .catch(next);
  },

  updateOne(req, res, next) {
    const cypherId = req.params.id;
    const decryptedId = crypto.decrypt(cypherId);
    Client.findOneAndUpdate({ id: decryptedId }, { $inc: { visits: 1 }} )
      .then(res.redirect(`${process.env.CLIENT_URL}/#/client/${decryptedId}`))
      .catch(next);
  },

  edit(req, res, next) {
    const clientId = req.params.id; // match name after :
    const newData = req.body;

    Client.findOneAndUpdate({ id: clientId }, newData)
      .then(() => Client.findOne({ id:  clientId}))
      .then(client => res.send(client))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    Client.findOneAndDelete({ id: driverId })
      .then((driver) => {res.send(driver)})
      .catch(next);
  },

};
