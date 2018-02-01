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
    		productChoice();
    	} else if (answers.choice === "Add New Product") {
    		newDetails();
    	} else if (answers.choice === "EXIT") {
    		console.log("\nBYE!\n");
    	} else {
    		managerMenu();
    	}
  });
};

// function to list all products
function listProducts() {
  var query = "SELECT * FROM products";
  connection.query(query, function (error, res, fields) {
    if (error) throw error;
	console.log("\nChecking Stock...");
	for (var i = 0; i < res.length; i++) {
	  console.log("\nID: " + res[i].item_id + " | " + res[i].product + " | Price: $" + res[i].price + " | Stock: " + res[i].stock);
	}
	console.log();
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
        console.log("\nID: " + res[i].item_id + " | " + res[i].product + " | Price: $" + res[i].price + " | Stock: " + res[i].stock);
      }
      console.log();
    } else {
      console.log("\nChecking Stock...");
      console.log("\nAll Stock Above Minimum Threshhold!\n");
    }
    managerMenu();
  });
};

// function asks for itemID choice
function productChoice() {
  inquirer.prompt([
     {
       type: "input",
       message: "Enter ID of product to add inventory:",
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
    if (res.length !== 0) {
      console.log("\nsearching...")
      console.log("\nID: " + res[0].item_id + " | " + res[0].product + " | Stock: " + res[0].stock + "\n");
      quantityChoice(id);
    } else {
      console.log("\nsearching...")
      console.log("\nProduct does not exist. Enter valid product ID.");
      productChoice();
    }
  });
};

// function asks for quantity and checks against stock
function quantityChoice(id) {
  inquirer.prompt([
     {
       type: "input",
       message: "Add quantity of:",
       name: "quantity"
     }
    ]).then(answers => {
      var query = "SELECT * FROM products WHERE item_id = ?";
      connection.query(query, [id], function (error, res, fields) {
        if (error) throw error;
        var stock = res[0].stock;
        var amount = answers.quantity;
        if (amount < 1 || amount % 1 !== 0) {
          console.log("\nPlease input valid quantity.\n");
          quantityChoice(id);
        } else {
          console.log("\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
          console.log("Stock Added!");
          console.log("ID: " + res[0].item_id + " | " + res[0].product);
          console.log("Previous: " + stock)
          console.log("Added: +" + amount);
          console.log("Current Inventory: " + (+stock + +amount));
          console.log("\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
          var add = +stock + +amount;
          stockAdd(id, add);
        }
      });
  });
};

// function to add quantity to stock
function stockAdd(id, add) {
  var query = "UPDATE products SET ? WHERE ?";
  connection.query(query, [{stock: add}, {item_id: id}], function (error, res, fields) {
    if (error) throw error;
    managerMenu();
  });
};

// function asks for new item specs
function newDetails() {
  inquirer.prompt([
     {
       type: "input",
       message: "Enter name of new product:",
       name: "name"
     },
     {
       type: "input",
       message: "Enter price of new product: $",
       name: "price"
     },
     {
       type: "list",
       message: "Select department of new product:",
       choices: ["Computers", "Handheld", "Music", "Other"],
       name: "dept"
     },
     {
       type: "input",
       message: "Enter amount of new product inventory:",
       name: "stock"
     },
    ]).then(answers => {
      console.log(answers);
      newItem(answers.name, answers.price, answers.dept, answers.stock);
  });
};

// function to add quantity to stock
function newItem(name, price, dept, stock) {
  var query = "INSERT INTO products SET ?";
  var item = {product: name, price: price, department: dept, stock: stock};
  connection.query(query, item, function (error, res, fields) {
    if (error) throw error;
    managerMenu();
  });
};

// invoke the MANAGER PROGRAM!!!
managerMenu();