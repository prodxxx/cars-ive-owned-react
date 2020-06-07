import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ErrorPage from './pages/Error'
import ManufacturersPage from './pages/Manufacturers'
import VehicleModelsPage from './pages/VehicleModels'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ManufacturersPage} />
      <Route path="/vehicleModels" component={VehicleModelsPage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
