// require packages
var mysql = require("mysql");
var inquirer = require("inquirer");
// setup mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "bapple"
});
// make connection
connection.connect();

// function to list all available products
function listProducts() {
  var query = "SELECT * FROM products WHERE stock > 0";
  connection.query(query, function (error, res, fields) {
    if (error) throw error;
    // if items exist
    if (res.length !== 0) {
      console.log("\nChecking Stock...")
      for (var i = 0; i < res.length; i++) {
        console.log("\nID: " + res[i].item_id + " | " + res[i].product_name + " | " + "Price: $" + res[i].price);
      }
      console.log();
      productChoice();
    } else {
      console.log("\nSorry. Nothing is currently in stock. Please check back soon!");
    }
  });
};

// function asks for itemID choice
function productChoice() {
  inquirer.prompt([
     {
       type: "input",
       message: "Please enter the ID of the item you wish to purchase:",
       name: "productID"
     }
    ]).then(answers => {
      findItem(answers.productID);
  });
};

// function confirms and prints itemID choice
function findItem(id) {
  var query = "SELECT * FROM products WHERE item_id = ?";
  connection.query(query, [id], function (error, res, fields) {
    if (error) throw error;
    if (res.length !== 0 && res[0].stock > 0) {
      console.log("\nsearching...")
      console.log("\nID: " + res[0].item_id + " | " + res[0].product_name + " | Price: $" + res[0].price + " | Stock: " + res[0].stock + "\n");
      quantityChoice(id);
    } else {
      console.log("\nsearching...")
      console.log("\nItem does not exist. Please select from available products.");
      listProducts();
    }
  });
};

// function asks for quantity and checks against stock
function quantityChoice(id) {
  inquirer.prompt([
     {
       type: "input",
       message: "Please enter your desired quantity:",
       name: "quantity"
     }
    ]).then(answers => {
      console.log("\nChecking Stock...");
      var query = "SELECT * FROM products WHERE item_id = ?";
      connection.query(query, [id], function (error, res, fields) {
        if (error) throw error;
        var amount = answers.quantity;
        var stock = res[0].stock;
        if (amount < 1 || amount % 1 !== 0) {
          console.log("\nPlease input valid quantity.\n");
          quantityChoice(id);
        } else if (amount > stock) {
          console.log("\nInsufficient stock to fulfill this order!");
          console.log("Requested: " + amount);
          console.log("In Stock: " + stock);
          console.log('');
          quantityChoice(id);
        } else {
          console.log("\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
          console.log("Order recieved!");
          console.log("ID: " + res[0].item_id + " | " + res[0].product_name + " | " + "Price: $" + res[0].price);
          console.log("Requested quantity: * " + amount);
          console.log("Your total amounts to: $" + res[0].price * amount);
          console.log("\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
          var deduct = stock - amount;
          stockDeduct(id, deduct);
        }
      });
  });
};

// function to deduct quantity from stock
function stockDeduct(id, deduct) {
  var query = "UPDATE products SET ? WHERE ?";
  connection.query(query, [{stock: deduct}, {item_id: id}], function (error, res, fields) {
    if (error) throw error;
    continueShopping();
  });
};

// function asks for itemID choice
function continueShopping() {
  inquirer.prompt([
     {
       type: "confirm",
       message: "Would you like to continue shopping?",
       name: "continue"
     }
    ]).then(answers => {
      if (answers.continue) {
        listProducts();
      } else {
        console.log("\nBYE!\n");
      }
  });
};

listProducts();
