const hotelCollection = require('../models/hotel');
const userCollection = require('../models/user')
const room = require('../models/room');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require("../roles");

module.exports.homepage = async function (req, res) {
    res.send('Hul igennem')
}

module.exports.listHotels = async function (req, res) {
    var hotels = hotelCollection.find({})
        .populate('rooms')
        .exec((err, hotels) => {
            if (err) { res.send({ error: err.message }); }
            else { res.send(hotels); }
        });
}


module.exports.addHotel = async function (req, res) {
    //var roomarray = [];
    //console.log(req.body.number);
    
    const newHotel = new hotelCollection({name: req.body.name});
    console.log(newHotel);

    for (i=1; i <= req.body.number; i++) {
        var newRoom = new room({number: i});
        //roomarray.push(tempRoom);
        newHotel.rooms.push(newRoom);
    };

    const savedDoc = await newHotel.save();
    console.log(savedDoc);
    
    // let hotel = await hotelCollection.create({
    //     name: req.body.name,
    //     room: roomarray
    // })

    res.json(savedDoc)
    res.send('tag oplysninger i body og tilføj til et nyt hotel i controller inden det skubebs til databasen')
}

module.exports.getHotel = async function (req, res) {
        hotel = hotelCollection.find({ name: req.body.name })
        .populate('rooms')
        .exec((err, hotel) => {
            if (err) { res.send({ error: err.message }); }
            else { res.send(hotel); }
        });
}

module.exports.updateHotel = async function (req, res) {
    res.send('update hotel with info in req body matching id in url param')
}

module.exports.deleteHotel = async function (req, res) {
    const hotelid = req.body.hotelid
    var removed = await hotelCollection.findByIdAndRemove(hotelid)
    res.send(removed)
    //res.send(req.body.name)
}


exports.grantAccessHotel = function(action, resource) {
    return async (req, res, next) => {
     try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "Du har ikke tilstrækkelig rettigheder"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
}

//    res.status(201).json({
//    "List": "Se list of hotels at /listhotels",
//    "Add": "Add a hotel at /addHotel",
//    "Link": "http://localhost:3000/student/addHotel"


// exports.grantAccessHotel = function(action, resource) {
//     return async (req, res, next) => {
//      try {
//       const dbUser = await userCollection.find({_id: req.body.id});
//       console.log(dbUser);
//       const permission = roles.can(dbUser.role)[action](resource);
//       if (!permission.granted) {
//        return res.status(401).json({
//         error: "Du har ikke tilstrækkelig rettigheder"
//        });
//       }
//       next()
//      } catch (error) {
//       next(error)
//      }
//     }
// }