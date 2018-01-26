var mysql = require("mysql");
var inquire = require("inquire");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "bapple"
});
connection.connect();

function listProducts() {
  connection.query('SELECT * FROM products', function (error, res, fields) {
    if (error) throw error;
    console.log(res);
    // for (var i = 0; i < res.length; i++) {
    // 	console.log("\nPosition: " + res[i].position);
    // }
    console.log(res.length);
  });
};


