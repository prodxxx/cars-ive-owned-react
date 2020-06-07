
module.exports = {
  up: async (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return await queryInterface.bulkInsert('manufacturers', [
      { name: 'AlfaRomeo' },
      { name: 'Audi' },
      { name: 'BMW' },
      { name: 'Cadillac' },
      { name: 'Chevrolet' },
      { name: 'Chrysler' },
      { name: 'Dodge' },
      { name: 'Fiat' },
      { name: 'Ford' },
      { name: 'Honda' },
      { name: 'Jeep' },
      { name: 'Lexus' },
      { name: 'Mazda' },
      { name: 'MercedesBenz' },
      { name: 'Mitsubishi' },
      { name: 'Nissan' },
      { name: 'Plymouth' },
      { name: 'Saab' },
      { name: 'Suzuki' },
      { name: 'Volkswagen' },
    ]), await queryInterface.bulkInsert('vehicleModels', [
      {
        name: 'Spider',
        manufacturerId: 1
      }, {
        name: 'A4',
        manufacturerId: 2
      }, {
        name: '320i',
        manufacturerId: 3
      }, {
        name: 'Catera',
        manufacturerId: 4
      }, {
        name: 'Escalade',
        manufacturerId: 4
      }, {
        name: 'Caprice',
        manufacturerId: 5
      }, {
        name: '300C',
        manufacturerId: 6
      }, {
        name: 'GrandCaravan',
        manufacturerId: 7
      }, {
        name: '124Spider',
        manufacturerId: 8
      }, {
        name: 'X1/9',
        manufacturerId: 8
      }, {
        name: 'Expedition',
        manufacturerId: 9
      }, {
        name: 'Explorer',
        manufacturerId: 9
      }, {
        name: 'Flex',
        manufacturerId: 9
      }, {
        name: 'Prelude',
        manufacturerId: 10
      }, {
        name: 'Cherokee',
        manufacturerId: 11
      }, {
        name: 'Wrangler',
        manufacturerId: 11
      }, {
        name: 'RX300',
        manufacturerId: 12
      }, {
        name: '5',
        manufacturerId: 13
      }, {
        name: 'RX-7',
        manufacturerId: 13
      }, {
        name: 'E320',
        manufacturerId: 14
      }, {
        name: 'Eclipse',
        manufacturerId: 15
      }, {
        name: 'OutlanderSport',
        manufacturerId: 15
      }, {
        name: 'Pathfinder',
        manufacturerId: 16
      }, {
        name: 'Pulsar',
        manufacturerId: 16
      }, {
        name: 'Valiant',
        manufacturerId: 17
      }, {
        name: '9-3',
        manufacturerId: 18
      }, {
        name: 'Samurai',
        manufacturerId: 19
      }, {
        name: 'Routan',
        manufacturerId: 20
      }
    ]), await queryInterface.bulkInsert('myCars', [
      {
        year: 1976,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 2005,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1996,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1991,
        currentVehicle: 'no',
        repurchase: 'no'
      }, {
        year: 2007,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1980,
        currentVehicle: 'no',
        repurchase: 'no'
      }, {
        year: 2012,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 2008,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1973,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1981,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 2003,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1998,
        currentVehicle: 'no',
        repurchase: 'no'
      }, {
        year: 2009,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1984,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1987,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1985,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 2003,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 2008,
        currentVehicle: 'no',
        repurchase: 'no'
      }, {
        year: 1985,
        currentVehicle: 'no',
        repurchase: 'no'
      }, {
        year: 2003,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1995,
        currentVehicle: 'no',
        repurchase: 'no'
      }, {
        year: 2015,
        currentVehicle: 'yes',
        repurchase: 'no'
      }, {
        year: 2007,
        currentVehicle: 'yes',
        repurchase: 'yes'
      }, {
        year: 1985,
        currentVehicle: 'no',
        repurchase: 'no'
      }, {
        year: 1973,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 2005,
        currentVehicle: 'no',
        repurchase: 'yes'
      }, {
        year: 1985,
        currentVehicle: 'no',
        repurchase: 'no'
      }, {
        year: 2011,
        currentVehicle: 'no',
        repurchase: 'yes'
      }
    ]), await queryInterface.bulkInsert('myCars2Vehicles', [
      {
        myCarId: 1,
        vehicleModelId: 1
      }, {
        myCarId: 2,
        vehicleModelId: 2
      }, {
        myCarId: 3,
        vehicleModelId: 3
      }, {
        myCarId: 4,
        vehicleModelId: 4
      }, {
        myCarId: 5,
        vehicleModelId: 5
      }, {
        myCarId: 6,
        vehicleModelId: 6
      }, {
        myCarId: 7,
        vehicleModelId: 7
      }, {
        myCarId: 8,
        vehicleModelId: 8
      }, {
        myCarId: 9,
        vehicleModelId: 9
      }, {
        myCarId: 10,
        vehicleModelId: 10
      }, {
        myCarId: 11,
        vehicleModelId: 11
      }, {
        myCarId: 12,
        vehicleModelId: 12
      }, {
        myCarId: 13,
        vehicleModelId: 13
      }, {
        myCarId: 14,
        vehicleModelId: 14
      }, {
        myCarId: 15,
        vehicleModelId: 15
      }, {
        myCarId: 16,
        vehicleModelId: 16
      }, {
        myCarId: 17,
        vehicleModelId: 17
      }, {
        myCarId: 18,
        vehicleModelId: 18
      }, {
        myCarId: 19,
        vehicleModelId: 19
      }, {
        myCarId: 20,
        vehicleModelId: 20
      }, {
        myCarId: 21,
        vehicleModelId: 21
      }, {
        myCarId: 22,
        vehicleModelId: 22
      }, {
        myCarId: 23,
        vehicleModelId: 23
      }, {
        myCarId: 24,
        vehicleModelId: 24
      }, {
        myCarId: 25,
        vehicleModelId: 25
      }, {
        myCarId: 26,
        vehicleModelId: 26
      }, {
        myCarId: 27,
        vehicleModelId: 27
      }, {
        myCarId: 28,
        vehicleModelId: 28
      }
    ])
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
 
      Example:
      return queryInterface.dropTable('users');
    */
    return await queryInterface.dropTable('myCars2Vehicle'),
    await queryInterface.dropTable('myCars'),
    await queryInterface.dropTable('vehicleModels'),
    await queryInterface.dropTable('manufacturers')
  }
}
