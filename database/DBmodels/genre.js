const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Genre = sequelize.define('genre',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    avatar: DataTypes.STRING
  }
);

module.exports = Genre;