import { createHash } from 'crypto';
import { connect } from 'mongoose';
import { User as UserModel } from '../models/user';
import  { ConnectionOptions } from 'mongoose';

const mongo_uri = process.env.NODE_ENV === 'windevelopment' ? 
'mongodb://aleks:7a068ae27@ds123725.mlab.com:23725/slavsalon' :
 process.env.MONGO_URI;

const options: ConnectionOptions = {  
  "user": process.env.MONGO_USER,
  "pass": process.env.MONGO_PASS,
  "useUnifiedTopology": true,
  "useNewUrlParser": true
};


connect(mongo_uri, options);

// const email = 'admin@slavsalon.ru';
// const password = '12345';
// const role = 'admin';


const email = 'manager@slavsalon.ru';
const password = '123';
const role = 'manager';

const hash = createHash('sha256');
const hashPassword = hash.update(password).digest('hex');

const user = new UserModel({
  email,
  password: hashPassword,
  role,
});

user.save();
