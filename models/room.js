const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: Number,
    available: Boolean
})

module.exports = mongoose.model('Room', roomSchema);