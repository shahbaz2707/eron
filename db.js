var mysql = require('mysql');

export const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hasher@123",
  database: "eron"
});
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customer", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });