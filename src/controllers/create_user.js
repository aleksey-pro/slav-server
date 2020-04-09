const crypto = require('crypto');
const mongoose  = require('mongoose');
const UserModel = require('../models/user');

const mongo_uri = process.env.NODE_ENV === windevelopment ? process.env.MONGO_URI_CLOUD : process.env.MONGO_URI;

mongoose.connect(mongo_uri);

const email = 'admin@slavsalon.ru';
const password = '12345';

const hash = crypto.createHash('sha256');
const hashPassword = hash.update(password).digest('hex');

const user = new UserModel({
  email,
  password: hashPassword,
});

user.save();
