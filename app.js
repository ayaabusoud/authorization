const express = require("express");
const path = require("path");
const sql = require("mysql");
const passport = require("passport");
const passPort = require("./utilities/passportAuth");


passPort(passport);


const app = express();

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());




const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejsas-login'
});
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
    console.log(req.user);
    res.redirect('/home');
  });


  app.post('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });


app.listen(5001, () => {
    console.log("server started on port 5001");
});


