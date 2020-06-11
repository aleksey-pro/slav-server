import * as mongoose from 'mongoose';
import { IClient } from './client';
const Schema = mongoose.Schema;


export interface IMember extends mongoose.Document {
    id: String,
    name: String,
    phone: String,
    location: String,
    nick: String,
    competence: String,
    status: String,
    registerDate: Date,
    stage: Number,    
    password: String,
    salonClient: IClient,
}

const MemberSchema = new Schema({
    id: String,
    nick: String,
    name: String,
    phone: String,    
    location: String,
    competence: String,
    status: String,
    registerDate: Date,
    stage: Number,
    password: String,
});

MemberSchema.virtual('salonClient', {
    ref: 'client',
    localField: 'id',
    foreignField: 'id',
    justOne: true,
  });

MemberSchema.set('toJSON', { virtuals: true });
MemberSchema.set('toObject', { virtuals: true });

export const Member : mongoose.Model<IMember> = mongoose.model<IMember>('member', MemberSchema);
