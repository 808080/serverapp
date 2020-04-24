'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING,
        get() {
          const firstName = this.getDataValue('firstName');
          const lastName = this.getDataValue('lastName');
          return `${firstName} ${lastName}`;
        }
      },
      dob: {
        type: Sequelize.STRING
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [5,]
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [5,]
        }
      },
      avatar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};