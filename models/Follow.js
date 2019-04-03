'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const followSchema = new Schema({
  follower: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  following: {
    type: ObjectId,
    required: true,
    ref: 'User'
  }
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;