const express = require("express");
const path = require("path");
const sql = require("mysql");
const passport = require("passport");
const passPort = require("./utilities/passportAuth");
const dotenv = require("dotenv");
const session = require ('express-session');
const bodyParser = require("body-parser");

const two_hours = 1000*60*60*2;

const{
  session_lifetime = two_hours,
  Node_env ='development',
  sess_name = 'sid',
  sess_secret ='ssh!quiet,it\'asecret!'
} = process.env

const IN_PROD = Node_env === 'production'
app.use(bodyParser.urlencoded({
  extended:true
}))

app.use(session({
  name :sess_name,
  resave: false,
  saveUninitialized:false,
  secret:sess_secret,
  cookie:{
    maxAge:session_lifetime,
    sameSite: true,
    secure : IN_PROD
  }
}))


passPort(passport);

const app = express();

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());




dotenv.config({ path:'./.env' });

const db = sql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})


const publicDirectory = path.join(__dirname, './public')
    // console.log(__dirname);
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL connected ...")
    }
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile']  }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user);
    res.redirect('/home');
  });


  app.post('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });


app.listen(5001, () => {
    console.log("server started on port 5001");
});


