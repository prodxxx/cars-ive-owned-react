import React, { useEffect, useState } from 'react'
import { retrieveManufacturers } from '../utils/vehicleModels'
import GoBack from '../components/GoBack'
import ManufacturerDetails from '../components/manufacturerDetails'
import NotFound from '../components/NotFound'
import Page from '../components/Page'
import Vehicle from '../components/VehicleModel'
import Title from '../components/Title'

export default ({ location }) => {
  const [manufacturerId, setManufacturerId] = useState(0)
  const [manufacturer, setManufacturer] = useState({})
  const [vehicleModelList, setVehicleModelList] = useState([])

  useEffect(() => {
    async function pullData() {
      const { id, details, vehicleModels } = await retrieveManufacturers(location)

      setManufacturerId(id)
      setManufacturer(details)
      setVehicleModelList(vehicleModels)
    }

    pullData()
  }, [])

  return (
    <Page>
      <Title />
      <GoBack />
      {
        manufacturerId
          ? (
            <>
              <ManufacturerDetails name={manufacturer.name} />
              {vehicleModelList.map(vehicle => (
                <Vehicle
                  key={vehicle.id}
                  id={vehicle.id}
                  name={vehicle.name}

                />
              ))}
            </>
          )
          : (<NotFound message="Sorry, I don't know that manufacturer" />)
      }
    </Page>
  )
}
