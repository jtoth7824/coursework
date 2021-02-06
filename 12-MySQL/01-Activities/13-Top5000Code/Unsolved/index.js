const mysql = require('mysql');
const inquirer = require('inquirer');

// console.table package to display sql data in table format at command line
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'top_songsDB',
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Search by Artist',
                'Artists appearing more than once',
                'Range by Year',
                'Search by Song',
                'Exit'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Search by Artist':
                    searchArtist();
                    break;

                case 'Artists appearing more than once':
                    multipleArtist();
                    break;

                case 'Range by Year':
                    searchRangeYear();
                    break;

                case 'Search by Song':
                    searchSong();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const searchArtist = () => {
    inquirer
        .prompt([{
            name: 'artist',
            type: 'input',
            message: 'Enter artist to search on: ',
        }, ])
        .then((answer) => {
            let artist = answer.artist;
            connection.query('SELECT position, song, year FROM top5000 WHERE artist = ?', [artist], (err, results) => {
                if (err) throw err;
                // once you have the items, prompt the user for which they'd like to bid on

                console.table(results);
                start();
            });

        });
};

const searchRangeYear = () => {
    inquirer
        .prompt([{
                name: 'startYear',
                type: 'input',
                message: 'Enter start year for song search: ',
            },

            {
                name: 'endYear',
                type: 'input',
                message: 'Enter end year for song search: ',
            },
        ])
        .then((answer) => {

            connection.query('SELECT position,song,artist,year FROM top5000 WHERE year BETWEEN ? AND ? order by year desc', [answer.startYear, answer.endYear], (err, results) => {
                if (err) throw err;
                // once you have the items, prompt the user for which they'd like to bid on

                console.table(results);
                start();
            });

        });
};

const searchSong = () => {
    inquirer
        .prompt([{
            name: 'song',
            type: 'input',
            message: 'Enter song to search: ',
        }, ])
        .then((answer) => {
            connection.query('SELECT * FROM top5000 WHERE song = ?', [answer.song], (err, results) => {
                if (err) throw err;
                // once you have the items, prompt the user for which they'd like to bid on      
                console.table(results);
                start();
            });

        });
};

const multipleArtist = () => {
    connection.query('SELECT artist, count(*) AS "Num Time Found" FROM top5000 GROUP BY artist HAVING count(*) > 1 ORDER BY count(*) DESC', (err, results) => {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on

        console.table(results);
        start();
    });

};