import express, { Application, json } from 'express'
import cors from 'cors'
import appRoutes from './routes'

export class App {
  public app: Application

  constructor () {
    this.app = express()
    this.config()
    this.routes()
  }

  config (): void {
    this.app.use(json())
    this.app.use(cors())
  }

  routes (): void {
    this.app.use(appRoutes)
  }
}

export default new App().app
