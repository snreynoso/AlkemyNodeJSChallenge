const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Character = sequelize.define('characters',
  {
    avatar: DataTypes.STRING,
    name:
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "Name can not be empty"
        },
        is: {
          args: /^[a-zA-Z\s]*$/, // RegEx expression only letters and space
          ignore: ' ',
          msg: "You can only use letters for name"
        },
        len: {
          args: [3, 50],
          msg: "The name must to have 3 to 25 characters"
        }
      }
    },
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    story: DataTypes.TEXT
  }
);

module.exports = Character;
