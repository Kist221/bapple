# bapple
An Apple Store Knockoff

- - -

# Using Node.js & MySQL 

## Overview

An Apple-like storefront with a MySQL database to track inventory. The app takes in orders from customers and deplete stock from the store's inventory.

### Customer View: `node bappleCustomer`

On program start, you will see a displayed list of available products and asked for an ID of an item to purchase.
Next you will be asked a quantity to purchase. 
If requested quantity exceeds stock it will ask for a different quantity.
After purchase is completed you will be given the option to leave.

- - -

### Manager View: `node bappleManager`

On program start you will be provided with the following menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * `View Products for Sale` - List every available item: the item IDs, names, prices, and quantities.

  * `View Low Inventory` - List all items with an inventory count lower than 10.

  * `Add to Inventory` - Displays a prompt that allows manager to "add more" of any item currently in the store.

  * `Add New Product` - Allows the manager to add a completely new product to the store.

- - -

## ENJOY!