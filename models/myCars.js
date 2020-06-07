export default (connection, Sequelize) => connection.define('myCars', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  year: { type: Sequelize.DECIMAL(4, 0) },
  currentVehicle: { type: Sequelize.ENUM, values: ['yes', 'no'] },
  repurchase: { type: Sequelize.ENUM, values: ['yes', 'no'] },
}, { paranoid: true })
