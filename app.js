const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//Import models
const Anyag = require('./models/Anyag');

//Static folder(path)
app.use(express.static(path.join(__dirname, '/public')));

//Load helpers
const { anyagcsoport, select } = require('./helpers/hbs');
//Handlebars middleware
app.engine('handlebars', exphbs({
    helpers: {
        anyagcsoport: anyagcsoport,
        select: select
    }
}));
app.set('view engine', 'handlebars');

//MongoDB setup
//Mongoose
mongoose.connect('mongodb://creatoadmin:creatoadmin2005@ds211774.mlab.com:11774/creatoweb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
//Render homepage
app.get('/', function (req, res) {
    res.render('home', {
    })
});

//////Felvásárlás//////
//Render Femkereskedelem
app.get('/fem', function (req, res) {
    res.render('fem', {
    })
});
//Render Elektronikai Felvasarlas
app.get('/elektronikaifelv', function (req, res) {
    res.render('elektronikaifelv', {
    })
});

//Render Papir Felvasarlas
app.get('/papirfelv', function (req, res) {
    res.render('papirfelv', {
    })
});

///////////Atvetel//////////
//Render Elektronikai Atvetel
app.get('/elektronikaiatv', function (req, res) {
    res.render('elektronikaiatv', {
    })
});

//Render Papir Atvetel
app.get('/papiratv', function (req, res) {
    res.render('papiratv', {
    })
});

//Render Szolgaltatas
app.get('/szolgaltatas', function (req, res) {
    res.render('szolgaltatas', {
    })
});

//Render Árlista
app.get('/arlista', function (req, res) {
    Anyag.find({})
        .sort({ anyagcsoport: 1, anyagfajta: 1 })
        .then((anyagok) => {
            res.render('arlista', {
                anyagok: anyagok
            })
        })
});

//Render Elektronikai Hulladék Árlista
app.get('/earlista', function (req, res) {
    res.render('earlista',{
    })
});

//Render Szállítási és Irodai papírhulladék megsemmisítési díjak
app.get('/szallitasarlista', function (req, res) {
    res.render('szallitasarlista',{
    })
});


//Render Engedelyek
app.get('/engedelyek', function (req, res) {
    res.render('engedelyek', {
    })
});

//Render Kapcsolat
app.get('/kapcsolat', function (req, res) {
    res.render('kapcsolat', {
    })
});

///////////////////////////Admin, anyaghozzaadas, modosítas, torles////////////////////////
//Render Admin
app.get('/admin', function (req, res) {
    Anyag.find({})
        .sort({ anyagcsoport: 1, anyagfajta: 1 })
        .then((anyagok) => {
            res.render('admin', {
                anyagok: anyagok
            })
            console.log(anyagok);
        });
});

//Add anyag
app.post('/admin/add', function (req, res) {
    let ujAnyag = new Anyag({
        anyagcsoport: req.body.anyagcsoport,
        anyagfajta: req.body.anyagfajta,
        lakossagiar: req.body.lakossagiar
    })
    ujAnyag.save()
        .then(() => {
            res.redirect('/admin')
        })
});

//Render edit anyag
app.get('/admin/:id/edit', function (req, res) {
    Anyag.findById(req.params.id)
        .then((editanyag) => {
            res.render('admin', {
                editanyag: editanyag
            });
            console.log(editanyag);
        })
});
//Process edit anyag
app.post('/admin/:id/edit', function (req, res) {
    const editAnyag = {
        anyagcsoport: req.body.anyagcsoport,
        anyagfajta: req.body.anyagfajta,
        lakossagiar: req.body.lakossagiar
    }

    Anyag.findByIdAndUpdate({ _id: req.params.id }, editAnyag)
        .then(() => {
            res.redirect('/admin');
        })
});

//Delete anyag
app.get('/admin/:id/delete', function (req, res) {
    Anyag.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/admin')
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});