'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tuitSchema = new Schema({
    info: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Tuit = mongoose.model('Tuit', tuitSchema);

module.exports = Tuit;