module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ds_cursor", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cursor: {
        allowNull: true,
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
    });

    await queryInterface.bulkInsert("ds_cursor", [
      {
        id: 1,
        cursor: undefined,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ds_cursor");
  },
};
