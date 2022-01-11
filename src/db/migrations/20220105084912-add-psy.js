module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "postgis";`)
    await queryInterface.createTable('psychologist', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      archived: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      website: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cdsmsp: {
        allowNull: false,
        type: Sequelize.STRING
      },
      languages: {
        allowNull: false,
        type: Sequelize.STRING
      },
      teleconsultation: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      with_children: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      coordinates: {
        allowNull: true,
        type: Sequelize.GEOMETRY('POINT')
      },
      instructor_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('psychologist');
  },
};
