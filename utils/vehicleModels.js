import fetchVehicleModelsForManufacturer from '../actions/vehicleModels'


export const getManufacturerIdFromUrl = location => (location && location.pathname
  ? location.pathname.split('/vehicleModels/').pop()
  : 0
)

export const retrieveManufacturers = async (location) => {
  const manufacturerId = getManufacturerIdFromUrl(location)

  if (!Number(manufacturerId)) return { id: 0, details: {}, vehicleModels: [] }

  const [{ id, name, vehicleModels }] = await fetchVehicleModelsForManufacturer(manufacturerId)

  if (!id || !name || !vehicleModels) return { id: 0, name: {}, vehicleModels: [] }

  return { id, vehicleModels, details: { id, name } }
}
