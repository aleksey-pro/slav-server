const crypto = require('crypto');
const mongoose  = require('mongoose');
const UserModel = require('../models/user');
mongoose.connect(process.env.MONGO_URI);

const email = 'admin@slavsalon.ru';
const password = '12345';

const hash = crypto.createHash('sha256');
const hashPassword = hash.update(password).digest('hex');

const user = new UserModel({
  email,
  password: hashPassword,
});

user.save();
