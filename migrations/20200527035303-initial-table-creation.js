module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return await queryInterface.createTable('manufacturers', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },

    }), await queryInterface.createTable('vehicleModels', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, },
      manufacturerId: { type: Sequelize.INTEGER, references: { model: 'manufacturers', key: 'id' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },

    }), await queryInterface.createTable('myCars', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      year: { type: Sequelize.DECIMAL(4, 0), },
      currentVehicle: { type: Sequelize.ENUM, values: ['yes', 'no'] },
      repurchase: { type: Sequelize.ENUM, values: ['yes', 'no'] },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },

    }), await queryInterface.createTable('myCars2Vehicles', {
      vehicleModelId: { type: Sequelize.INTEGER, primarykey: true, references: { model: 'vehicleModels', key: 'id' } },
      myCarId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primarykey: true,
        references: { model: 'myCars', key: 'id' }
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return await queryInterface.dropTable('myCars2Vehicle'),
    await queryInterface.dropTable('myCars'),
    await queryInterface.dropTable('vehicleModels'),
    await queryInterface.dropTable('manufacturers')
  }
}
