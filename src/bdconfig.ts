import  { ConnectionOptions } from 'mongoose';

export const options: ConnectionOptions = {  
	"authSource": "admin",
	"user": process.env.MONGO_USER,
	"pass": process.env.MONGO_PASS,
	"useUnifiedTopology": true,
	"useNewUrlParser": true
};