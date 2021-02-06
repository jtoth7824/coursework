const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'playlist_db',
});

const querySongs = () => {
  connection.query('SELECT * FROM songs', (err, res) => {
    if (err) throw err;
    console.log(res);
  });
};

const queryGenre = () => {
    connection.query('SELECT * FROM songs WHERE genre = ?', ['POP'], (err, res) => {
      if (err) throw err;
      console.log("here comes by genre");
      console.log(res);
    });
  };

  const queryArtist = () => {
    connection.query('SELECT * FROM songs WHERE artist=?', ['Led Zepplin'], (err, res) => {
      if (err) throw err;
      console.log("here comes by artist");
      console.log(res);
    });
  };

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  querySongs();
  queryGenre();
  queryArtist();
  connection.end();
});
