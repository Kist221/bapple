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

// In case I want to import customer program
// var custom = require("./bappleCustomer.js")
// custom();

// function asks for itemID choice
function managerMenu() {
  inquirer.prompt([
     {
       type: "list",
       message: "Manager Options:",
       choices: ["View Products", "View Low Inventory", new inquirer.Separator(), "Add Inventory", "Add New Product", new inquirer.Separator(), "EXIT"],
       name: "choice"
     }
    ]).then(answers => {
    	if (answers.choice === "View Products") {
    		listProducts();
    	} else if (answers.choice === "View Low Inventory") {
    		lowInventory();
    	} else if (answers.choice === "Add Inventory") {
    		
    	} else if (answers.choice === "Add New Product") {
    		
    	} else if (answers.choice === "EXIT") {
    		console.log("\nBYE!\n");
    	} else {
    		managerMenu();
    	}
  });
};

managerMenu();

// function to list all products
function listProducts() {
  var query = "SELECT * FROM products";
  connection.query(query, function (error, res, fields) {
    if (error) throw error;
    // if items exist
    if (res.length !== 0) {
      console.log("\nChecking Stock...")
      for (var i = 0; i < res.length; i++) {
        console.log("\nID: " + res[i].item_id + " | " + res[i].product_name + " | Price: $" + res[i].price + " | Stock: " + res[i].stock);
      }
      console.log();
    } else {
      console.log("\nSorry. Nothing is currently in stock. Please check back soon!");
    }
    managerMenu();
  });
};


// function to list all low inventory (stock) products
function lowInventory() {
	// changed my low inventory criteria to 10 not 5
  var query = "SELECT * FROM products WHERE stock < 10";
  connection.query(query, function (error, res, fields) {
    if (error) throw error;
    // if items exist
    if (res.length !== 0) {
      console.log("\nChecking Stock...");
      console.log("\nLow Inventory:")
      for (var i = 0; i < res.length; i++) {
        console.log("\nID: " + res[i].item_id + " | " + res[i].product_name + " | Price: $" + res[i].price + " | Stock: " + res[i].stock);
      }
      console.log();
    } else {
      console.log("\nAll Stock Above Minimum Threshhold!\n");
    }
    managerMenu();
  });
};
