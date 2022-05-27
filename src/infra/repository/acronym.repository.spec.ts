import { Sequelize } from 'sequelize-typescript'
import { Acronym } from '../../domain/entity/acronym.entity'
import { AcronymModel } from '../database/sequelize/model/acronym.model'
import { AcronymRepository } from './acronym.repository'

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
    const sut = new AcronymRepository()
    const acronymEntity = new Acronym('TDD', 'Test-Driven Development')
    await sut.create(acronymEntity)

    const createdAcronym = await AcronymModel.findOne({ where: { title: acronymEntity.title } }) as AcronymModel

    expect({
      title: createdAcronym.title,
      definition: createdAcronym.definition
    }).toEqual({
      title: acronymEntity.title,
      definition: acronymEntity.definition
    })
  })
})
