import React, { useEffect, useState } from 'react'
import Search from './search'
import Manufacturer from './manufacturer'
import { filterManufacturers, retrieveManufacturers } from '../utils/manufacturers'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [manufacturerList, setManufacturerList] = useState([])
  const [filteredManufacturerList, setFilteredManufacturerList] = useState([])
  useEffect(() => {
    async function pullData() {
      const manufacturers = await retrieveManufacturers()

      setManufacturerList(manufacturers)
      setFilteredManufacturerList(manufacturers)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterManufacturers(manufacturerList, searchTerm)

    setFilteredManufacturerList(filtered)
  }, [searchTerm])

  return (
    <div className="page">
      <div className="title">Cars I Have Owned</div>
      <div className="subtitle">A searchable list of manufacturers of cars that I have owned</div>
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredManufacturerList.map(manufacturer => (
          <Manufacturer key={manufacturer.id} id={manufacturer.id} name={manufacturer.name} />
        ))
      }
    </div>
  )
}
