import models from '../models'

export const getAllMyCars = async (request, response) => {
  try {
    const myCars = await models.myCars.findAll({
      attributes: ['year', 'currentVehicle', 'repurchase'],
      include: [{
        model: models.vehicleModels,
        attributes: ['id', 'name'],
        include: [{
          model: models.manufacturers,
          attributes: ['id', 'name'],
        }],
      }],
    })

    return myCars ? response.send(myCars) : response.status(500)
  } catch (error) {
    return response.status(500).send('Unable to retrieve owned vehicles, please try agin')
  }
}

export const getMyCarsToRepurchase = async (request, response) => {
  try {
    const { identifier } = request.params

    const foundMyCars = await models.myCars.findAll({
      attributes: [],
      where: { repurchase: { [models.Op.like]: `%${identifier}%` } },
      include: [{
        model: models.vehicleModels,
        attributes: ['id', 'name'],
        include: [{
          model: models.manufacturers,
          attributes: ['id', 'name'],
        }],
      }],
    })

    return foundMyCars
      ? response.send(foundMyCars)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve owned vehicles, please try agin')
  }
}

export const getAllMyCarsByYear = async (request, response) => {
  try {
    const { identifier } = request.params

    const foundMyCars = await models.myCars.findAll({
      attributes: ['currentVehicle', 'repurchase'],
      where: { year: identifier },
      include: [{
        model: models.vehicleModels,
        attributes: ['id', 'name'],
        include: [{
          model: models.manufacturers,
          attributes: ['id', 'name'],
        }],
      }],
    })

    return foundMyCars
      ? response.send(foundMyCars)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve owned vehicles, please try again')
  }
}

export const saveMyNewCar = async (request, response) => {
  try {
    const { vehicleModelId, year, currentVehicle, repurchase } = request.body

    if (!vehicleModelId || !year || !currentVehicle || !repurchase) {
      return response.status(400).send('Required fields are: vehicleModelId, year, currentVehicle, repurchase')
    }

    const newMyCar = await models.myCars.create({ year, currentVehicle, repurchase })
    const newMyCar2Vehicle = await models.myCars2Vehicles.create({ vehicleModelId })

    return response.status(201).send(newMyCar, newMyCar2Vehicle)
  } catch (error) {
    return response.status(500).send('Unable to add new owned vehicle, please try again')
  }
}
