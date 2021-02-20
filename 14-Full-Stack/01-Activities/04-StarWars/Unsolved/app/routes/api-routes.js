// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const Character = require('../model/character.js');

// Routes
// =============================================================
module.exports = (app) => {
  // Search for Specific Character (or all characters) then provides JSON
  app.get('/api/:characters?', (req, res) => {
    // If the user provides a specific character in the URL...
    if (req.params.characters) {
      // Then display the JSON for ONLY that character.

      // (Note how we're using the ORM here to run our searches)
//      character.searchCharacter(req.params.characters, (data) => res.json(data));
      Character.findOne({ where: { name: req.params.characters}}).then((results) => res.json(results));
    }

    // Otherwise...
    else {
      // Otherwise display the data for all of the characters.

      // (Note how we're using the ORM here to run our searches)
//      character.allCharacters((data) => res.json(data));
      Character.findAll().then((result) => res.json(result));
    }
  });

  // If a user sends data to add a new character...
  app.post('/api/new', (req, res) => {
    // Take the request...
    const character = req.body;

    // Then send it to the ORM to "save" into the DB.
//    character.addCharacter(character, (data) => console.log(data));
    Character.create({
      routeName,
      name: character.name,
      role: character.role,
      age: character.age,
      forcePoints: character.forcePoints,
    });
    res.status(200).json(character);
  });
};
