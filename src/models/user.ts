import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string,
  password: string,
  createdAt: Date,
  role: string,
  _id: string,
}

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: String,
});

export const User : mongoose.Model<IUser> = mongoose.model<IUser>('user', userSchema);
