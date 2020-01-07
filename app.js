const express = require('express');
const helmet = require('helmet')
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


//Passport config
require('./config/passport')(passport);

const {ensureAuthenticated} = require('./helpers/auth');


//Use helmet
app.use(helmet());

//Import models
const Anyag = require('./models/Anyag');
const User = require('./models/User');


//Static folder(path)
app.use(express.static(path.join(__dirname, '/public')));

//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

//Passport middleware (always put after express session)
app.use(passport.initialize());
app.use(passport.session());

//Connect flash middleware
app.use(flash());

//Global variables
app.use(function(req, res, next){
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

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
        style: "home.css"
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
        style: "earlista.css"
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
//Render Login
app.get('/login', function(req, res){
    res.render('login')
})

//Process Login
app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

//Logout user
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});


//Render Admin
app.get('/admin', ensureAuthenticated, function (req, res) {
    Anyag.find({})
        .sort({ anyagcsoport: 1, anyagfajta: 1 })
        .then((anyagok) => {
            res.render('admin', {
                anyagok: anyagok
            })
        });
});

//Add anyag
app.post('/admin/add', ensureAuthenticated, function (req, res) {
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
app.get('/admin/:id/edit', ensureAuthenticated, function (req, res) {
    Anyag.findById(req.params.id)
        .then((editanyag) => {
            res.render('admin', {
                editanyag: editanyag
            });
        })
});
//Process edit anyag
app.post('/admin/:id/edit', ensureAuthenticated, function (req, res) {
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
app.get('/admin/:id/delete', ensureAuthenticated, function (req, res) {
    Anyag.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/admin')
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});