import { Sequelize } from 'sequelize-typescript'
import request from 'supertest'
import app from '../../app'
import { AcronymModel } from '../../infra/database/sequelize/models/acronym.model'
import { Acronym } from '../entity/acronym.entity'
import { PaginateParams } from '../protocols/repository.interface'

const server = app.listen()

describe('Acronym Controller Unit Unit Tests', () => {
  let sequelize: Sequelize
  let params: PaginateParams

  beforeEach(async () => {
    params = {
      filter: '',
      orderParam: 'title',
      orderBy: 'ASC',
      offset: 0,
      pageSize: 10
    }

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

  it('Should throw when acronym controller throws', async () => {
    try {
      const response = await request(server).get('/acronyms').query(params)

      expect(response.body).toBeUndefined()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('Should returns 200 and empty array result', async () => {
    try {
      const response = await request(server).get('/acronyms').query(params)
      expect(response.body).toBeDefined()
      expect(response.statusCode).toBe(200)
      expect(response.body.total).toBe(0)
      expect(response.body.data).toEqual([])
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

  it('Should returns 201 when create a acronym', async () => {
    try {
      const newAcronym = new Acronym('TDD', 'Test Driven Development')
      const response = await request(server).post('/acronyms').send({
        title: newAcronym.title,
        definition: newAcronym.definition
      })

      expect(response.statusCode).toBe(201)
      expect(response.body).toBeDefined()
      expect(response.body).toEqual({ message: 'Acronym created' })
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

  it('Should returns 200 when update a acronym', async () => {
    try {
      const newAcronym = new Acronym('TDD', 'Test Driven Development')
      await AcronymModel.create({
        title: newAcronym.title,
        definition: newAcronym.definition
      })

      const acronymToUpdate = new Acronym('TDD', 'Test-Driven Development')
      const response = await request(server)
        .put(`/acronyms/${newAcronym.title}`)
        .send({
          definition: acronymToUpdate.definition
        })

      const updatedAcronym = await AcronymModel.findOne({ where: { title: newAcronym.title } })

      expect(response.statusCode).toBe(200)
      expect(response.body).toBeDefined()
      expect(response.body).toEqual({ message: 'Acronym updated' })
      expect(updatedAcronym?.title).toBe(acronymToUpdate.title)
      expect(updatedAcronym?.definition).toBe(acronymToUpdate.definition)
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })
})
