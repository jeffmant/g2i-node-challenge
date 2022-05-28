import { Sequelize } from 'sequelize-typescript'
import config from '../config'
import { AcronymModel } from './acronym.model'
import acronymSeeds from '../acronym.json'

const env = process.env.NODE_ENV ?? 'development'

const sequelize = new Sequelize({
  ...config[env],
  storage: ':memory:',
  sync: { force: true }
})

sequelize.addModels([AcronymModel])

sequelize.sync()
  .then(() => {
    console.log('Sync DB')
    AcronymModel.bulkCreate(acronymSeeds.map(acronym => {
      const acronymData = Object.entries(acronym)[0]
      return {
        title: acronymData[0],
        definition: acronymData[1]
      }
    }))
      .then(() => console.log('Acronyms seeded')).catch(error => console.error(error))
  }).catch(error => console.error(error))

export default sequelize
