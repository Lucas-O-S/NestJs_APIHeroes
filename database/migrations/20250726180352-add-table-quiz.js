'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('quiz', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      text: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      options: {
        type: Sequelize.JSON,
        allowNull: false
      },
      difficulty: { 
        type: Sequelize.STRING(20),
        allowNull: false
      },
      theme: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('quiz');
  }
};
