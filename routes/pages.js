const express = require("express");

const router = express.Router();

const redirectLogin = (req,res,next) =>{
    if (!req.session.userID){
      res.redirect('/signin')
    }else{
        next()
    }
  }

router.get('/', (req, res) => {
    const{userID} = req.session;
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

router.get('/resendEmail', (req, res) => {
    res.render('emailVerfication');
});
module.exports = router;
