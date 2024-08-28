'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Equipes', {
      id: {
        type: Sequelize.INTEGER,
        AutoIncrement: true,
        PrimaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        AllowNull: false,
        Unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });

    await queryInterface.addIndex('Equipes', ['id']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Equipes');
  }
};
