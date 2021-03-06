module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "postgis";`
    );
    await queryInterface.createTable("psychologist", {
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
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      display_email: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      public: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      archived: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      second_address: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      department: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      website: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      cdsmsp: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      languages: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      teleconsultation: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      coordinates: {
        allowNull: true,
        type: Sequelize.GEOMETRY("POINT", 4326),
      },
      second_address_coordinates: {
        allowNull: true,
        type: Sequelize.GEOMETRY("POINT", 4326),
      },
      instructor_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      visible: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("psychologist");
  },
};
