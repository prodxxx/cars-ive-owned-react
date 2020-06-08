import models from '../models'

export const getAllVehicleModels = async (request, response) => {
  try {
    const vehicleModels = await models.vehicleModels.findAll({
      include: [{
        model: models.manufacturers,
        attributes: ['id', 'name'],
      }],
    })

    return vehicleModels ? response.send(vehicleModels) : response.status(500)
  } catch (error) {
    return response.status(500).send('Unable to retrieve vehicle models, please try again')
  }
}

export const getVehicleModelsByIdentifier = async (request, response) => {
  try {
    const { identifier } = request.params

    const foundVehicleModel = await models.vehicleModels.findOne({
      attributes: ['id', 'name'],
      where: { name: { [models.Op.like]: `%${identifier}%` } },
      include: [{
        model: models.manufacturers,
        attributes: ['id', 'name'],
      }],
    })

    return foundVehicleModel
      ? response.send(foundVehicleModel)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve vehicle model, please try again')
  }
}
