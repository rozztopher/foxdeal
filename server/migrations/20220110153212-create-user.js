'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        unique: false        
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true
      },
      zip: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
      },      
      credits: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
        
      },
      created_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};