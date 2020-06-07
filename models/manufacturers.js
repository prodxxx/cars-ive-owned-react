export default (connection, Sequelize) => connection.define('manufacturers', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  name: { type: Sequelize.STRING },
}, { paranoid: true })
