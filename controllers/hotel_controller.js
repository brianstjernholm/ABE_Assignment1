const hotelCollection = require('../models/hotel');
const room = require('../models/room');

module.exports.homepage = async function (req, res) {
    res.send('Hul igennem')
}

module.exports.listHotels = async function (req, res) {
    res.send('Her skal der sendes en liste med hoteller tilbage fra databasen')
}

module.exports.addHotel = async function (req, res) {
    let roomarray = [];
    for (i=0, i < req.body.number, i++) {
        roomarray.push(new room {number:[i]});
    }
    
    let hotel = await hotelCollection.create({
        name: req.body.name,
        room: [{number: req.body.roomnumber}]
    })
    res.send('tag oplysninger i body og tilføj til et nyt hotel i controller inden det skubebs til databasen')
}

module.exports.getHotel = async function (req, res) {
    res.send('get hotel matching id in url param')
}

module.exports.updateHotel = async function (req, res) {
    res.send('update hotel with info in req body matching id in url param')
}

module.exports.deleteHotel = async function (req, res) {
    res.send('delete hotel matchind id in url param')
}

//    res.status(201).json({
//    "List": "Se list of hotels at /listhotels",
//    "Add": "Add a hotel at /addHotel",
//    "Link": "http://localhost:3000/student/addHotel"

{
    'name': 'Comwell Aarhus',
    'room': [{}]
}