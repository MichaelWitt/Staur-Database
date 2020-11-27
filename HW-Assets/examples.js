//Ebay Example

const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'greatBay_DB'
});
connection.connect((err) => {
	if (err) throw err;
	start();
});
const start = () => {
	inquirer
		.prompt({
			name: 'postOrBid',
			type: 'list',
			message: 'Would you like to [POST] an auction or [BID] on an auction?',
			choices: ['POST', 'BID', 'EXIT']
		})
		.then((answer) => {
			if (answer.postOrBid === 'POST') {
				postAuction();
			} else if (answer.postOrBid === 'BID') {
				bidAuction();
			} else {
				connection.end();
			}
		});
};
const postAuction = () => {
	inquirer
		.prompt([
			{
				name: 'item',
				type: 'input',
				message: 'What is the item you would like to submit?'
			},
			{
				name: 'category',
				type: 'input',
				message: 'What category would you like to place your auction in?'
			},
			{
				name: 'startingBid',
				type: 'input',
				message: 'What would you like your starting bid to be?',
				validate: (value) => {
					if (isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}
		])
		.then((answer) => {
			// when finished prompting, insert a new item into the db with that info
			connection.query(
				'INSERT INTO auctions SET ?',
				{
					item_name: answer.item,
					category: answer.category,
					starting_bid: answer.startingBid || 0,
					highest_bid: answer.startingBid || 0
				},
				(err) => {
					if (err) throw err;
					console.log('Your auction was created successfully!');
					start();
				}
			);
		});
};
const bidAuction = () => {
	connection.query('SELECT * FROM auctions', (err, results) => {
		if (err) throw err;
		inquirer
			.prompt([
				{
					name: 'choice',
					type: 'rawlist',
					choices: () => {
						const choiceArray = results.map((r) => r.item_name);
						return choiceArray;
					},
					message: 'What auction would you like to place a bid in?'
				},
				{
					name: 'bid',
					type: 'input',
					message: 'How much would you like to bid?'
				}
			])
			.then((answer) => {
				let chosenItem;
				for (let i = 0; i < results.length; i++) {
					if (results[i].item_name === answer.choice) {
						chosenItem = results[i];
					}
				}
				if (chosenItem.highest_bid < parseInt(answer.bid)) {
					connection.query(
						'UPDATE auctions SET ? WHERE ?',
						[
							{
								highest_bid: answer.bid
							},
							{
								id: chosenItem.id
							}
						],
						(error) => {
							if (error) throw err;
							console.log('Bid placed successfully!');
							start();
						}
					);
				} else {
					console.log('Your bid was too low. Try again...');
					start();
				}
			});
	});
};
