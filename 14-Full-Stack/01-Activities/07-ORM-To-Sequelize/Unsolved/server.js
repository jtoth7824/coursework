const express = require('express');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./models/');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Routes
require('./routes/api-routes.js')(app);


// Starting our Express app
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});

