const express = require('express')
const router = express.Router();
const mysql = require('mysql')
// const db = require('./db')
const app = express()
const port = 5000

app.use(express.json({extended: false}));


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hasher@123",
    database: "eron"
  });

  
  

app.get('/customers', (req, res) => {
    try{
        con.connect(function(err) {
            con.query("SELECT * FROM customer", function (err, result, fields) {
              console.log(result);
              res.json(result);
            });
          });

    } catch(err){
        console.log(err);
    }
   
    // res.send('hello worlds ');
});

app.post('/add', (req, res) => {
    console.log('req--------------', req.body);
    const {name, city, dob, mobile} = req.body;
    // res.send('everything ok');
    try{
        con.connect(function(err) {
            var sql = `INSERT INTO customer (name, city, dob, mobile) VALUES ('${name}', '${city}', '${dob}', '${mobile}')`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted, ID: " + result.insertId);
                res.json(result);
            });
          });

    } catch(err){
        console.log(err);
    }
   
    // res.send('hello worlds');
});

app.post('/delete', (req, res) => {
    console.log('req--------------', req.body.id);
    const {customerId} = req.body;
    // res.send('everything ok');
    try{
        con.connect(function(err) {
            var sql = `DELETE FROM customer WHERE id='${customerId}'`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record deleted");
                res.json(result);
            });
          });

    } catch(err){
        console.log(err);
    }
   
    // res.send('hello worlds');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))