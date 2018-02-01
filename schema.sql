-- if exist - delete DB
DROP DATABASE IF EXISTS bapple;
-- create NEW DB 
CREATE database bapple;

USE bapple;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(100) NOT NULL,
  department VARCHAR(100) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;
