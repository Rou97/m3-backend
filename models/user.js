'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // follows: [
  //   {
  //     type: ObjectId,
  //     ref: 'User'
  //   }],
  tuits: [{
      type: ObjectId,
      ref: 'Tuit'
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;