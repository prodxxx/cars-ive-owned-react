const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chai = require('chai')
const {
  after, afterEach, beforeEach, describe, it,
} = require('mocha')
const models = require('../../models')
const { manufacturerList, singleManufacturer } = require('../mocks/cars')
const { vehicleModelList, singleVehicle } = require('../mocks/cars')
const { myCarsList, singleMyCar, postedMyCar } = require('../mocks/cars')
const { getAllManufacturers, getManufacturersByIdentifier } = require('../../controllers/manufacturers')
const { getAllVehicleModels, getVehicleModelsByIdentifier } = require('../../controllers/vehicleModels')
const { getAllMyCars, getMyCarsToRepurchase, getAllMyCarsByYear, saveMyNewCar } = require('../../controllers/myCars')


chai.use(sinonChai)
const { expect } = chai

describe('Controllers - API', () => {
  let response
  let sandbox
  let stubbedManufacturersFindAll
  let stubbedManufacturersFindOne
  let stubbedVehicleModelsFindAll
  let stubbedMyCarsFindAll
  let stubbedStatusSend
  let stubbedSaveMyNewCar


  beforeEach(() => {
    sandbox = sinon.createSandbox()

    stubbedStatusSend = sandbox.stub()

    response = {
      send: sandbox.stub(),
      status: sandbox.stub().returns({ send: stubbedStatusSend }),
      sendStatus: sandbox.stub(),
    }

    stubbedManufacturersFindAll = sandbox.stub(models.manufacturers, 'findAll')
    stubbedManufacturersFindOne = sandbox.stub(models.manufacturers, 'findOne')
    stubbedVehicleModelsFindAll = sandbox.stub(models.vehicleModels, 'findAll')
    stubbedMyCarsFindAll = sandbox.stub(models.myCars, 'findAll')
    stubbedSaveMyNewCar = sandbox.stub(models.myCars, 'create')
  })

  after(() => {
    sandbox.reset()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('Manufacturers', () => {
    describe('getAllManufacturers', () => {
      it('returns a list of Manufacturers cleaned for the API', async () => {
        stubbedManufacturersFindAll.returns(manufacturerList)

        await getAllManufacturers({}, response)
        expect(response.send).to.have.been.calledWith(manufacturerList)
      })

      it('returns a 500 error when the database calls fails', async () => {
        stubbedManufacturersFindAll.throws('ERROR!')

        await getAllManufacturers({}, response)
        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve manufacturers, please try again')
      })
    })

    describe('getManufacturersByIdentifier', () => {
      it('returns the manufacturer associated with the identifier passed in', async () => {
        stubbedManufacturersFindOne.returns(singleManufacturer)

        const request = { params: { identifier: 'bmw' } }

        await getManufacturersByIdentifier(request, response)

        expect(stubbedManufacturersFindOne).to.have.been.calledWith({
          attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          where: {
            [models.Op.or]: [
              { id: 'bmw' },
              { name: { [models.Op.like]: '%bmw%' } },
            ],
          },
          include: [{
            model: models.vehicleModels,
            attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          }],
        })
        expect(response.send).to.have.been.calledWith(singleManufacturer)
      })

      it('returns a 404 when no manufacturer can be found for the identifier passed in', async () => {
        stubbedManufacturersFindOne.returns(null)

        const request = { params: { identifier: 'bmw' } }

        await getManufacturersByIdentifier(request, response)

        expect(stubbedManufacturersFindOne).to.have.been.calledWith({
          attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          where: {
            [models.Op.or]: [
              { id: 'bmw' },
              { name: { [models.Op.like]: '%bmw%' } },
            ],
          },
          include: [{
            model: models.vehicleModels,
            attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          }],
        })
        expect(response.sendStatus).to.have.been.calledWith(404)
      })

      it('returns a 500 error when the database calls fails', async () => {
        stubbedManufacturersFindOne.throws('ERROR!')

        const request = { params: { identifier: 'bmw' } }

        await getManufacturersByIdentifier(request, response)

        expect(stubbedManufacturersFindOne).to.have.been.calledWith({
          attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          where: {
            [models.Op.or]: [
              { id: 'bmw' },
              { name: { [models.Op.like]: '%bmw%' } },
            ],
          },
          include: [{
            model: models.vehicleModels,
            attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          }],
        })
        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve manufacturer, please try again')
      })
    })
  })
  describe('vehicleModels', () => {
    describe('getAllVehicleModels', () => {
      it('returns a list of vehicle models cleaned for the API', async () => {
        stubbedVehicleModelsFindAll.returns(vehicleModelList)

        await getAllVehicleModels({}, response)
        expect(response.send).to.have.been.calledWith(vehicleModelList)
      })

      it('returns a 500 error when the database calls fails', async () => {
        stubbedVehicleModelsFindAll.throws('ERROR!')

        await getAllVehicleModels({}, response)
        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve vehicle models, please try again')
      })
    })

    describe('getVehicleModelsByIdentifier', () => {
      it('returns the vehicle model associated with the identifier passed in', async () => {
        stubbedVehicleModelsFindAll.returns(singleVehicle)

        const request = { params: { identifier: 1996 } }

        await getVehicleModelsByIdentifier(request, response)

        expect(stubbedVehicleModelsFindAll).to.have.been.calledWith({
          attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          where: { name: { [models.Op.like]: '%1996%' } },
          include: [{
            model: models.manufacturers,
            attributes: ['id', 'name'],
          }],
        })
        expect(response.send).to.have.been.calledWith(singleVehicle)
      })

      it('returns a 404 when no manufacturer can be found for the identifier passed in', async () => {
        stubbedVehicleModelsFindAll.returns(null)

        const request = { params: { identifier: '1996' } }

        await getVehicleModelsByIdentifier(request, response)

        expect(stubbedVehicleModelsFindAll).to.have.been.calledWith({
          attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          where: { name: { [models.Op.like]: '%1996%' } },
          include: [{
            model: models.manufacturers,
            attributes: ['id', 'name'],
          }],
        })
        expect(response.sendStatus).to.have.been.calledWith(404)
      })

      it('returns a 500 error when the database calls fails', async () => {
        stubbedVehicleModelsFindAll.throws('ERROR!')

        const request = { params: { identifier: '1996' } }

        await getVehicleModelsByIdentifier(request, response)

        expect(stubbedVehicleModelsFindAll).to.have.been.calledWith({
          attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          where: { name: { [models.Op.like]: '%1996%' } },
          include: [{
            model: models.manufacturers,
            attributes: ['id', 'name'],
          }],
        })
        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve vehicle model, please try again')
      })
    })
  })
  describe('MyCars', () => {
    describe('getAllMyCars', () => {
      it('returns a list of my cars cleaned for the API', async () => {
        stubbedMyCarsFindAll.returns(myCarsList)

        await getAllMyCars({}, response)
        expect(response.send).to.have.been.calledWith(myCarsList)
      })

      it('returns a 500 error when the database calls fails', async () => {
        stubbedMyCarsFindAll.throws('ERROR!')

        await getAllMyCars({}, response)
        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve owned vehicles, please try agin')
      })
    })

    describe('getMyCarsToRepurchase', () => {
      it('returns my cars associated with the identifier passed in', async () => {
        stubbedMyCarsFindAll.returns(singleMyCar)

        const request = { params: { identifier: 'yes' } }

        await getMyCarsToRepurchase(request, response)

        expect(stubbedMyCarsFindAll).to.have.been.calledWith({
          attributes: [],
          where: { repurchase: { [models.Op.like]: '%yes%' } },
          include: [{
            model: models.vehicleModels,
            attributes: ['id', 'name'],
            include: [{
              model: models.manufacturers,
              attributes: ['id', 'name'],
            }],
          }],
        })
        expect(response.send).to.have.been.calledWith(singleMyCar)
      })

      it('returns a 404 when no my car can be found for the identifier passed in', async () => {
        stubbedMyCarsFindAll.returns(null)

        const request = { params: { identifier: 'yes' } }

        await getMyCarsToRepurchase(request, response)

        expect(stubbedMyCarsFindAll).to.have.been.calledWith({
          attributes: [],
          where: { repurchase: { [models.Op.like]: '%yes%' } },
          include: [{
            model: models.vehicleModels,
            attributes: ['id', 'name'],
            include: [{
              model: models.manufacturers,
              attributes: ['id', 'name'],
            }],
          }],
        })
        expect(response.sendStatus).to.have.been.calledWith(404)
      })

      it.only('returns a 500 error when the database calls fails', async () => {
        stubbedMyCarsFindAll.throws('ERROR!')

        const request = { params: { identifier: 1996 } }

        await getAllMyCarsByYear(request, response)

        expect(stubbedMyCarsFindAll).to.have.been.calledWith({
          attributes: ['currentVehicle', 'repurchase'],
          where: { year: 1996 },
          include: [{
            model: models.vehicleModels,
            attributes: ['id', 'name'],
            include: [{
              model: models.manufacturers,
              attributes: ['id', 'name'],
            }],
          }],
        })
        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve owned vehicles, please try again')
      })
    })
    describe('saveMyNewCar', () => {
      it('returns a 201 with the new MyCar when created', async () => {
        stubbedSaveMyNewCar.returns(postedMyCar)

        const request = { body: { vehicleId: 13, year: 2019, currentVehicle: 'yes', repurchase: 'yes' } }

        await saveMyNewCar(request, response)

        expect(stubbedSaveMyNewCar).to.have.been.calledWith({
          vehicleId: 13, year: 2019, currentVehicle: 'yes', repurchase: 'yes',
        })
        expect(response.status).to.have.been.calledWith(201)
        expect(stubbedStatusSend).to.have.been.calledWith(postedMyCar)
      })

      it('returns a 400 when missing data', async () => {
        const request = { body: { vehicleId: 13 } }

        await saveMyNewCar(request, response)

        expect(stubbedSaveMyNewCar).to.have.callCount(0)
        expect(response.status).to.have.been.calledWith(400)
        expect(stubbedStatusSend).to.have.been
          .calledWith('Required fields are: vehicleModelId, year, currentVehicle, repurchase')
      })

      it('returns a 500 error when the database calls fails', async () => {
        stubbedSaveMyNewCar.throws('ERROR!')

        const request = { body: { vehicleModelId: 13, year: 2019, currentVehicle: 'yes', repurchase: 'yes' } }

        await saveMyNewCar(request, response)

        expect(stubbedSaveMyNewCar).to.have.been.calledWith({
          vehicleModelId: 13, year: 2019, currentVehicle: 'yes', repurchase: 'yes',
        })
        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusSend).to.have.been.calledWith('Unable to add new owned vehicle, please try again')
      })
    })
  })
})
