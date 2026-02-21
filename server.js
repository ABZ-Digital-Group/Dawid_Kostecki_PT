// CONNECT TO MONGO
const MongoClient = require('mongodb-legacy').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbname = 'hack';

// LOAD NPM PACKAGES
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
const {Console, profile} = require('console');

var nodemailer = require('nodemailer');
var cors = require('cors');
const fs = require('fs');
const creds = require('./config');
const app = express();
app.use(cors());

app.use(session({secret: 'example'}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

// CONNECT TO DB
let db;
connectDB();
async function connectDB(){
    await client.connect();
    console.log('Connected Successfully to Server');
    db = client.db(dbname);
    app.listen(8080);
    console.log('Connected to Port: 8080');
};

// RENDER PAGES

app.get('/', function(req, res){
    res.render('pages/index');
});

app.get('/martial-arts', function(req, res){
    res.render('pages/martial-arts');
});

app.get('/performance', function(req, res){
    res.render('pages/performance');
});

app.get('/online-coaching', function(req, res){
    res.render('pages/online-coaching');
});

app.get('/contact', function(req, res){
    res.render('pages/contact');
});

app.get('/test', (req, res) => {
    res.json('hi');
});



