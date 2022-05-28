import express, { Application, json } from 'express'
import cors from 'cors'
import appRoutes from './routes'
import sequelize from './infra/database/sequelize/models'

export class App {
  public app: Application

  constructor () {
    this.app = express()
    this.config()
    this.database()
    this.routes()
  }

  config (): void {
    this.app.use(json())
    this.app.use(cors())
  }

  database (): void {
    sequelize.authenticate()
      .then(() => console.log('Autenticated with DB')).catch(error => console.error(error))
  }

  routes (): void {
    this.app.use(appRoutes)
  }
}

export default new App().app
