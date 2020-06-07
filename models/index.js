import Sequelize from 'sequelize'
import allConfigs from '../configs/sequelize'
import manufacturersModel from './manufacturers'
import vehicleModelsModel from './vehicleModels'
import myCarsModel from './myCars'
import myCars2VehiclesModel from './myCars2Vehicles'

export const environment = process.env.NODE_ENV || 'development'
export const config = allConfigs[environment]

export const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const manufacturers = manufacturersModel(connection, Sequelize)
const vehicleModels = vehicleModelsModel(connection, Sequelize)
const myCars = myCarsModel(connection, Sequelize)
const myCars2Vehicles = myCars2VehiclesModel(connection, Sequelize, myCars, vehicleModels)

manufacturers.hasMany(vehicleModels)
vehicleModels.belongsTo(manufacturers)

myCars.belongsToMany(vehicleModels, { through: myCars2Vehicles })
vehicleModels.belongsToMany(myCars, { through: myCars2Vehicles })

module.exports = {
  manufacturers,
  vehicleModels,
  myCars,
  myCars2Vehicles,
  Op: Sequelize.Op,
}
