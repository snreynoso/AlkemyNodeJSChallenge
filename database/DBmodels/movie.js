const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Movie = sequelize.define('movie',
  {
    title:
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    avatar: DataTypes.STRING,
    date: DataTypes.DATE,
    rating: DataTypes.INTEGER,
  }
);

module.exports = Movie;