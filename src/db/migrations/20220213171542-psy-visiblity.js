'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("psychologist", "visible", {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("psychologist", "visible")
  }
};
