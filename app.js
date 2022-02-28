const express = require("express");
const path = require("path");
const sql = require("mysql");

const app = express();

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

app.listen(5001, () => {
    console.log("server started on port 5001");
});
