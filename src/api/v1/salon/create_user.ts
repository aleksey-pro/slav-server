import { createHash } from 'crypto';
import { connect } from 'mongoose';
import { User as UserModel } from '../../../models/user';
import { options } from '../../../bdconfig';

const mongo_uri = process.env.NODE_ENV === 'windevelopment' ? 
 'mongodb://aleks:7a068ae27@ds123725.mlab.com:23725/slavsalon' :
 'mongodb://localhost:27017/slavsalon';

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
