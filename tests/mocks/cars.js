const manufacturerList = [{
  id: 1,
  name: 'AlfaRomeo',
},
{
  id: 2,
  name: 'Audi',
}]

const singleManufacturer = [{
  id: 3,
  name: 'BMW',
}]

const vehicleModelList = [{
  id: 1,
  name: 'spider',
}, {
  id: 2,
  name: 'A4',
}]

const singleVehicle = [{
  id: 3,
  name: '320i',
}]

const myCarsList = [{
  id: 1,
  year: 1976,
  currentVehicle: 'no',
  repurchase: 'yes',
}, {
  id: 2,
  year: 2005,
  currentVehicle: 'no',
  repurchase: 'yes',
}]

const singleMyCar = [{
  id: 3,
  year: 1996,
  currentVehicle: 'no',
  repurchase: 'yes',
}]

const postedMyCar = [{
  vehicleId: 13,
  year: 2019,
  currentVehicle: 'yes',
  repurchase: 'yes',
}]

module.exports = {
  manufacturerList,
  singleManufacturer,
  vehicleModelList,
  singleVehicle,
  myCarsList,
  singleMyCar,
  postedMyCar,
}
