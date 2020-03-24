const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ClientSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  created: Date,
  name: String,
  visits: {
    type: Number,
    default: 1,
  },
  info: String,
  link: String,
});

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;
