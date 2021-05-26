const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const DoguGround = require('./models/DoguGround')
const bodyParser = require("body-parser", { useNewUrlParser: true });
const methodOverride = require('method-override')
const ejsmate_engine = require('ejs-mate')



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

const app = express();


app.engine('ejs', ejsmate_engine);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get('/', (req, res) => {

    res.render('home')
})

app.get('/parkyerleri', async (req, res) => {

    const parkspots = await DoguGround.find({});
    res.render('parkspots/index', { parkspots })

})

app.post('/parkyerleri', async (req, res) => {
    const parkyeri = new DoguGround(req.body.parkyeri);
    await parkyeri.save();
    res.redirect(`/parkyerleri/${parkyeri._id}`)
})

app.get('/parkyerleri/new', (req, res) => {

    res.render('parkspots/new')
})

app.get('/parkyerleri/:id', async (req, res) => {
    const parkspot = await DoguGround.findById(req.params.id);
    res.render('parkspots/show', { parkspot })
})

app.get('/parkyerleri/:id/edit', async (req, res) => {
    const parkspot = await DoguGround.findById(req.params.id)
    res.render('parkspots/edit', { parkspot })

})

app.put('/parkyerleri/:id', async (req, res) => {
    const parkspot = await DoguGround.findByIdAndUpdate(req.params.id, { ...req.body.parkyerleri }, { new: true });
    res.redirect(`/parkyerleri/${parkspot._id}`);

})

app.delete('/parkyerleri/:id', async (req, res) => {
    const { id } = req.params;
    await DoguGround.findByIdAndDelete(id);
    res.redirect('/parkyerleri')

})


app.listen(3000, () => {

    console.log('Serving on port 3000')
})