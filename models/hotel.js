const mongoose = require('mongoose');

var Room = require('./Room');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rooms: ['Room']
    //rooms: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'}
});

module.exports = mongoose.model('Hotel', hotelSchema)




