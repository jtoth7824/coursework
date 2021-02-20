// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const connection = require('../config/connection.js');

// Routes
// =============================================================
module.exports = (app) => {
  // Get all chirps
  app.get('/api/all', (req, res) => {
      connection.query('SELECT * FROM chirps', (err, res) => {
        if(err) throw err;
        return res.json(res);
      });

  });
  // Add a chirp
  app.put('/api/new', (req, res) => {
    connection.query('INSERT INTO chirps SET chirp = ?, time_created = ?, author = ?',
     [req.body.body,
       req.body.created_at,
       req.body.author,
      ], (err, res) => {
      return res.json(req.body);
    });
  });

};
