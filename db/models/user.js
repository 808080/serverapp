'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    fullName: {
      type: DataTypes.STRING,
      get() {
        const firstName = this.getDataValue('firstName');
        const lastName = this.getDataValue('lastName');
        return `${firstName} ${lastName}`;
      }
    },
    dob: {
      type: DataTypes.STRING
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5,]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,]
      }
    },
    avatar: {
      type: DataTypes.STRING
    }
  }, {
    defaultScope: {
      attributes: { exclude: ['password'] }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};