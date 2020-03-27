const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Client = require('../models/client');
const crypto = require('../utils/encypt');
const generateQRCode = require('../utils/generateQRCode');

const setImageLink = (id) => {
  return `${process.env.APP_URL}/QRImages/${id}.png`;
}

const createClient = (req, res, next) =>  {
  const data = req.body;
  const id = uuidv4(); // uuid
  const encryptedId = crypto.encrypt(id);
  const link = setImageLink(id);
  const created = new Date();
  const newClient = Object.assign(data, { id, link, created });

  Client.create(newClient)
    .then((client) => {
      generateQRCode(encryptedId, id)
    })
    .then(() => res.send('ok'))
    .catch(next);
};

module.exports = createClient;
