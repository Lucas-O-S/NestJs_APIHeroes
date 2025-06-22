/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'token_fcm', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Token FCM para notificações push'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'token_fcm');
  }
};