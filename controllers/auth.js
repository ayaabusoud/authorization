const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const { response } = require("express");



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejsas-login'
});

exports.register = (req, res) => {
    console.log(req.body);

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const Age = req.body.Age;
    const phonenumber = req.body.phonenumber;

    db.query('SELECT email FROM users WHERE email = ? ', [email] , (error , results) =>{ 
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('signup' , {
                message: 'This email already exists '
            })
        } else if(password !== passwordConfirm){
            return res.render('signup' , {
            message: 'Password does not match '
            });
        }    
        
        
  //  let hashedPassword = await bcrypt.hash(password , 8);
  //  console.log(hashedPassword);

        db.query('INSERT INTO users SET ?' , {email:email , username :username , password:password , Age :Age , phonenumber :phonenumber } , (error,results)=>{
            if(error){
                console.log(error)
            } else {
                return res.render('signup' , {
                    massage : 'User Registered'
                });
            }
        
        })
    }) 
}
