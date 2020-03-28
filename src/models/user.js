const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
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
});


module.exports = mongoose.model('user', schema);