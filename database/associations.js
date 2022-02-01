const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const Character = require('./DBmodels/character');
const Genre = require('./DBmodels/genre');
const Movie = require('./DBmodels/movie');

// Trough Table
const Character_Movie = sequelize.define('character_movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

Character.belongsToMany(Movie, { through: Character_Movie });
Movie.belongsToMany(Character, { through: Character_Movie });

module.exports = Character_Movie;