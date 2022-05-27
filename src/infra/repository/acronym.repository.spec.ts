import { Sequelize } from 'sequelize-typescript'

describe('Acronym Repository Unit Tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

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
})
