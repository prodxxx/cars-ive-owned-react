export default (connection, Sequelize, myCars, vehicleModels) => connection.define('myCars2Vehicles', {
  vehicleModelId: { type: Sequelize.INTEGER, primarykey: true, references: { model: vehicleModels, key: 'id' } },
  myCarId: { type: Sequelize.INTEGER, primarykey: true, references: { model: myCars, key: 'id' } },
}, { defaultScope: { attributes: { exclude: ['deletedAt'] } } }, { paranoid: true })
