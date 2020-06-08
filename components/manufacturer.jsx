import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Manufacturer = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`

export default ({ id, name }) => (
  <Manufacturer key={id}>
    <NavLink to={`/vehicleModels/${id}`}>{`${name}`}</NavLink>
  </Manufacturer>
)
