


// Two Tables example

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "top_songsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Find songs by artist",
        "Find all artists who appear more than once",
        "Find data within a specific range",
        "Search for a specific song",
        "Find artists with a top song and top album in the same year"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Find songs by artist":
        artistSearch();
        break;

      case "Find all artists who appear more than once":
        multiSearch();
        break;

      case "Find data within a specific range":
        rangeSearch();
        break;

      case "Search for a specific song":
        songSearch();
        break;

      case "Find artists with a top song and top album in the same year":
        songAndAlbumSearch();
        break;
      }
    });
}

function artistSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function songAndAlbumSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
      query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
      query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

      connection.query(query, [answer.artist, answer.artist], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i+1 + ".) " +
              "Year: " +
              res[i].year +
              " Album Position: " +
              res[i].position +
              " || Artist: " +
              res[i].artist +
              " || Song: " +
              res[i].song +
              " || Album: " +
              res[i].album
          );
        }

        runSearch();
      });
    });
}







// Top 5000 example

const runSearch = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Find songs by artist',
                'Find all artists who appear more than once',
                'Find data within a specific range',
                'Search for a specific song',
                'exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Find songs by artist':
                    artistSearch();
                    break;
                case 'Find all artists who appear more than once':
                    multiSearch();
                    break;
                case 'Find data within a specific range':
                    rangeSearch();
                    break;
                case 'Search for a specific song':
                    songSearch();
                    break;
                case 'exit':
                    connection.end();
                    break;
            }
        });
};
const artistSearch = () => {
    inquirer
        .prompt({
            name: 'artist',
            type: 'input',
            message: 'What artist would you like to search for?',
        })
        .then((answer) => {
            const query = 'SELECT * FROM top5000 WHERE ?';
            connection.query(query, { artist: answer.artist }, (err, res) => {
                if (err) throw err;
                res.map((r) =>
                    console.log(
                        `Position: ${r.position} || Song: ${r.song} || Year: ${r.year}`
                    )
                );
                runSearch();
            });
        });
};
const multiSearch = () => {
    const query =
        'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.map((r) => console.log(r.artist));
        runSearch();
    });
};
const rangeSearch = () => {
    inquirer
        .prompt([
            {
                name: 'start',
                type: 'input',
                message: 'Enter starting position: ',
                validate: (value) => {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
            {
                name: 'end',
                type: 'input',
                message: 'Enter ending position: ',
                validate: (value) => {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
        ])
        .then((answer) => {
            const query =
                'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
            connection.query(query, [answer.start, answer.end], function (err, res) {
                if (err) throw err;
                res.map(record =>
                    console.log(
                        `Position: ${record.position} || Song: ${record.song} || Artist ${record.artist} || Year: ${record.year}`
                    )
                );
                console.table(res)
                runSearch();
            });
        });
};
const songSearch = () => {
    inquirer
        .prompt({
            name: 'song',
            type: 'input',
            message: 'What song would you like to look for?',
        })
        .then((answer) => {
            console.log(answer.song);
            connection.query(
                'SELECT * FROM top5000 WHERE ?',
                { song: answer.song },
                (err, res) => {
                    if (err) throw err;
                    // console.log(
                    //   'Position: ' +
                    //     res[0].position +
                    //     ' || Song: ' +
                    //     res[0].song +
                    //     ' || Artist: ' +
                    //     res[0].artist +
                    //     ' || Year: ' +
                    //     res[0].year
                    // );
                    console.log(`Position ${res[0].position}`)
                    runSearch();
                }
            );
        });
};




//Ebay Example



const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'greatBay_DB',
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
            choices: ['POST', 'BID', 'EXIT'],
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
                message: 'What is the item you would like to submit?',
            },
            {
                name: 'category',
                type: 'input',
                message: 'What category would you like to place your auction in?',
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
                },
            },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                'INSERT INTO auctions SET ?',
                {
                    item_name: answer.item,
                    category: answer.category,
                    starting_bid: answer.startingBid || 0,
                    highest_bid: answer.startingBid || 0,
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
                    message: 'What auction would you like to place a bid in?',
                },
                {
                    name: 'bid',
                    type: 'input',
                    message: 'How much would you like to bid?',
                },
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
                                highest_bid: answer.bid,
                            },
                            {
                                id: chosenItem.id,
                            },
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