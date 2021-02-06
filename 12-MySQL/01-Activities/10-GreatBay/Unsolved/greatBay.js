const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'greatBayDB',
});

const readProducts = () => {
    console.log('Selecting all products...\n');
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
};

const deleteProduct = () => {
    console.log('Deleting all strawberry icecream...\n');
    connection.query(
        'DELETE FROM products WHERE ?', {
            flavor: 'strawberry',
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} products deleted!\n`);
            // Call readProducts AFTER the DELETE completes
            readProducts();
        }
    );
};

const updateProduct = () => {
    console.log('Updating all Rocky Road quantities...\n');
    const query = connection.query(
        'UPDATE products SET ? WHERE ?',
        [{
                quantity: 100,
            },
            {
                flavor: 'Rocky Road',
            },
        ],
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} products updated!\n`);
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
};

const createProduct = () => {
    console.log('Inserting a new product...\n');
    const query = connection.query(
        'INSERT INTO products SET ?', {
            flavor: 'Rocky Road',
            price: 3.0,
            quantity: 50,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} product inserted!\n`);
            // Call updateProduct AFTER the INSERT completes
            updateProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
};

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
    //  createProduct();
});


var auctionItems = [];

const start = () => {
    inquirer
        .prompt({
            name: 'John',
            type: 'list',
            message: 'Which action would you like to take? ',
            choices: ['Post an Item', 'Bid on an Item'],
        })
        .then((answer) => {
            if (answer.John === 'Post an Item') {
                postItem();
                const query = 'SELECT * FROM auctions';
                connection.query(query, (err, res) => {
                    for (let i = 0; i < res.length; i++) {
                        auctionItems.push(res[i].item_name);
                    }
                    console.log(auctionItems);
                });
            } else {


                bidItem(auctionItems);
            }
        });
}

var highBid;

const postItem = () => {
    inquirer
        .prompt([
        {
            name: 'itemName',
            type: 'input',
            message: 'What is the item name? ',
        }, {
            name: 'category',
            type: 'input',
            message: 'What category is your item? ',
        }, {
            name: 'startingBid',
            type: 'input',
            message: 'What is the starting bid on item? ',
        }])
        .then((answer) => {
            const query = 'INSERT INTO auctions SET ?';
            connection.query(query, {
                item_name: answer.itemName,
                category: answer.category,
                starting_bid: answer.startingBid
            }, (err, res) => {
                if (err) throw err;
                start();
            });
        });
}

var bidName;

const bidItem = (auctionItems) => {

    inquirer
        .prompt([{
            name: 'itemToBid',
            type: 'list',
            message: 'Which item do you want to bid on? ',
            choices: auctionItems,
        }, {
            name: 'bid',
            type: 'input',
            message: 'What is your bid? ',
        }] )
        .then((answer) => {
            const query = 'SELECT * FROM auctions';
            connection.query(query, (err, res) => {
                for (let i = 0; i < res.length; i++) {
                    console.log("finding item name");
                    console.log(res[i].item_name + '   ' + answer.itemToBid);
                    if(res[i].item_name === answer.itemToBid) {
                        highBid = res[i].highest_bid;
                        bidName = res[i].item_name;
                    }
                    console.log('high bid: ', highBid);
                    console.log('bid name: ', bidName);
                }
            });
            if(answer.bid > highBid) {
                console.log("You are now highest bidder!")
                const query = 'UPDATE auctions SET ? WHERE ?';
                connection.query(query, {
                    highest_bid: answer.bid,
                    item_name: bidName
                }, (err, res) => {
                    if (err) throw err;
                });               
            }
            else {
                console.log("You are not the highest bidder!  Bid again!");
                start();
            }
        })
}