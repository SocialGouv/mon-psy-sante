"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("psychologist", "display_phone", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.addColumn("psychologist", "address_additional", {
      allowNull: true,
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn(
      "psychologist",
      "second_address_additional",
      {
        allowNull: true,
        type: Sequelize.TEXT,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("psychologist", "display_phone");
    await queryInterface.removeColumn("psychologist", "address_additional");
    await queryInterface.removeColumn(
      "psychologist",
      "second_address_additional"
    );
  },
};
