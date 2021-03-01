const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel_controller');
const hotel = require('../models/hotel');

var jwt = require('express-jwt');
var auth = jwt({
secret: process.env.JWT_SECRET,
algorithms: ["HS256"]
});

router.route('')
    .get(auth, hotelController.listHotels)
    .post(hotelController.addHotel)
    .delete(hotelController.deleteHotel)

// router.route('/:hotelid')
//     .get(hotelController.getHotel)
//     .put(hotelController.updateHotel)
//     .delete(hotelController.deleteHotel)

module.exports = router;