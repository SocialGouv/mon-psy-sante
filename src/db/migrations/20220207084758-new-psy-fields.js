"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("psychologist", "email", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("psychologist", "display_email", {
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.addColumn("psychologist", "public", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("psychologist", "with_children");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("psychologist", "email");
    await queryInterface.removeColumn("psychologist", "display_email");
    await queryInterface.removeColumn("psychologist", "public");
    await queryInterface.addColumn("psychologist", "with_children", {
      type: Sequelize.BOOLEAN,
    });
  },
};
