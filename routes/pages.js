const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signin');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.get('/forgotPass', (req, res) => {
    res.render('forgotPass');
});

router.get('/resetPass', (req, res) => {
    res.render('resetPass');
});

router.get('/home', (req, res) => {
    res.render('home');
});
module.exports = router;
