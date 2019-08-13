drop database if exists bamazon_db;

create DATABASE bamazon_db;

use bamazon_db;

create table products (
    id int not null auto_increment,
    product_name VARCHAR(45) null,
    department_name VARCHAR(45) null,
    price DECIMAL (10,2) null,
    stock_quantity INT null, 
    PRIMARY key (id)
);

INSERT into products (product_name,department_name,price,stock_quantity)
VALUES ("Baby Diapers (25)", "Baby Stuff", 15.00, 100),
 ("65 inch tv", "Electronics", 100,2500),
("Fike Sneakers","Clothing", 80,500),
("Baby Wipes","Baby Stuff", 5, 75),
("RPG Video Games","Electronics",20,100),
("Little Black Dress", "Clothing", 25,75),
("Red Pumps", "Clothing", 50,175),
("Yellow Mini Dress", "Clothing", 15,25),
("Bell 15in Laptop", "Electronics", 1215,100),
("Push Lawn Mower", "Home & Garden", 225,75),
("Baby Legos", "Baby Stuff", 5,175),
("Outdoor Fence Stain", "Home & Garden", 75,15),
("Mens Jeans", "Clothing", 35,50),
("Water Hose", "Home & Garden", 25,75),
("Racing Video Game", "Electronics", 15,25);

alter TABLE products
ADD product_sales INT default 0;
