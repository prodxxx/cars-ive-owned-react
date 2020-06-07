import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { getAllManufacturers, getManufacturersByIdentifier } from './controllers/manufacturers'
import { getAllVehicleModels, getVehicleModelsByIdentifier } from './controllers/vehicleModels'
import { getAllMyCars, getMyCarsToRepurchase, getAllMyCarsByYear, saveMyNewCar } from './controllers/myCars'

const app = express()

app.use(express.static('public'))

app.get('/api/manufacturers', getAllManufacturers)
app.get('/api/manufacturers/:identifier', getManufacturersByIdentifier)

app.get('/api/vehicleModels', getAllVehicleModels)
app.get('/api/vehicleModels/:identifier', getVehicleModelsByIdentifier)

app.get('/api/MyCars', getAllMyCars)
app.get('/api/MyCars/repurchase/:identifier', getMyCarsToRepurchase)
app.get('/api/MyCars/year/:identifier', getAllMyCarsByYear)
app.post('/api/MyCars', bodyParser.json(), saveMyNewCar)

app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))

app.listen(1337, () => {
  console.log('listening on port 1337...') // eslint-disable-line no-console
})
