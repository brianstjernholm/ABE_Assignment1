const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel_controller');
const hotel = require('../models/hotel');

router.route('')
    .get(hotelController.listHotels)
    .post(hotelController.addHotel);

router.route('/:hotelid')
    .get(hotelController.getHotel)
    .put(hotelController.updateHotel)
    .delete(hotelController.deleteHotel)

module.exports = router;