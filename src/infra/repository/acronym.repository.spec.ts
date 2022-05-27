import { Sequelize } from 'sequelize-typescript'
import { Op } from 'sequelize'
import { Acronym } from '../../domain/entity/acronym.entity'
import { AcronymModel } from '../database/sequelize/model/acronym.model'
import { AcronymRepository } from './acronym.repository'

const makeSut = (): AcronymRepository => {
  return new AcronymRepository()
}

describe('Acronym Repository Unit Tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([AcronymModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('Should Connect with Sequelize', async () => {
    let connected: boolean
    sequelize
      .authenticate()
      .then(() => {
        connected = true
      })
      .catch(() => {
        connected = false
      }).finally(() => {
        expect(connected).toBeTruthy()
      })
  })

  it('Should Create an Acronym', async () => {
    const sut = makeSut()
    const acronymDataToCreate = new Acronym('TDD', 'Test-Driven Development')
    await sut.create(acronymDataToCreate)

    const createdAcronym = await AcronymModel.findOne({ where: { title: acronymDataToCreate.title } }) as AcronymModel

    expect({
      title: createdAcronym.title,
      definition: createdAcronym.definition
    }).toEqual({
      title: acronymDataToCreate.title,
      definition: acronymDataToCreate.definition
    })
  })

  it('Should throws with duplicated title or definition', async () => {
    const sut = makeSut()
    const acronymDataToCreate = new Acronym('TDD', 'Test-Driven Development')
    await sut.create(acronymDataToCreate)
    const createdAcronym = await AcronymModel.findOne({
      where: {
        [Op.or]: [
          { title: acronymDataToCreate.title },
          { definition: acronymDataToCreate.definition }
        ]
      }
    })
    expect(createdAcronym).toBeDefined()
    try {
      await sut.create(acronymDataToCreate)
    } catch (error) {
      expect(error.message).toBe('Acronym already exists')
    }
  })

  it('Should Update an Acronym', async () => {
    const sut = makeSut()
    const acronymDataToCreate = new Acronym('TDD', 'Test Driven Development')
    await sut.create(acronymDataToCreate)

    const createdAcronym = await AcronymModel.findOne({ where: { title: acronymDataToCreate.title } }) as AcronymModel

    const acronymDataToUpdate = new Acronym('XP', 'Extreme Programming')
    await sut.update(createdAcronym.title, acronymDataToUpdate)

    const updatedAcronym = await AcronymModel.findOne({ where: { title: acronymDataToUpdate.title } }) as AcronymModel

    expect({
      title: updatedAcronym.title,
      definition: updatedAcronym.definition
    }).toEqual({
      title: acronymDataToUpdate.title,
      definition: acronymDataToUpdate.definition
    })
  })
})
