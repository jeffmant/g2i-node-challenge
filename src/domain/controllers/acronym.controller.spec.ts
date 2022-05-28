import { Sequelize } from 'sequelize-typescript'
import request from 'supertest'
import app from '../../app'
import { AcronymModel } from '../../infra/database/sequelize/models/acronym.model'

const server = app.listen()

describe('Acronym Controller Unit Unit Tests', () => {
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
    server.close()
  })

  it('Should returns 200 with paginated acronyms', async () => {
    try {
      const response = await request(server).get('/acronyms').query({})
      expect(response.body).toBeDefined()
      expect(response.body.total).toBe(0)
      expect(response.body.data).toEqual([])
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })
})
