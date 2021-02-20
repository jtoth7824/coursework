
const Sequelize = require('sequelize');
const sequelizeConn = require('../config/connection.js');

const Character = sequelizeConn.define('allcharacters', {
    routeName: Sequelize.STRING,
    name: Sequelize.STRING,
    role: Sequelize.STRING,
    age: Sequelize.INTEGER,
    forcePoints: Sequelize.INTEGER
});

Character.sync();

module.exports = Character;