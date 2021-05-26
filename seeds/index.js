const mongoose = require('mongoose');
const cities = require('./cities');
const DoguGround = require('../models/DoguGround');
const { places, descriptors } = require('./seedhelpers')

mongoose.connect('mongodb://localhost:27017/myAppDogu', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('My Database Is Connected Successfully')
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {

    await DoguGround.deleteMany({})

    for (let i = 0; i < 50; i++) {

        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const parkSpot = new DoguGround({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/190727',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Maiores sint consequuntur doloremque nisi? Asperiores quos est architecto odit voluptates commodi rem beatae nulla perspiciatis dignissimos temporibus consequatur id, aspernatur sequi.',
            price
        })
        await parkSpot.save();
    }


}

seedDB().then(() => {
    mongoose.connection.close();
})