import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IClient extends mongoose.Document {
  id: string,
  created: Date,
  name: string,
  visits: number,
  bonuses: number,
  bonusesToAdd: string,
  info: string,
  link: string,
  _id: string,
  orderNum: number,
  rating: number,
}

const ClientSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  orderNum: Number,
  created: Date,
  name: String,
  visits: {
    type: Number,
    default: 1,
  },
  bonuses: {
    type: Number,
    default: 0,
  },
  bonusesToAdd: {
    type: String,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,  
  },
  info: String,
  link: String,
});

export const Client : mongoose.Model<IClient> = mongoose.model<IClient>('client', ClientSchema);
