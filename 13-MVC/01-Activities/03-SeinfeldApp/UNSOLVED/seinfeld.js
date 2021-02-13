
// Dependencies
const express = require('express');
const mysql = require('mysql');

// Create express app instance.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;
// console.table package to display sql data in table format at command line


const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'seinfeld',
});

app.get('/cast', (req, res) => {
    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    connection.query('SELECT * FROM actors ORDER BY actors.id', (err, result) => {
      if (err) throw err;
      // We then begin building out HTML elements for the page.
      let html = '<h1> Seinfeld Actors </h1>';
  
      // Here we begin an unordered list.
      html += '<ul>';
  
      // We then map over the retrieved records from the database to populate our HTML file.
      result.map(({ id, name, coolness_points, attitude }) => {
        html += `<li><p> ID: ${id}</p>`;
        html += `<p>School: ${name} </p>`;
        html += `<p>Coolness points: ${coolness_points} </p>`;
        html += `<p>Attitude: ${attitude} </p></li>`;
        return html;
      });
  
      // We close our unordered list.
      html += '</ul>';
      console.log(html);
  
      // Finally we send the user the HTML file we dynamically created.
      res.send(html);
    });
  });
  
  app.get('/coolness', (req, res) => {
    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    connection.query('SELECT * FROM actors ORDER BY actors.coolness_points', (err, result) => {
      if (err) throw err;
      // We then begin building out HTML elements for the page.
      let html = '<h1> Seinfeld Coolness </h1>';
  
      // Here we begin an unordered list.
      html += '<ul>';
  
      // We then map over the retrieved records from the database to populate our HTML file.
      result.map(({ id, name, coolness_points, attitude }) => {
        html += `<li><p> ID: ${id}</p>`;
        html += `<p>School: ${name} </p>`;
        html += `<p>Coolness points: ${coolness_points} </p>`;
        html += `<p>Attitude: ${attitude} </p></li>`;
        return html;
      });
  
      // We close our unordered list.
      html += '</ul>';
      console.log(html);
  
      // Finally we send the user the HTML file we dynamically created.
      res.send(html);
    });
  });

  app.get('/attitude-chart:att', (req, res) => {
    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    connection.query('SELECT * FROM actors where attitude = ?', [req.params.att], (err, result) => {
      if (err) throw err;
      // We then begin building out HTML elements for the page.
      let html = '<h1> Seinfeld Coolness </h1>';
  
      // Here we begin an unordered list.
      html += '<ul>';
  
      // We then map over the retrieved records from the database to populate our HTML file.
      result.map(({ id, name, coolness_points, attitude }) => {
        html += `<li><p> ID: ${id}</p>`;
        html += `<p>School: ${name} </p>`;
        html += `<p>Coolness points: ${coolness_points} </p>`;
        html += `<p>Attitude: ${attitude} </p></li>`;
        return html;
      });
  
      // We close our unordered list.
      html += '</ul>';
      console.log(html);
  
      // Finally we send the user the HTML file we dynamically created.
      res.send(html);
    });
  });

  // Start our server so that it can begin listening to client requests.
  app.listen(PORT, () =>
    console.log(`Server listening on: http://localhost:${PORT}`)
  );
  

