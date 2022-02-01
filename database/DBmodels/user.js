const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('user', {
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
  email:
  {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        args: true,
        msg: "Email can not be empty"
      },
      isEmail: {
        args: true,
        msg: "Invalid email format"
      }
    }
  },
  password:
  {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = User;