"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "UPDATE psychologist SET public = 'Enfants' WHERE public = 'Enfants/adolescents';"
    );
    await queryInterface.sequelize.query(
      "UPDATE psychologist SET public = 'Adultes, adolescents et enfants' WHERE public = 'Adultes et enfants/adolescents';"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "UPDATE psychologist SET public = 'Enfants/adolescents' WHERE public = 'Enfants';"
    );
    await queryInterface.sequelize.query(
      "UPDATE psychologist SET public = 'Adultes et enfants/adolescents' WHERE public = 'Adultes, adolescents et enfants';"
    );
  },
};
