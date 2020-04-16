const crypto = require('crypto');
const mongoose  = require('mongoose');
const UserModel = require('../models/user');

//const mongo_uri = process.env.NODE_ENV === 'windevelopment' ? 
//  'mongodb://aleks:7a068ae27@ds123725.mlab.com:23725/slavsalon' :
//  'mongodb://aleks:asd159@127.0.0.1:27017/slavsalon';


const mongo_uri = process.env.NODE_ENV === 'windevelopment' ? 
'mongodb://aleks:7a068ae27@ds123725.mlab.com:23725/slavsalon' :
'mongodb://127.0.0.1:27017/slavsalon';


mongoose.connect(mongo_uri);

const email = 'admin@slavsalon.ru';
const password = '12345';
const role = 'admin';

// const email = 'manager@slavsalon.ru';
// const password = '123';
// const role = 'manager';

const hash = crypto.createHash('sha256');
const hashPassword = hash.update(password).digest('hex');

const user = new UserModel({
  email,
  password: hashPassword,
  role,
});

user.save();
