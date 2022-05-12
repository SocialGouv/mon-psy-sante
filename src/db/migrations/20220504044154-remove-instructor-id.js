"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("psychologist", "instructor_id");
  },

  async down(queryInterface) {
    await queryInterface.addColumn("psychologist", "instructor_id", {
      type: Sequelize.STRING,
      defaultValue: false,
    });
  },
};
