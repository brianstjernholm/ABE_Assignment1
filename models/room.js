const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Room', roomSchema);