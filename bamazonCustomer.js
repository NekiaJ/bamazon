
var mysql = require("mysql");
var inquirer = require("inquirer");
//connects to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
    
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as:" + connection.threadId);
    allProducts();
  
});


function allProducts(){
    connection.query("SELECT * FROM bamazon_db.products", function(err,res){
        for(var i =0; i < res.length; i++){
            console.log(res[i].id + "|" + res[i].product_name + "|" + res[i].price +"|" + res[i].department_name + "|" + res[i].stock_quantity);
            
        }
        //prompts user what they want to do next
        searchFor();
    })
}

//which departments
function searchFor() {
    inquirer.prompt({
        name:"action",
        type:"rawlist",
        message:" Which department would you like to purchase from?",
        choices: [
            "Home & Garden",
            "Electronics",
            "Baby Stuff",
            "Clothing"
        ]
    })
    .then(function(answer){
       
        switch (answer.action){
            
            case "Home & Garden":
                connection.query("SELECT * FROM products WHERE department_name=?",["Home & Garden",], function(err, res) {
                       res.forEach(function(product) {
                             var { id, price, stock_quantity, product_name } = product;
                            console.log(`${id} | ${product_name} | ${price} | ${stock_quantity}`)
                        })
                        departmentsQuery(res);
                       
                    })
                break;
            
            /////////////////////////////
            case "Electronics":
                 connection.query("SELECT * FROM products WHERE department_name=?",["Electronics",], function(err, res) {
                    res.forEach(function(product) {
                              
                        var { id, price, stock_quantity, product_name } = product;
                           
                        console.log(`${id} | ${product_name} | ${price} | ${stock_quantity}`)
                         
                    })
                        departmentsQuery(res);
        
                    })// end of electronics
        break;
         
        
        case "Baby Stuff":
            connection.query("SELECT * FROM products WHERE department_name=?",["Baby Stuff",], function(err, res) {
                                res.forEach(function(product) {
                                      var { id, price, stock_quantity, product_name } = product;
                                     console.log(`${id} | ${product_name} | ${price} | ${stock_quantity}`)
                                 })
                                departmentsQuery(res);
                })//end
                break;
                           
                
        case "Clothing":
             connection.query("SELECT * FROM products WHERE department_name=?",["Clothing",], function(err, res){
                
                res.forEach(function(product) {
                    var { id, price, stock_quantity, product_name } = product;
                     console.log(`${id} | ${product_name} | ${price} | ${stock_quantity}`)
                 })
                    departmentsQuery(res);
             })//end

                //break;
    };//end of switch statment
    
})//end of then statment
}

//Home and Garden Department
/*
1. check to see if id provided is valid
    a. if invalid return error message and ask question again.
    b. if valid update database  to refelct remaining quantity of item

*/

function departmentsQuery(products){
    inquirer.prompt({
        name:"item",
        type:"input",
        message:"What is the ID of the item you would like to purchase?"
        }).then(function(answer){
            console.log(answer.item);
            var id = answer.item;
            var isValid = isIdValid(id, products);
            if (isValid) {
                console.log("The id is valid entry");
                inStock();
            } else {
                console.log('The id is not a valid entry');
                departmentsQuery(products);
                
            }


    })
}

function inStock(products){
    inquirer.prompt({
        name: "units",
        type:"input",
        message:" How many would you like to buy?"
    }).then(function(answer){
       console.log(answer.units);
       var id = answer.units;
       var isValid = isIdValid(id, products);
       if (isValid) {
           console.log("The id is valid entry");
           placeOrder();
       } else {
           console.log('The id is not a valid entry');
           inStock(products);
           
       }
       
    })
}

function placeOrder(updateStock,quantity,id,price) {
    var query = "UPDATE products SET stock_quantity = ? where id = ?"

    connection.query(query, [updateStock,id],function(err,resp) {
        if (err) throw err;
        console.log("Item Ordered: ");
        console.log((`${id} | ${product_name} | ${price} | ${quantity}`))
        //inStock(products);
    })
}


// checks to see if input is VALID WITH data
function isIdValid (userSelectedId, products){
    // Loop through the products and see if the id exists
    return products.find( function(products) {
        if (parseInt(products.id) === parseInt(userSelectedId)) {
            return true;
        }else{
            console.log(departmentsQuery);
        }
    });
}