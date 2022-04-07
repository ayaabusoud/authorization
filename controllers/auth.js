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
exports.resendEmail= (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'webbreakers2@gmail.com',
          pass: 'web2backend'
        },
        tls : { rejectUnauthorized: false }
      });
      
      const mailOptions = {
        from: 'webbreakers2@gmail.com',
        to: req.body.email,
        subject: 'Email verfication',
        text: 'Hello! \n To start exploring our website please click on this link http://localhost:5001/home\n from webbreakers team'
        
      };
     

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.render('emailVerfication' , {
            message: 'We have resend the email please check it out '
            });
        }
      });
}
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
        
        
    //let hashedPassword = await bcrypt.hash(password , 8);
    // console.log(hashedPassword);
        
        db.query('INSERT INTO users SET ?' , {email:email , username :username , password:password , Age :Age , phonenumber :phonenumber } , (error,results)=>{
            if(error){
                console.log(error)
            } else {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'webbreakers2@gmail.com',
                      pass: 'web2backend'
                    },
                    tls : { rejectUnauthorized: false }
                  });
                  
                  const mailOptions = {
                    from: 'webbreakers2@gmail.com',
                    to: req.body.email,
                    subject: 'Email verfication',
                    text: 'Hello! \n To start exploring our website please click on this link http://localhost:5001/home\n from webbreakers team'
                    
                  };
                 
    
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      res.render('emailVerfication');
                    }
                  });
            }
        
        })
    }) 
}

exports.forgotPass = (req, res) => {
    const email = req.body.email;
    db.query('SELECT * FROM users WHERE email = ? ', [email] , (error , results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            
           const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'webbreakers2@gmail.com',
                  pass: 'web2backend'
                },
                tls : { rejectUnauthorized: false }
              });
              
              const mailOptions = {
                from: 'webbreakers2@gmail.com',
                to: req.body.email,
                subject: 'Reset your password',
                text: 'Hello \n please reset your password using this link http://localhost:5001/resetPass\n from webbreakers team'
                
              };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  return res.render('forgotPass' , {
                  message: 'check your email to reset your password.'
                })
                }
              });

        }
        else{
            return res.render('forgotPass' , {
                message: 'email does not exists.'
              })
    }
    })
}



exports.resetPass = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    if(password !== passwordConfirm){
        return res.render('resetPass' , {
            massage : 'password does not match.'
        });
    }
    db.query('SELECT email FROM users WHERE email = ? ', [email] , (error , results) =>{ 
        if(error){
            console.log(error);
        }
        else if(results.length > 0){
            db.query('UPDATE users SET password = ? WHERE email = ?', [password, email], function (err, result) {
                if (err) throw err;
                console.log(result);
                res.render('signin');
              });

        }
        else{
            return res.render('resetPass' , {
                message: 'email does not exists.'
              })
        } 

    })

}




// login area
exports.signin = (req, res) => {
    console.log(req.body);
    const { email , password} = req.body;
    db.query('SELECT * FROM users WHERE email  = ? AND password = ? ', [email, password] , (error , results) =>{
       if(error){
             console.log(error);
        }
         if(results.length > 0){
             req.session.userID = req.body;
             return res.render('home')            
        }
        else {
            return res.render('signin' , {
                message: 'There is wrong with the password or the username.'
              })
        }
    })
}


// GOOGLE SIGN IN

exports.google = (req,res) => {

res.send('this google');
}
