const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DoguGroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,

});

module.exports = mongoose.model('DoguGround', DoguGroundSchema);