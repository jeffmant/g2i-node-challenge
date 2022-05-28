import { Sequelize } from 'sequelize-typescript'
import { Op } from 'sequelize'
import { Acronym } from '../../domain/entity/acronym.entity'
import { AcronymModel } from '../database/sequelize/models/acronym.model'
import AcronymRepository from './acronym.repository'
import { IRepository } from '../../domain/protocols/repository.interface'

const makeSut = (): IRepository<Acronym> => {
  return AcronymRepository
}

describe('Acronym Create Repository Unit Tests', () => {
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

  it('Should throw with duplicated title or definition', async () => {
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

  it('Should throw with not found acronym', async () => {
    const sut = makeSut()
    const acronymDataToUpdate = new Acronym('XP', 'Extreme Programming')
    try {
      await sut.update(acronymDataToUpdate.title, acronymDataToUpdate)
    } catch (error) {
      expect(error.message).toBe('Acronym not found')
    }
  })

  it('Should throw when try to update an duplicated acronym definition', async () => {
    const sut = makeSut()
    const acronymDataToCreate = new Acronym('TDD', 'Test Driven Development')
    const acronymDataToUpdate = new Acronym('XP', 'Test Driven Development')
    await sut.create(acronymDataToCreate)
    try {
      await sut.update(acronymDataToCreate.title, acronymDataToUpdate)
    } catch (error) {
      expect(error.message).toBe('Acronym definition already exists')
    }
  })

  it('Should throw when try to a not found acronym', async () => {
    const sut = makeSut()
    const acronymDataToUpdate = new Acronym('XP', 'Extreme Programming')
    try {
      await sut.delete(acronymDataToUpdate.title)
    } catch (error) {
      expect(error.message).toBe('Acronym not found')
    }
  })

  it('Should delete a acronym', async () => {
    const sut = makeSut()
    const acronymDataToUpdate = new Acronym('XP', 'Extreme Programming')
    await sut.create(acronymDataToUpdate)
    await sut.delete(acronymDataToUpdate.title)
    const deletedAcronym = await AcronymModel.findOne({ where: { title: acronymDataToUpdate.title } })
    expect(deletedAcronym).toBeNull()
  })

  it('Should throw when try to find a not found acronym', async () => {
    const sut = makeSut()
    try {
      await sut.findOneByParam('XP')
    } catch (error) {
      expect(error.message).toBe('Acronym not found')
    }
  })

  it('Should find acronym by title param', async () => {
    const sut = makeSut()
    const acronymDataToCreate = new Acronym('TDD', 'Test Driven Development')
    await sut.create(acronymDataToCreate)
    const foundAcronym = await sut.findOneByParam(acronymDataToCreate.title)
    expect(foundAcronym).toEqual(acronymDataToCreate)
  })

  it('Should return a empty array when not found any acronyms', async () => {
    const sut = makeSut()
    const paginatedAcronyms = await sut.paginate({})
    expect(paginatedAcronyms.total).toBe(0)
    expect(paginatedAcronyms.data.length).toBe(0)
    expect(paginatedAcronyms.data).toEqual([])
  })

  it('Should return a filtered acronyms list', async () => {
    const sut = makeSut()
    await AcronymModel.bulkCreate([
      { title: '?', definition: 'I dont understand what you mean' },
      { title: 'TDD', definition: 'Test Driven Development' },
      { title: 'XP', definition: 'Extreme Programming' }
    ])
    const paginatedAcronyms = await sut.paginate({
      filter: 'TeST'
    })
    expect(paginatedAcronyms.total).toBe(1)
    expect(paginatedAcronyms.data.length).toBe(1)
    expect([{ title: paginatedAcronyms.data[0].title, definition: paginatedAcronyms.data[0].definition }])
      .toEqual([{ title: 'TDD', definition: 'Test Driven Development' }])
  })
})
