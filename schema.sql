-- if exist - delete DB
DROP DATABASE IF EXISTS bapple;
-- create NEW DB 
CREATE database bapple;

USE bapple;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;
