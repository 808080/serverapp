'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        maxPic(value) {
          if (value.length > 4) {
            throw new Error('4 images max');
          }
        }
      }
    },
    fragment: {
      type: DataTypes.STRING
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};