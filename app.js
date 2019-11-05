const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

//Static folder(path)
app.use(express.static(path.join(__dirname, '/public')));

//Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Routes
//Render homepage
app.get('/', function (req, res) {
    res.render('home', {
    })
});

//////Felvásárlás//////
//Render Femkereskedelem
app.get('/fem', function(req, res){
    res.render('fem',{
    })
});
//Render Elektronikai Felvasarlas
app.get('/elektronikaifelv', function(req, res){
    res.render('elektronikaifelv',{
    })
});

//Render Papir Felvasarlas
app.get('/papirfelv', function(req, res){
    res.render('papirfelv',{
    })
});

///////////Atvetel//////////
//Render Elektronikai Atvetel
app.get('/elektronikaiatv', function(req, res){
    res.render('elektronikaiatv',{
    })
});

//Render Papir Atvetel
app.get('/papiratv', function(req, res){
    res.render('papiratv',{
    })
});

//Render Szolgaltatas
app.get('/szolgaltatas', function(req, res){
    res.render('szolgaltatas',{
    })
});

//Render Engedelyek
app.get('/engedelyek', function(req, res){
    res.render('engedelyek',{
    })
});

//Render Kapcsolat
app.get('/kapcsolat', function(req, res){
    res.render('kapcsolat',{
    })
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});