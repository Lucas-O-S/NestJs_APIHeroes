'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Heroes', {
      id: {
        type: Sequelize.INTEGER,
        AutoIncrement: true,
        PrimaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        AllowNull: false,
      },
      tipo_poder: {
        type: Sequelize.STRING,
        AllowNull: true,
      },
      primeira_aparicao: {
        type: Sequelize.STRING,
        AllowNull: true,
      },
      data_lancamento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      criador: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fraqueza: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      editoraId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Editoras',
          key: 'id',
        },
        allowNull: false,
      },
      equipeId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Equipes',
          key: 'id'
        },
        allowNull: false
      },
      moralidadeId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Moralidades',
          key: 'id'
        },
        allowNull: false,
      },
      origemId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Origens',
          key: 'id'
        },
        allowNull: false,
      },
      sexoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sexo',
          key: 'id'
        },
        allowNull: false,
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

    await queryInterface.addIndex('Heroes', ['editoraId']);
    await queryInterface.addIndex('Heroes', ['equipeId']);
    await queryInterface.addIndex('Heroes', ['moralidadeId']);
    await queryInterface.addIndex('Heroes', ['origemId']);
    await queryInterface.addIndex('Heroes', ['sexoId']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Heroes');
  }
};
