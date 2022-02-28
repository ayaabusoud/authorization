const express = require("express");
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/signup', authController.register)
router.post('/forgotPass', authController.forgotPass)
router.post('/resetPass', authController.resetPass)
router.post('/signin', authController.signin)
module.exports = router;
