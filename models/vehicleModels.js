export default (connection, Sequelize, manufacturers) => connection.define('vehicleModels', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  name: { type: Sequelize.STRING },
  manufacturerId: { type: Sequelize.INTEGER, references: { model: manufacturers, key: 'id' } },
}, { paranoid: true })
